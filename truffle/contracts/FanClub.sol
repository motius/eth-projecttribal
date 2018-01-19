pragma solidity ^0.4.18;


// A database containing all the registered users of the system
// Users are split into three categories:
// 1. Users, ie simple users who have registered with the system
// 2. Fans, ie users that are also part of the FanClub
// 3. Admins, ie superusers
contract FanClub {

    struct User {
        address userId;
        bool isAdmin;
        bool isFan;
    }

    string name;
    mapping(uint => Fan) db;

    function FanClub() public {

    }
}