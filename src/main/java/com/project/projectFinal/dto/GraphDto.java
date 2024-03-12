package com.project.projectFinal.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GraphDto {
	
	private int itemId_graph;
	private int itemPickCnt_graph;
	private String line_graph;
	private int allItemCnt_graph;
	private String itemName_graph;
	
}
