class BaseUser {
    getRole() {
        console.log("User role");
    }
}

class User extends BaseUser {
    getAccessLevel() {
        console.log("User has access level");
    }
}

class Admin extends User {
    getAccessLevel() {
        console.log("Admin has access level");
    }

    getRole() {
        console.log("Admin role");
    }
}

class Manager extends User {
    getAccessLevel() {
        console.log("Manager has access level");
    }

    getRole() {
        console.log("Manager role");
    }
}

class Customer extends BaseUser {
    getRole() {
        console.log("Customer role");
    }
}

function getUserAccessLevel(user: User) {
    user.getAccessLevel();
}

getUserAccessLevel(new Admin());

//You cannot pass Customer class object to getUserAccessLevel function because it expects User class object.