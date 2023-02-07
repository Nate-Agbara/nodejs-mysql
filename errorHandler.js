const logger = require("./logger");

async function errorHandler(err, req, res, next){
    logger.error(err.stack);

    try {
        //send mail
    } catch (e) {
        logger.error(e);
    }

    res.status(500).json({message: 'there was an internal server error, please try again!'})
}

module.exports = { errorHandler }