
const handlerNotFound = ((req, res) => {
    res.status(404).json({ error: "ruta inválida" })
});

const logger = (req, res, next) => {
    console.log(`Petición: ${req.method} ${req.url}`);
    next();
}

const handlerError = ((error, req, res, next) => {
    console.log(error.name);

    if (error.name === "CastError") {
        res.status(400).send({ error: error.name, message: error.message });
    }
    else if (error.name === "SyntaxError") {
        res.status(400).send({ error: error.name, message: error.message });
    }
    else if (error.name === "ReferenceError") {
        res.status(400).send({ error: error.name, message: error.message });
    }
    else if (error.name === "ValidationError") {
        res.status(400).send({ error: error.name, message: error.message });
    }
    else if (error.name === "TokenError") {  
        res.status(401).send({ error: error.name, message: error.message });
    }
    else if (error.name === "InvalidTokenError") { 
        res.status(403).send({ error: error.name, message: error.message });
    }
    else {
        res.status(500).send({ error: error.name, message: error.message });
    }
    next();
});

module.exports = {
    handlerError,
    logger,
    handlerNotFound
}