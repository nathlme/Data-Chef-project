package com.datachef.datachef.repository;

import com.datachef.datachef.model.CookingMethod;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CookingMethodRepository extends JpaRepository<CookingMethod, UUID> {
}
