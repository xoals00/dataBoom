package com.project.projectFinal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChampionRankDto {
	private String teamPosition;
	private String championName;
	private int championId;
	private String tier;

}
