package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data 
@AllArgsConstructor 
@NoArgsConstructor 
public class UsuarioRegistroDTO {
private String email;
private String nombre;
private String contrasena;
private String rol;
}
