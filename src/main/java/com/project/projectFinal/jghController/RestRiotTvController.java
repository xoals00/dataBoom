package com.project.projectFinal.jghController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.projectFinal.dto.RiotApiDto;
import com.project.projectFinal.service.WebClientService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/riotTv")
public class RestRiotTvController {

	@Autowired
	WebClientService webClientService;

	@PostMapping("/findPuuIdFindList")
	public List<Map<String, Object>> findPuuIdFindList(RiotApiDto riotApiDto) {

		String puuid = webClientService.getPuuId(riotApiDto.getGameName(), riotApiDto.getTagLine());

		// mList : api키로 받아온 경기번호
		ArrayList<String> mList = webClientService.getgameid(puuid, String.valueOf(riotApiDto.getStartValue()));
		// db와 비교하여 모자란 것들 가지고 오기
		List<Map<String, Object>> fList = webClientService.matchListVsDb(mList, riotApiDto);

		return fList;

	}


	@PostMapping("/dbSaveInfoRiotTv")
	public void dbSaveInfoRiotTv(@RequestBody List<Map<String, Object>> dbList) {

		// 리스트맵 db저장
		webClientService.dbSaveInfoRiotTv(dbList);
	}

	@PostMapping("/dbFindData")
	public List<Map<String, Object>> dbFindData(RiotApiDto riotApiDto) {
		
		return webClientService.dbFindData(riotApiDto);

	}
	@PostMapping("/newDataInfo")
	public List<Map<String, Object>> newDataInfo(RiotApiDto riotApiDto) {

		return webClientService.newDataInfo(riotApiDto);

	}
	@PostMapping("/forGraphInfo")
	public List<Map<String, Object>> forGraphInfo(RiotApiDto riotApiDto) {

		List<Map<String, Object>> aa = webClientService.forGraphInfo(riotApiDto);
		
		return aa;

	}
}
