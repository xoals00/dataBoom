package com.project.projectFinal.stmController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.project.projectFinal.service.MatchListService;
import com.project.projectFinal.service.WebMatchListService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class SummonerV4Controller {
	@Autowired
	MatchListService matchListService;

	@Autowired
	WebMatchListService webmatchListService;
	
	
	
	
	@PostMapping("/summoner/v4/userList")
	public List<Map<String, Object>> summonerV4(String matchId) {

		return matchListService.DBRiotGameName(matchId);
	}

	@PostMapping("/summoner/v4/Rank")
	public Map<String, Object> summonerV4Rank(@RequestBody Map<String, Object> data) {

		return webmatchListService.SummonerV4(data);
	}

	@PostMapping("/summoner/v4/Search")
	public List<Map<String, Object>> SearchUser(String gameName, String tagLine) {

		return webmatchListService.SearchUser(gameName, tagLine);
	}

}
