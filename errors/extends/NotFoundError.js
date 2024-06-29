const NotFoundError = require("../base/NotFoundError");

class UserNotFoundError extends NotFoundError {
    constructor(){
        super("İstifadəçi tapılmadı");
    }
}
class DataBaseSyncronizatorNotFoundError extends NotFoundError {
    constructor(){
        super("Belə bir sinxronizator mövcud deyil");
    }
}
module.exports = {
    UserNotFoundError,
    DataBaseSyncronizatorNotFoundError
}