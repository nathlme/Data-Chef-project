package com.datachef.datachef.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@NotBlank
@Size(min = 8, max = 20, message = "between 8 and 20 character")
@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z]).*$",    message = "At least one uppercase and one lowercase")
@Pattern(regexp = "^(?=.*\\d).*$",                  message = "At least one number")
@Pattern(regexp = "^(?=.*[!@#$%^&*]).*$",           message = "At least a special character")
@Pattern(regexp = "^\\S+$",                         message = "no whitespace allowed")
@Pattern(regexp = "^(?!.*(.)\\1\\1)\\S+$",          message = "no three consecutive character")
@Constraint(validatedBy = {})
@Target({FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Documented
public @interface ValidPassword {
    String message() default "";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
