package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Turno;

public interface TurnoRepo extends JpaRepository<Turno, Long> {
}