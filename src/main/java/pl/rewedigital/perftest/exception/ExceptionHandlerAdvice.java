package pl.rewedigital.perftest.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ExceptionHandlerAdvice {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ProblemDetail handleResourceNotFoundException(final ResourceNotFoundException e) {
        log.warn(e.getMessage(), e);
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage() != null ? e.getMessage() : "Resource not found");
    }

    @ExceptionHandler(BadRequestException.class)
    private ProblemDetail handleBadRequestException(final BadRequestException e) {
        log.warn(e.getMessage(), e);
        return ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.getMessage() != null ? e.getMessage() : "Bad request");
    }

    @ExceptionHandler(Exception.class)
    private ProblemDetail handleException(final BadRequestException e) {
        log.warn(e.getMessage(), e);
        return ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage() != null ? e.getMessage() : "Internal server error");
    }
}