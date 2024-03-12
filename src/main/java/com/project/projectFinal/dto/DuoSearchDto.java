package com.project.projectFinal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DuoSearchDto {
	
	private String userId;
	private int rCnt;
	private String myPosition;
	private String duoPosition;
	private String tier;
	private String gameType;
	private String memo;
	private String date;

}
