class ApiError extends Error{
    constructor( statuscode, message = "Something whent wrong", errors = [], stack=""){
        super(message),
        this.statusCode = statuscode,
        this.data = null,
        this.message = message,
        this.errors = errors

        if(stack){
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.contructor)
        }
    }
}

export { ApiError }