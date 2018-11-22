const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath); // remove build directory before compiling

const contractPath1 = path.resolve(__dirname, "contracts", "ABCToken.sol");
const contractPath2 = path.resolve(__dirname, "contracts", "ABCTokenSale.sol");

// const source1 = fs.readFileSync(contractPath1, "utf8");
// const source2 = fs.readFileSync(contractPath2, "utf8");

var input = {
  "ABCToken.sol": fs.readFileSync(contractPath1, "utf8"),
  "ABCTokenSale.sol": fs.readFileSync(contractPath2, "utf8")
};

const output = solc.compile({ sources: input }, 1).contracts;

console.log(output);

fs.ensureDirSync(buildPath); // recreate the build directory

for (let contract in output) {
  // contract = contract.substring(contract.indexOf(":") + 1) + ".json";
  fs.outputJsonSync(
    path.resolve(
      buildPath,
      contract.substring(contract.indexOf(":") + 1) + ".json"
    ),
    output[contract]
  );
}
