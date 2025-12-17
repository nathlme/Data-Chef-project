package com.datachef.datachef.repository;

import com.datachef.datachef.model.Allergen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AllergenRepository extends JpaRepository<Allergen, UUID> {
}
