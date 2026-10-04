package com.example.backend.mapper;

import com.example.backend.dto.TurnoDTO;
import com.example.backend.entity.Turno;

public class TurnoMapper {

    public static TurnoDTO toDto(Turno turno) {
        TurnoDTO dto = new TurnoDTO(
            turno.getId(),
            turno.getFecha(),
            turno.getHorarioInicio(),
            turno.getEstado(),
            turno.getUsuario().getId(),
            turno.getUsuario().getNombre(),
            turno.getPeluqueria().getId(),
            turno.getServicio().getId(),
            turno.getServicio().getNombre()
        );
        return dto;
    }
}