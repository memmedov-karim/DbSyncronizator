class NotFoundError extends Error {
    constructor(message){
        super(message);
        this.name = "ResourceNotFoundError";
        this.status = 404;
    }
}

module.exports = NotFoundError