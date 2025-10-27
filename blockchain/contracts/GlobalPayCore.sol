// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title GlobalPay Core Contract
 * @dev Simplified version for local development and testing
 */
contract GlobalPayCore is Ownable, ReentrancyGuard, Pausable {
    
    struct Payment {
        bytes32 id;
        address sender;
        address recipient;
        string recipientIdentifier; // email or wallet address
        uint256 amount;
        string fromCurrency;
        string toCurrency;
        uint256 exchangeRate; // Rate * 10^18 for precision
        uint256 fee;
        uint256 timestamp;
        PaymentStatus status;
        string message;
    }
    
    enum PaymentStatus {
        Pending,
        Processing,
        Completed,
        Failed,
        Cancelled
    }
    
    struct ExchangeRate {
        string fromCurrency;
        string toCurrency;
        uint256 rate; // Rate * 10^18 for precision
        uint256 lastUpdated;
        bool isActive;
    }
    
    // State variables
    mapping(bytes32 => Payment) public payments;
    mapping(string => mapping(string => ExchangeRate)) public exchangeRates;
    mapping(address => mapping(string => uint256)) public userBalances;
    mapping(address => bytes32[]) public userPaymentHistory;
    mapping(string => bool) public supportedCurrencies;
    mapping(address => bool) public authorizedOracles;
    
    bytes32[] public allPayments;
    string[] public currencyList;
    
    uint256 public constant RATE_PRECISION = 10**18;
    uint256 public flatFee = 2 * 10**6; // $2 in USDC (6 decimals)
    uint256 public maxPaymentAmount = 50000 * 10**6; // $50,000 limit
    uint256 public minPaymentAmount = 1 * 10**6; // $1 minimum
    
    // Events
    event PaymentInitiated(bytes32 indexed paymentId, address indexed sender, string recipient, uint256 amount, string fromCurrency, string toCurrency);
    event PaymentCompleted(bytes32 indexed paymentId, address indexed recipient, uint256 amountReceived);
    event PaymentFailed(bytes32 indexed paymentId, string reason);
    event ExchangeRateUpdated(string fromCurrency, string toCurrency, uint256 newRate);
    event BalanceDeposited(address indexed user, string currency, uint256 amount);
    event BalanceWithdrawn(address indexed user, string currency, uint256 amount);
    
    // Modifiers
    modifier onlyOracle() {
        require(authorizedOracles[msg.sender] || msg.sender == owner(), "Not authorized oracle");
        _;
    }
    
    modifier validCurrency(string memory currency) {
        require(supportedCurrencies[currency], "Currency not supported");
        _;
    }
    
    modifier validAmount(uint256 amount) {
        require(amount >= minPaymentAmount && amount <= maxPaymentAmount, "Invalid amount");
        _;
    }
    
    constructor() {
        // Initialize supported currencies
        supportedCurrencies["USD"] = true;
        supportedCurrencies["EUR"] = true;
        supportedCurrencies["GBP"] = true;
        
        currencyList.push("USD");
        currencyList.push("EUR");
        currencyList.push("GBP");
        
        // Set initial exchange rates (these would be updated by oracles)
        _setExchangeRate("USD", "EUR", 85 * 10**16); // 0.85
        _setExchangeRate("USD", "GBP", 75 * 10**16); // 0.75
        _setExchangeRate("EUR", "USD", 118 * 10**16); // 1.18
        _setExchangeRate("EUR", "GBP", 88 * 10**16); // 0.88
        _setExchangeRate("GBP", "USD", 133 * 10**16); // 1.33
        _setExchangeRate("GBP", "EUR", 114 * 10**16); // 1.14
        
        // Set deployer as authorized oracle
        authorizedOracles[msg.sender] = true;
    }
    
    /**
     * @dev Deposit funds to user balance (simplified for testing)
     */
    function depositBalance(string memory currency, uint256 amount) 
        external 
        validCurrency(currency) 
        nonReentrant 
        whenNotPaused 
    {
        require(amount > 0, "Amount must be positive");
        
        // In production, this would transfer actual tokens (USDC, USDT, etc.)
        // For demo purposes, we're just updating the balance
        userBalances[msg.sender][currency] += amount;
        
        emit BalanceDeposited(msg.sender, currency, amount);
    }
    
    /**
     * @dev Withdraw funds from user balance
     */
    function withdrawBalance(string memory currency, uint256 amount) 
        external 
        validCurrency(currency) 
        nonReentrant 
        whenNotPaused 
    {
        require(amount > 0, "Amount must be positive");
        require(userBalances[msg.sender][currency] >= amount, "Insufficient balance");
        
        userBalances[msg.sender][currency] -= amount;
        
        // In production, this would transfer actual tokens back to user
        
        emit BalanceWithdrawn(msg.sender, currency, amount);
    }
    
    /**
     * @dev Initiate a payment
     */
    function initiatePayment(
        string memory recipientIdentifier,
        uint256 amount,
        string memory fromCurrency,
        string memory toCurrency,
        string memory message
    ) 
        external 
        validCurrency(fromCurrency) 
        validCurrency(toCurrency) 
        validAmount(amount) 
        nonReentrant 
        whenNotPaused 
        returns (bytes32 paymentId) 
    {
        require(bytes(recipientIdentifier).length > 0, "Invalid recipient");
        require(userBalances[msg.sender][fromCurrency] >= amount + flatFee, "Insufficient balance");
        
        // Generate unique payment ID
        paymentId = keccak256(abi.encodePacked(
            msg.sender, 
            recipientIdentifier, 
            amount, 
            block.timestamp, 
            block.number
        ));
        
        require(payments[paymentId].id == bytes32(0), "Payment ID collision");
        
        // Get current exchange rate
        uint256 currentRate = _getExchangeRate(fromCurrency, toCurrency);
        
        // Deduct amount and fee from sender's balance
        userBalances[msg.sender][fromCurrency] -= (amount + flatFee);
        
        // Create payment record
        payments[paymentId] = Payment({
            id: paymentId,
            sender: msg.sender,
            recipient: address(0), // Will be set when recipient is resolved
            recipientIdentifier: recipientIdentifier,
            amount: amount,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            exchangeRate: currentRate,
            fee: flatFee,
            timestamp: block.timestamp,
            status: PaymentStatus.Processing,
            message: message
        });
        
        // Add to tracking arrays
        allPayments.push(paymentId);
        userPaymentHistory[msg.sender].push(paymentId);
        
        emit PaymentInitiated(paymentId, msg.sender, recipientIdentifier, amount, fromCurrency, toCurrency);
        
        return paymentId;
    }
    
    /**
     * @dev Complete a payment (called by oracle or automated system)
     */
    function completePayment(bytes32 paymentId, address recipientAddress) 
        external 
        onlyOracle 
        nonReentrant 
    {
        Payment storage payment = payments[paymentId];
        require(payment.id != bytes32(0), "Payment not found");
        require(payment.status == PaymentStatus.Processing, "Invalid payment status");
        require(recipientAddress != address(0), "Invalid recipient address");
        
        // Calculate amount to credit to recipient
        uint256 convertedAmount;
        if (keccak256(abi.encodePacked(payment.fromCurrency)) == keccak256(abi.encodePacked(payment.toCurrency))) {
            convertedAmount = payment.amount;
        } else {
            convertedAmount = (payment.amount * payment.exchangeRate) / RATE_PRECISION;
        }
        
        // Update payment record
        payment.recipient = recipientAddress;
        payment.status = PaymentStatus.Completed;
        
        // Credit recipient's balance
        userBalances[recipientAddress][payment.toCurrency] += convertedAmount;
        
        // Add to recipient's payment history
        userPaymentHistory[recipientAddress].push(paymentId);
        
        emit PaymentCompleted(paymentId, recipientAddress, convertedAmount);
    }
    
    /**
     * @dev Update exchange rate (oracle function)
     */
    function updateExchangeRate(
        string memory fromCurrency, 
        string memory toCurrency, 
        uint256 newRate
    ) 
        external 
        onlyOracle 
        validCurrency(fromCurrency) 
        validCurrency(toCurrency) 
    {
        require(newRate > 0, "Rate must be positive");
        _setExchangeRate(fromCurrency, toCurrency, newRate);
        emit ExchangeRateUpdated(fromCurrency, toCurrency, newRate);
    }
    
    /**
     * @dev Get current exchange rate between two currencies
     */
    function getExchangeRate(string memory fromCurrency, string memory toCurrency) 
        external 
        view 
        returns (uint256 rate, uint256 lastUpdated) 
    {
        ExchangeRate memory exchangeRate = exchangeRates[fromCurrency][toCurrency];
        return (exchangeRate.rate, exchangeRate.lastUpdated);
    }
    
    /**
     * @dev Get user's balance for a specific currency
     */
    function getUserBalance(address user, string memory currency) 
        external 
        view 
        returns (uint256) 
    {
        return userBalances[user][currency];
    }
    
    /**
     * @dev Get payment details
     */
    function getPayment(bytes32 paymentId) 
        external 
        view 
        returns (
            address sender,
            address recipient,
            string memory recipientIdentifier,
            uint256 amount,
            string memory fromCurrency,
            string memory toCurrency,
            uint256 exchangeRate,
            uint256 fee,
            uint256 timestamp,
            PaymentStatus status,
            string memory message
        ) 
    {
        Payment memory payment = payments[paymentId];
        return (
            payment.sender,
            payment.recipient,
            payment.recipientIdentifier,
            payment.amount,
            payment.fromCurrency,
            payment.toCurrency,
            payment.exchangeRate,
            payment.fee,
            payment.timestamp,
            payment.status,
            payment.message
        );
    }
    
    /**
     * @dev Get user's payment history
     */
    function getUserPaymentHistory(address user, uint256 offset, uint256 limit) 
        external 
        view 
        returns (bytes32[] memory) 
    {
        bytes32[] memory userPayments = userPaymentHistory[user];
        uint256 length = userPayments.length;
        
        if (offset >= length) {
            return new bytes32[](0);
        }
        
        uint256 end = offset + limit;
        if (end > length) {
            end = length;
        }
        
        bytes32[] memory result = new bytes32[](end - offset);
        for (uint256 i = offset; i < end; i++) {
            result[i - offset] = userPayments[length - 1 - i]; // Return in reverse order (newest first)
        }
        
        return result;
    }
    
    /**
     * @dev Get supported currencies
     */
    function getSupportedCurrencies() external view returns (string[] memory) {
        return currencyList;
    }
    
    /**
     * @dev Get system stats
     */
    function getSystemStats() external view returns (
        uint256 totalPayments,
        uint256 totalVolume,
        uint256 activeUsers
    ) {
        return (allPayments.length, 0, 0);
    }
    
    // Internal functions
    function _setExchangeRate(
        string memory fromCurrency, 
        string memory toCurrency, 
        uint256 rate
    ) internal {
        exchangeRates[fromCurrency][toCurrency] = ExchangeRate({
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            rate: rate,
            lastUpdated: block.timestamp,
            isActive: true
        });
    }
    
    function _getExchangeRate(string memory fromCurrency, string memory toCurrency) 
        internal 
        view 
        returns (uint256) 
    {
        if (keccak256(abi.encodePacked(fromCurrency)) == keccak256(abi.encodePacked(toCurrency))) {
            return RATE_PRECISION; // 1:1 rate for same currency
        }
        
        ExchangeRate memory rate = exchangeRates[fromCurrency][toCurrency];
        require(rate.isActive && rate.rate > 0, "Exchange rate not available");
        
        return rate.rate;
    }
    
    // Admin functions
    function addOracle(address oracle) external onlyOwner {
        authorizedOracles[oracle] = true;
    }
    
    function removeOracle(address oracle) external onlyOwner {
        authorizedOracles[oracle] = false;
    }
    
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
}