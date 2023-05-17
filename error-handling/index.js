const handleError = (app) => {

    app.use((req, res, next) => {
        res.status(404).json('Not Found!');
    });

    app.use((error, req, res, next) => {
        console.log('ERRO!', req.method, req.path, error);
        if(!res.headersSent) {
            res.status(500).jsob({
                message: error.message || "Internal error", error
            });
        };
    });
};

module.exports = handleError;