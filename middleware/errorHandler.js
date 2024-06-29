const errorHandler = (err, req, res, next) => {
    console.error(err); 
    const status = err.name==="ValidationError" ? 400 : err.status || 500;
    const message = err.name==="ValidationError" ?  err.message?.split(":")[2] : err.message || 'Internal server error';
    res.status(status).json({
      name:err.name,
      message
    });
  };
  module.exports = {errorHandler};