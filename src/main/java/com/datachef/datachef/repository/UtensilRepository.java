package com.datachef.datachef.repository;

import com.datachef.datachef.model.Utensil;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UtensilRepository extends JpaRepository<Utensil, UUID> {
}
