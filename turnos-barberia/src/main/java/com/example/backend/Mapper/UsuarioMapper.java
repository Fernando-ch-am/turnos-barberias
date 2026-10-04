package com.example.backend.mapper;

import com.example.backend.dto.UsuarioDTO;
import com.example.backend.dto.UsuarioRegistroDTO;
import com.example.backend.entity.Usuario;

public class UsuarioMapper{

public static UsuarioDTO toDto(Usuario usuario){
    UsuarioDTO dto = new UsuarioDTO(usuario.getId(), usuario.getEmail(),usuario.getNombre(),usuario.getRol());
    return dto;
}

public static Usuario toEntity(UsuarioRegistroDTO r){
    Usuario u = new Usuario();
    u.setEmail(r.getEmail());
    u.setNombre(r.getNombre());
    u.setContrasena(r.getContrasena());
    u.setRol(r.getRol());
    return u;
}

}
