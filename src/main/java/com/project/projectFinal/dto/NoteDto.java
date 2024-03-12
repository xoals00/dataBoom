package com.project.projectFinal.dto;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NoteDto {
	private int n_num;
	private String recv_userId;
	private String send_userId;
	private String n_title;
	private String n_message;
	private Date n_date;
	private int status;
	private String inqAnswer;
}
