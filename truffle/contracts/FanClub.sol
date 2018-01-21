pragma solidity ^0.4.18;


// A database containing all the registered users of the system
// Users are split into three categories:
// 1. Users, ie simple users who have registered with the system
// 2. Fans, ie users that are also part of the FanClub
// 3. Admins, ie superusers
contract FanClub {

    enum UserRole { User, Fan, Admin }

    event RESTishResult(uint status_code, string msg);

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

    function getUser(address _userId) public view returns (address user_id, string first_name, string last_name, string role){
        var user = db[_userId];
        if (user.id == address(0)) {
            user_id = address(0);
            first_name = "";
            last_name = "";
            role = "Unknown";
        } else {
            user_id = user.id;
            first_name = user.first_name;
            last_name = user.last_name;
            role = toStr(user.role);
        }
    }

    function addUser(address newUser, string first_name, string last_name) public payable {
        // needs admin rights
        if (!userExists(msg.sender)) {
            RESTishResult(403, "Unknown sender");
        } else if (!isAdmin(msg.sender)) {
            RESTishResult(403, "Sender not an admin");
        } else if (userExists(newUser)) {
            RESTishResult(400, "User already in database");
        } else {
            db[newUser] = User({
                id: newUser,
                role: UserRole.User,
                first_name: first_name,
                last_name: last_name
                });
            RESTishResult(200, "");
            registrations += 1;
            registeredUsers += 1;
        }
    }

    function setFirstName(string _first_name) public payable {
        if (!userExists(msg.sender)) {
            RESTishResult(403, "Unknown sender");
        } else {
            db[msg.sender].first_name = _first_name;
            RESTishResult(200, "");
        }
    }

    function setLastName(string _last_name) public payable {
        if (!userExists(msg.sender)) {
            RESTishResult(403, "Unknown sender");
        } else {
            db[msg.sender].last_name = _last_name;
            RESTishResult(200, "");
        }
    }

    function makeUserAFan(address _userId) public payable {
        // needs admin rights
        if (!userExists(msg.sender)) {
            RESTishResult(403, "Unknown sender");
        } else if (!isAdmin(msg.sender)) {
            RESTishResult(403, "Sender not an admin");
        } else if (!userExists(_userId)) {
            RESTishResult(404, "User not in database");
        } else if (!isSimpleUser(_userId)) {
            RESTishResult(400, "User is not a simple member");
        } else {
            db[_userId].role = UserRole.Fan;
            RESTishResult(200, "");
            registeredFans += 1;
            registeredUsers -= 1;
        }
    }

    function makeUserAdmin(address _userId) public payable {
        // needs admin rights
        if (!userExists(msg.sender)) {
            RESTishResult (403, "Unknown sender");
        } else if (!isAdmin(msg.sender)) {
            RESTishResult (403, "Sender not an admin");
        } else if (!userExists(_userId)) {
            RESTishResult (404, "User not in database");
        } else if (!isSimpleUser(_userId)) {
            RESTishResult (400, "User is not a simple member");
        } else {
            db[_userId].role = UserRole.Admin;
            RESTishResult(200, "");
            registeredFans -= 1;
            registeredAdmins += 1;
        }
    }

    function makeAdminUser(address _userId) public payable {
        // needs admin rights
        if (!userExists(msg.sender)) {
            RESTishResult (403, "Unknown sender");
        } else if (!isAdmin(msg.sender)) {
            RESTishResult (403, "Sender not an admin");
        } else if (!userExists(_userId)) {
            RESTishResult(404, "User not in database");
        } else if (!isAdmin(_userId)) {
            RESTishResult(400, "User is not an admin");
        } else {
            db[_userId].role = UserRole.User;
            RESTishResult(200, "");
            registeredUsers += 1;
            registeredAdmins -= 1;
        }
    }

    function makeFanAUser(address _userId) public payable {
        // needs admin rights
        if (!userExists(msg.sender)) {
            RESTishResult(403, "Unknown sender");
        } else if (!isAdmin(msg.sender)) {
            RESTishResult(403, "Sender not an admin");
        } else if (!userExists(_userId)) {
            RESTishResult(404, "User not in database");
        } else if (!isAFan(_userId)) {
            RESTishResult(400, "User is not a fan");
        } else {
            db[_userId].role = UserRole.User;
            RESTishResult(200, "");
            registeredUsers += 1;
            registeredFans -= 1;
        }
    }

    function isSimpleUser(address _userId) internal view returns (bool) {
        return userExists(_userId) && db[_userId].role == UserRole.User;
    }

    function isNotSimpleUser(address _userId) internal view returns (bool) {
        return !isSimpleUser(_userId);
    }

    function isAdmin(address _userId) internal view returns (bool) {
        return userExists(_userId) && db[_userId].role == UserRole.Admin;
    }

    function isNotAdmin(address _userId) internal view returns (bool) {
        return !isAdmin(_userId);
    }

    function isAFan(address _userId) internal view returns (bool) {
        return userExists(_userId) && db[_userId].role == UserRole.Fan;
    }

    function isNotFan(address _userId) internal view returns (bool) {
        return !isAFan(_userId);
    }

    function userExists(address userId) internal view returns (bool) {
        return  db[userId].id != address(0);
    }

    function userNotExists(address userId) internal view returns (bool) {
        return !userExists(userId);
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