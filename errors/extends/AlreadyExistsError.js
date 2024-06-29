const AlreadyExistError = require("../base/AlreadyExistsError");

class UserAlreadyExistsWithThisUserNameError extends AlreadyExistError {
    constructor(username){
        super(`${username} adlı istifadəçi artığ mövcuddur.`);
    }
}


module.exports = {
    UserAlreadyExistsWithThisUserNameError
}