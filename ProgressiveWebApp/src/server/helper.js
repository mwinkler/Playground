

/** @type string */
exports.promisifyAzureSettings = {
    promisifier: (originalFunction) => function (...args) {
        return new Promise((resolve, reject) => {
            try {
                originalFunction.call(this, ...args, (error, result, response) => {
                    error && reject(error);
                    resolve({ result, response });
                });
            } catch (e) {
                reject(e);
            }
        });
    }
};