package com.datachef.datachef.repository;

import com.datachef.datachef.model.RefreshToken;
import com.datachef.datachef.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
    Optional<RefreshToken> findByTokenAndRevokedFalse(String token);
    List<RefreshToken> findByUserAndRevokedFalse(Users user);

    @Modifying
    @Query("DELETE FROM RefreshToken rt WHERE rt.expiryDate < :date")
    void deleteAllExpiredSince(@Param("date") Date date);
}
