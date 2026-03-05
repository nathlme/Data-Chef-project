package com.datachef.datachef.validator;

import com.datachef.datachef.dto.auth.RegisterRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.List;

public class RegisterRequestValidator implements ConstraintValidator<ValidRegisterRequest, RegisterRequest> {

    @Override
    public boolean isValid(RegisterRequest request, ConstraintValidatorContext context) {
        if (request.getPassword() == null || request.getUsername() == null) return false;

        List<String> errors = new ArrayList<>();

        if (request.getPassword().contains(request.getUsername()))
            errors.add("Password must not contain username");

        if (errors.isEmpty()) return true;

        context.disableDefaultConstraintViolation();
        errors.forEach(msg ->
                context.buildConstraintViolationWithTemplate(msg)
                        .addPropertyNode("password")
                        .addConstraintViolation()
        );

        return false;
    }
}
