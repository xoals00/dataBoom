package com.project.projectFinal.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.projectFinal.dao.GraphDao;
import com.project.projectFinal.dto.GraphDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class GraphService {
	
	@Autowired
	GraphDao gd;

	public List<HashMap<String, GraphDto>> itemGraphLine(GraphDto gDto) {
		
		return gd.itemGraphLine(gDto);
	}

}
