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
@Table(name = "peluqueria")
public class Peluqueria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_p", nullable = false, length = 45)
    private String nombreP;

    @Column(name = "descripcion", nullable = false, length = 45)
    private String descripcion;

    @Column(name = "telefono", nullable = false, length = 45)
    private String telefono;

    @Column(name = "direccion", nullable = false, length = 45)
    private String direccion;

    @Column(name = "usuario_id")
    private Usuario usuario;
}