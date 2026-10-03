package com.example.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data 
@AllArgsConstructor 
public class UsuarioDTO {
private Long id;
private String email;
private String nombre;
private String rol;
}
