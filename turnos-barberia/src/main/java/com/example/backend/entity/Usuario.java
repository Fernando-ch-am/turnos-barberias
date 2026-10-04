package com.example.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Table(name="Usuario")
public class Usuario {

@Id 
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

@Column(name = "email", nullable=false, unique=true)
private String email;

@Column(name = "nombre", nullable=false, length=50)
private String nombre;

@Column(name = "contrasena", nullable=false, length=255)
private String contrasena;

@Column(name = "rol", nullable=false)
private String rol;

}
