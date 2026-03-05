package com.datachef.datachef.unit;

import com.datachef.datachef.dto.auth.RegisterRequest;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.tuple;


class PasswordTest {


    private Validator validator;

    @BeforeEach
    void setUp() {
        validator = Validation.buildDefaultValidatorFactory().getValidator();
    }

    @Test
    @DisplayName("Password sans majuscule doit échouer")
    void testPasswordShouldFailNoUppercase() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("p@ssw0rd");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations)
                .extracting(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                )
                .contains(tuple("password", "At least one uppercase and one lowercase"));
    }

    @Test
    @DisplayName("Password sans chiffre doit echouer")
    void testPasswordShouldFailNoNumber() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("P@ssword");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations)
                .extracting(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                )
                .contains(tuple("password", "At least one number"));
    }

    @Test
    @DisplayName("Password trop court dois echouer")
    void testPasswordShouldFailTooShort() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("P@word4");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations)
                .extracting(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                )
                .contains(tuple("password", "between 8 and 20 character"));
    }

    @Test
    @DisplayName("Password sans caractère special doit echouer")
    void testPasswordShouldFailNoSpecialCharacter() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("Paswword4");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations)
                .extracting(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                )
                .contains(tuple("password", "At least a special character"));
    }

    @Test
    @DisplayName("Password avec espace doit echouer")
    void testPasswordShouldFailWithSpaces() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("P@sw word4");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations)
                .extracting(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                )
                .contains(tuple("password", "no whitespace allowed"));
    }


    @Test
    @DisplayName("Password avec trois fois le même char doit echouer")
    void testPasswordShouldFailWithThreeConsecutiveCharacter() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("P@swww0rd");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations)
                .extracting(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                )
                .contains(tuple("password", "no three consecutive character"));
    }

    @Test
    @DisplayName("Password should fail for whitespace and no special character")
    void testPasswordShouldFailWithTwoValidatorsFailed() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("Pasw ww0rd");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations)
                .extracting(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                )
                .contains(
                        tuple("password", "no whitespace allowed"),
                        tuple("password", "At least a special character")
                );
    }

    @Test
    @DisplayName("Password should fail for whitespace and no special character")
    void testPasswordShouldFailWithUsernameInPassword() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("john.doe3");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations)
                .extracting(
                        v -> v.getPropertyPath().toString(),
                        ConstraintViolation::getMessage
                )
                .contains(tuple("password", "Password must not contain username"));
    }


    @Test
    @DisplayName("Password sans chiffre dois echouser")
    void testPasswordShouldPass() {
        RegisterRequest request = new RegisterRequest();
        request.setUsername("john.doe");
        request.setPassword("P@ssw0rd3");
        request.setEmail("john.doe@example.com");

        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        assertThat(violations).isEmpty();
    }

}
