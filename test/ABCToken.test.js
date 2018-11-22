const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledToken = require("../ethereum/build/ABCToken.json");

let contract;
let creatorAccount;
beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  creatorAccount = accounts[0];

  contract = await new web3.eth.Contract(JSON.parse(compiledToken.interface))
    .deploy({ data: compiledToken.bytecode, arguments: [100000] })
    .send({ from: creatorAccount, gas: "1000000" });
});

describe("ABCToken", () => {
  it("deploys a token contract with totalSupply", () => {
    assert.ok(contract.options.address);
  });

  it("checks the token balance", async () => {
    let totalSupply = await contract.methods.totalSupply().call();
    console.log("totalSupply " + totalSupply);
    assert.equal(100000, totalSupply);
  });
  it("checks is creator has the total intial supply", async () => {
    let intialSupply = await contract.methods.balanceOf(creatorAccount).call();
    console.log("Creator balance " + intialSupply);
    assert.equal(100000, intialSupply);
  });
  it("checks the token name and symbol", async () => {
    let name = await contract.methods.name().call();
    let symbol = await contract.methods.symbol().call();
    console.log("name & symbol  " + name + " " + symbol);
    assert.equal("ABC Token", name);
    assert.equal("ABC", symbol);
  });
});
