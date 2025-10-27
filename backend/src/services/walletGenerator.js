const bitcoin = require('bitcoinjs-lib');
const { ethers } = require('ethers');
const bip39 = require('bip39');
const bip32 = require('bip32');
const crypto = require('crypto');

// Encryption key from environment
const ENCRYPTION_KEY = process.env.WALLET_ENCRYPTION_KEY || crypto.randomBytes(32).toString('hex');

// Encrypt private key
function encryptPrivateKey(privateKey) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(ENCRYPTION_KEY.slice(0, 64), 'hex');
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(privateKey, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return iv.toString('hex') + ':' + encrypted;
}

// Decrypt private key
function decryptPrivateKey(encryptedKey) {
  const algorithm = 'aes-256-cbc';
  const key = Buffer.from(ENCRYPTION_KEY.slice(0, 64), 'hex');
  
  const parts = encryptedKey.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = parts[1];
  
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Generate multi-crypto wallet (BTC + ETH + ERC-20)
function generateMultiCryptoWallet() {
  const mnemonic = bip39.generateMnemonic();
  
  // Bitcoin
  const btcSeed = bip39.mnemonicToSeedSync(mnemonic);
  const btcRoot = bip32.fromSeed(btcSeed, bitcoin.networks.bitcoin);
  const btcChild = btcRoot.derivePath("m/44'/0'/0'/0/0");
  const { address: btcAddress } = bitcoin.payments.p2pkh({
    pubkey: btcChild.publicKey,
    network: bitcoin.networks.bitcoin
  });
  const btcPrivateKey = btcChild.toWIF();
  
  // Ethereum (same mnemonic, different derivation)
  const ethWallet = ethers.Wallet.fromPhrase(mnemonic);
  const ethAddress = ethWallet.address;
  const ethPrivateKey = ethWallet.privateKey;
  
  return {
    mnemonic: encryptPrivateKey(mnemonic),
    addresses: {
      BTC: btcAddress,
      ETH: ethAddress,
      USDC: ethAddress,
      USDT: ethAddress,
      BNB: ethAddress,
      XRP: null
    },
    encryptedKeys: {
      BTC: encryptPrivateKey(btcPrivateKey),
      ETH: encryptPrivateKey(ethPrivateKey)
    }
  };
}

module.exports = {
  generateMultiCryptoWallet,
  decryptPrivateKey
};
