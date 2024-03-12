package com.project.projectFinal.jhlController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.projectFinal.dto.ChampionImageDto;
import com.project.projectFinal.dto.ChampionRankDto;
import com.project.projectFinal.service.ChampService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class JhlRestChampController {

	@Autowired
	ChampService champService;

	@PostMapping("/champSearch")
	public List<HashMap<String, String>> champSearch(ChampionImageDto champDto) {
		return champService.champSearch(champDto);
	}

	@PostMapping("/champLineSelect")
	public List<HashMap<String, String>> champLineSelect(ChampionImageDto champDto) {
		return champService.champLineSelect(champDto);
	}

	@GetMapping("/champListAll")
	@ResponseBody
	public List<HashMap<String, String>> champListAll() {
		return champService.champListAll();
	}

	@PostMapping("/champRank")
	public List<HashMap<String, Object>> champRank(ChampionRankDto rankDto) {
		return champService.champRank(rankDto);
	}


//	@PostMapping("/champCounter")
//	public void champCounter(ChampionRankDto rankDto) {
//
//		champService.champCounter(rankDto);
//
//	}

	
	@PostMapping("/champUpdate")
	public void champUpdate(ChampionRankDto rankDto) {

		champService.champUpdate(rankDto);
	}

	@PostMapping("/forGraphInfo")
	public List<Map<String, Object>> forGraphInfo(String championName) {
		return champService.forGraphInfo(championName);
	}
	@PostMapping("/forGraphInfo2")
	public List<Map<String, Object>> forGraphInfo2(@RequestBody Map<String, String> aMap) {
		return champService.forGraphInfo2(aMap);
	}

}
