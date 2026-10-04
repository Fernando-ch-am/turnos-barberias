package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class ResenaDTO {
    private Long id;
    private Integer clasificacion;
    private String comentario;
    private Long turnoId;
    private LocalDate turnoFecha;
    private LocalTime turnoHorarioInicio;
}