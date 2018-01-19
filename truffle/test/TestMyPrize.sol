pragma solidity ^0.4.18;

import "truffle/Assert.sol";
import "../contracts/MyPrize.sol";

contract TestMyPrize {

    MyPrize mp = new MyPrize();

    function testMyPrize() public {
        mp.placePrize(1, bytes10("abcdefghij"), "http://test.example.com/");
        var (id, owner, geohash, metadata, placedAt) = mp.prizes(uint(1));
        Assert.equal(bytes10("abcdefghij"), geohash, "Geohash successfully set");
        Assert.equal(address(0), owner, "Ownership was successfully abdicated");
        Assert.equal(block.number, placedAt, "PlacedAt successfully set");
    }

}