package com.example.backend.mapper;

import com.example.backend.dto.ResenaDTO;
import com.example.backend.dto.ResenaRegistroDTO;
import com.example.backend.entity.Resena;
import com.example.backend.entity.Turno;

public class ResenaMapper {

    public static ResenaDTO toDto(Resena resena) {
        ResenaDTO dto = new ResenaDTO(
            resena.getId(),
            resena.getClasificacion(),
            resena.getComentario(),
            resena.getTurno().getId(),
            resena.getTurno().getFecha(),
            resena.getTurno().getHorarioInicio()
        );
        return dto;
    }

    public static Resena toEntity(ResenaRegistroDTO r) {
        Resena resena = new Resena();
        resena.setClasificacion(r.getClasificacion());
        resena.setComentario(r.getComentario());
        // El turno se debe setear externamente en el service
        return resena;
    }
}