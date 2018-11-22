const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const compiledABCToken = require("./build/ABCToken.json");

const provider = new HDWalletProvider(
  "tide lamp shove muscle blind wealth produce census art acid panda auto",
  "https://rinkeby.infura.io/v3/cfed26ef54a2434293fba9758466c591"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(
    JSON.parse(compiledABCToken.interface)
  )
    .deploy({ data: compiledABCToken.bytecode, arguments: [100000] })
    .send({ gas: "1000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};
deploy();
