package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor 
public class UsuarioRegistroDTO {
private String email;
private String nombre;
private String contraseña;
private String rol;
}
