pragma solidity ^0.4.20;
import "./ABCToken.sol";

contract ABCTokenSale{

  address admin;
  ABCToken public tokenContract;
  uint256 public tokenPrice; /* 10000000000000000 wei = 0.01 ether  */

  function ABCTokenSale(ABCToken _tokenContract, uint256 _tokenPrice) public {
      admin = msg.sender;
      tokenContract = _tokenContract;
      tokenPrice = _tokenPrice;
  }

}
