package com.datachef.datachef.exception;

import java.lang.reflect.Type;

public class EntityNotFound extends RuntimeException {
    public EntityNotFound(Type type) {
        super("Entity " + type + " not found");
    }
}
