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
        string first_name;
        string last_name;
        UserRole role;
    }

    string name;
    uint registrations;
    uint registeredUsers;
    uint registeredAdmins;
    uint registeredFans;
    mapping(address => User) db;

    function FanClub(string _name) public {
        name = _name;
        registrations = 1;
        registeredAdmins = 1;
        registeredFans = 0;
        registeredUsers = 0;
        db[msg.sender] = User({
            id: msg.sender,
            role: UserRole.Admin,
            first_name: "",
            last_name: ""
        });
    }

    function getNumberOfMembers() public view returns (uint) {
        return registrations;
    }

    function getNumberOfUsers() public view returns (uint) {
        return registeredUsers;
    }

    function getNumberOfFans() public view returns (uint) {
        return registeredFans;
    }

    function getNumberOfAdmins() public view returns (uint) {
        return registeredAdmins;
    }

    function getName() public view returns (string) {
        return name;
    }

    function getUser(address _userId) public view returns (address, string, string, string){
        var user = db[_userId];
        require(user.id != address(0));
        return (user.id, user.first_name, user.last_name, toStr(user.role));
    }

    function addUser(address newUser, string first_name, string last_name) public payable {
        // needs admin rights
        require(isAdmin(msg.sender));
        require(newUser != address(0));
        var existingUser = db[newUser];
        require(existingUser.id != address(0));
        db[newUser] = User({
            id: newUser,
            role: UserRole.User,
            first_name: first_name,
            last_name: last_name
        });
    }

    function setFirstName(string _first_name) public payable returns (bool){
        require(db[msg.sender].id == msg.sender);
        db[msg.sender].first_name = _first_name;
//        LogUpdateUser(
//            userAddress,
//            userStructs[userAddress].index,
//            userEmail,
//            userStructs[userAddress].userAge);
        return true;
    }

    function setLastName(string _last_name) public payable returns bool {
        var user = db[msg.sender];
        require(user.id != address(0));
        require(user.id == msg.sender);
        user.last_name = _last_name;
        return true;
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