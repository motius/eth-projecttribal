pragma solidity ^0.4.18;


// A database containing all the registered users of the system
// Users are split into three categories:
// 1. Users, ie simple users who have registered with the system
// 2. Fans, ie users that are also part of the FanClub
// 3. Admins, ie superusers
contract FanClub {

    enum UserRole { User, Fan, Admin }

    struct User {
        address id;
        UserRole role;
    }

    string name;
    uint registeredUsers;
    mapping(address => User) db;

    function FanClub(string _name) public {
        name = _name;
        registeredUsers = 1;
        db[msg.sender] = User({
            id: msg.sender,
            role: UserRole.Admin
        });
    }

    function getNumberOfMembers() public view returns (uint) {
        return registeredUsers;
    }

    function getName() public view returns (string) {
        return name;
    }

    function getUser(address _userId) public view returns (address, string){
        var user = db[_userId];
        require(user.id != address(0));
        return (user.id, toStr(user.role));
    }

    function addUser(address _userId) public {
        // needs admin rights
        //require(isAdmin(msg.sender));
        //require(db[_userId].id != address(0));
        registeredUsers += 1;
        db[_userId] = User({
            id: _userId,
            role: UserRole.User
        });
    }

    function makeUserAFan(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        var _user = db[_userId];
        require(_user.id != address(0));
        require(_user.role != UserRole.Fan);
        _user.role = UserRole.Fan;
    }

    function makeUserAdmin(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        var _user = db[_userId];
        require(_user.id != address(0));
        require(_user.role != UserRole.Fan);
        _user.role = UserRole.Admin;
    }

    function makeAdminUser(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        var _user = db[_userId];
        require(_user.id != address(0));
        require(_user.role == UserRole.Admin);
        _user.role = UserRole.User;
    }

    function makeFanAUser(address _userId) public {
        // needs admin rights
        require(isAdmin(msg.sender));
        var _user = db[_userId];
        require(_user.id != address(0));
        require(_user.role == UserRole.Fan);
        _user.role = UserRole.User;
    }

    function isAdmin(address _userId) internal view returns (bool) {
        var user = db[_userId];
        return user.id != address(0) && user.role == UserRole.Admin;
    }

    function isFan(address _userId) internal view returns (bool) {
        var user = db[_userId];
        return user.id != address(0) && user.role == UserRole.Fan;
    }

    function isNotFan(address _userId) internal view returns (bool) {
        return !isFan(_userId);
    }

    function toStr(UserRole _usrRl) internal pure returns (string) {
        if (_usrRl == UserRole.User) {
            return "User";
        } else if (_usrRl == UserRole.Admin) {
            return "Admin";
        } else {
            return "Fan";
        }

    }
}