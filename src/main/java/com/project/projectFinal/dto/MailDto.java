package com.project.projectFinal.dto;

import lombok.Data;

@Data
public class MailDto {

    private String receiver;
    private String title;
    private String content;
}