// Function middleware for error handling
// It determines the HTTP code that should be returned
// If err contains status, it is used
// Otherwise, it defaults to 500
// If the error is a validation error, it returns the first error message

export function errorHandler (err, req, res, next) {
    const httpStatus = err.status ? err.status : 500;

    if(err.status === 'Validation error') {
        err.message = err.errors[0].message;
    }

    // Return JSON with the error message
    res.status(httpStatus).json({error: err.message});

}