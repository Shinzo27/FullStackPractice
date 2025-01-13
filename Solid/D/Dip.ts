// Dependency inversion principle

interface Repository {
    save(): void;
}

interface Service {
    save(): void;
}

class UserController {
    constructor(private service: Service) {}

    save(){
        this.service.save();
    }
}

class UserService implements Service{
    constructor(private repository: Repository) {}
    save(){
        this.repository.save();
    }
}

class UserPostgresRepository implements Repository{
    save(){
        console.log('save product');
    }
}

class UserSqliteRepository implements Repository{
    save(){
        console.log('save product in sqlite');
    }
}

// const userPostgresRepository = new UserPostgresRepository();
// const userService = new UserService(userPostgresRepository);
// const userController = new UserController(userSqliteService);
const userSqliteRepository = new UserSqliteRepository();
const userSqliteService = new UserService(userSqliteRepository);
const userSqliteController = new UserController(userSqliteService);

userSqliteController.save();