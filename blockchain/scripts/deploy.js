const hre = require("hardhat");

async function main() {
  console.log("Deploying GlobalPay Core contract...");
  
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.utils.formatEther(balance), "ETH");
  
  const GlobalPayCore = await hre.ethers.getContractFactory("GlobalPayCore");
  const globalPayCore = await GlobalPayCore.deploy();
  await globalPayCore.deployed();
  
  console.log("GlobalPay Core deployed to:", globalPayCore.address);
  
  return globalPayCore.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
