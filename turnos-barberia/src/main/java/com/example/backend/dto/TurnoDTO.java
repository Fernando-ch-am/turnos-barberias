package com.example.backend.dto;

import com.example.backend.entity.EstadoTurno;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
public class TurnoDTO {
    private Long id;
    private LocalDate fecha;
    private LocalTime horarioInicio;
    private EstadoTurno estado;
    private Long usuarioId;
    private String usuarioNombre;
    private Long peluqueriaId;
    private Long servicioId;
    private String servicioNombre;
}