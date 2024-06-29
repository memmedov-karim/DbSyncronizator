class AlreadyExistError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ResourceAlreadyExistError';
        this.status = 400;
      }
}

module.exports = AlreadyExistError;