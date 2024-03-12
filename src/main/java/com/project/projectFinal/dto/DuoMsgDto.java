package com.project.projectFinal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DuoMsgDto {
	private String userId; //로그인 아이디
	private String rCnt; //방번호
	private String msg;//메세지
	private String date;
	
	
	private String hostId;
	private String guestId;
		
	
	
	
	
	
	
	
	
	
	
}
