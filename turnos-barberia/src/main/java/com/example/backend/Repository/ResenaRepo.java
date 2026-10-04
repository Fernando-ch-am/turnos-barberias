package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.entity.Resena;

public interface ResenaRepo extends JpaRepository<Resena, Long> {
}