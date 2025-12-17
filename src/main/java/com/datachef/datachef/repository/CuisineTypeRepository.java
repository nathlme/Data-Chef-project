package com.datachef.datachef.repository;

import com.datachef.datachef.model.CuisineType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CuisineTypeRepository extends JpaRepository<CuisineType, UUID> {
}
