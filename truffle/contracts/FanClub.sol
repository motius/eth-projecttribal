pragma solidity ^0.4.18;


// A database containing all the registered users of the system
// Users are split into three categories:
// 1. Users, ie simple users who have registered with the system
// 2. Fans, ie users that are also part of the FanClub
// 3. Admins, ie superusers
contract FanClub {

    struct User {
        address id;
        bool isAdmin;
        bool isFan;
    }

    string name;
    uint registeredUsers;
    mapping(uint => Fan) db;

    function FanClub(bytes32 _name) public {
        name = _name;
        registeredUsers = 1;
        db[msg.sender] = User({
            id: msg.sender,
            isAdmin: true,
            isFan: false
        });
    }

    function getNumberOfMembers() public returns (uint) {
        return this.registeredUsers;
    }

    function getUser(address _userId) public returns (User){
        user = db[_userId];
        require(user.id != 0);
        return user;
    }

    function addUser(address newUser) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        require(newUser != address(0));
        existingUser = db[newUser];
        require(existingUser.id != address(0));
        db[newUser] = User({
            id: newUser,
            isAdmin: false,
            isFan: false
        });
    }

    function makeUserAFan(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        _user = db[_userId];
        require(_user.id != address(0));
        require(!_user.isFan);
        _user.isFan = true;
    }

    function makeUserAdmin(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        _user = db[_userId];
        require(_user.id != address(0));
        require(!_user.isFan);
        _user.isFan = true;
    }

    function makeAdminUser(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        _user = db[_userId];
        require(_user.id != address(0));
        require(!_user.isFan);
        _user.isFan = true;
    }

    function makeUserAFan(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        _user = db[_userId];
        require(_user.id != address(0));
        require(!_user.isFan);
        _user.isFan = true;
    }

    function makeFanAUser(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        _user = db[_userId];
        require(_user.id != address(0));
        require(_user.isFan);
        _user.isFan = false;
    }

    function isAdmin(address _userId) internal returns (bool) {
        user = db[_userId];
        return user.id != address(0) && user.isAdmin;
    }

    function isFan(address _userId) internal returns (bool) {
        user = db[_userId];
        return user.id != address(0) && user.isAdmin;
    }

    function isNotFan(address _userId) internal returns (bool) {
        return !this.isFan(_userId);
    }
}