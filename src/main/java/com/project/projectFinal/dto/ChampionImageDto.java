package com.project.projectFinal.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChampionImageDto {
	private int championid;
	private String champion_name_kr; // 한국이름
	private String champion_name; // 영어이름
	private String champion_name_cons; //알리아스
	private String champSearch;
	private String line;
	private String searchChamp;
}
