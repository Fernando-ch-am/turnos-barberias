package com.example.backend.Mapper;

import com.example.backend.DTOs.UsuarioDTO;
import com.example.backend.DTOs.UsuarioRegistroDTO;
import com.example.backend.Entitys.Usuario;

public class UsuarioMapper{

public static UsuarioDTO toDto(Usuario usuario){
    UsuarioDTO dto = new UsuarioDTO(usuario.getId(), usuario.getEmail(),usuario.getNombre(),usuario.getRol());
    return dto;
}

public static Usuario toEntity(UsuarioRegistroDTO r){
    Usuario u = new Usuario();
    u.setEmail(r.getEmail());
    u.setNombre(r.getNombre());
    u.setContraseña(r.getContraseña());
    u.setRol(r.getRol());
    return u;
}

}
