const log = require('tracer').colorConsole()

module.exports = function (errorConfig = {}, errorProcess) {
    errorConfig = errorConfig || {}
    return async function xerror(err, req, res, next) {
        log.error(err)
        if (errorProcess && typeof (errorProcess) == 'function') {
            errorProcess(req, err)
        }
        const result = { err: err.message }
        if (errorConfig.debug != false) {
            result.stack = err.stack
        }
        res.status(500).send(result)
    }
}