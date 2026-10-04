package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResenaRegistroDTO {
    private Integer clasificacion;
    private String comentario;
    private Long turnoId;
}