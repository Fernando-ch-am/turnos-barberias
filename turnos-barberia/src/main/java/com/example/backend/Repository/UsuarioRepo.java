package com.example.backend.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.Entitys.Usuario;

public interface UsuarioRepo extends JpaRepository<Usuario, Long>{
    Optional<Usuario> findByEmail(String email);
}