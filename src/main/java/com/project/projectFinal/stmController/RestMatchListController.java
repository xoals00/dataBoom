package com.project.projectFinal.stmController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.google.gson.Gson;
import com.project.projectFinal.dto.RiotApiDto;
import com.project.projectFinal.dto.RiotGameDto;
import com.project.projectFinal.service.MatchListService;
import com.project.projectFinal.service.WebClientService;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class RestMatchListController {
	@Autowired
	MatchListService matchListService;
	@Autowired
	WebClientService webClientService;

	private List<String> matchList; // 검색시 리스트
	private List<String> MorematchList; // 검색시 리스트

	@PostMapping("/match/list")
	public List<Map<String, Object>> matchList(RiotApiDto userListDto, Model model) {
		List<Map<String, Object>> MList = new ArrayList<>();
		RiotGameDto riotGameDto = new RiotGameDto();
		String puuid = matchListService.puuId(userListDto);

		userListDto.setPuuid(puuid);

		matchList = matchListService.MatchList(userListDto);
//		log.info("=={}", matchList);
		List<String> DbMatchList = matchListService.DBRiotGameMatchSelect(userListDto.getGameName());
		if (DbMatchList.size() == 0) { // 만약 디비에 저장 데이터가 없을경우 바로 api 가기

			MList = matchListService.gamedate(matchList);

			return MList;
		}
		int Dbcount = 0; // 디비에 있는지 확인을 위하여 카운트
		List<String> newApiMatchList = new ArrayList<>();
		for (int i = 0; i < matchList.size(); i++) { // 디비랑 비교
			int Db = matchListService.getMatchId(matchList.get(i));
			if (Db == 0) {
				newApiMatchList.add(matchList.get(i));
			}
		}

		if (newApiMatchList.size() != 0) {

			MList = matchListService.gamedate(newApiMatchList);

		}

		return MList;

	}

	@PostMapping("/riot/api")
	public String RiotGameapi(String Mlist) throws JsonMappingException, JsonProcessingException {
		RiotGameDto riotGameDto = new RiotGameDto();
		Gson gson = new Gson();
		ArrayList<HashMap<String, ArrayList<HashMap<String, String>>>> map1 = gson.fromJson(Mlist, ArrayList.class);

		int res = 0;
		for (int i = 0; i < map1.size(); i++) {
			Map response = map1.get(i);
			List info = (List) response.get("info");
			for (int j = 0; j < info.size(); j++) {
				Map RiotInfo = (Map) info.get(j);
				matchListService.RiotGameInfo(RiotInfo);
			}
		}

		return "잘됨";

	}

	@PostMapping("/riot/game")
	public ArrayList<HashMap<String, Object>> RiotGame() {
		List<String> MatchList = matchList; // 새로 가져온 리스트

		if (MorematchList != null) {
			if (MorematchList.size() > MatchList.size()) {
				MorematchList = null;
			}
		}

		List<String> MatchListSelect = new ArrayList<>();// 새로 가져온 리스트

		if (MatchList.size() > 3) {
			for (int j = MorematchList.size(); j < MatchList.size(); j++) {
				MatchListSelect.add(MatchList.get(j));
			}
		} else {
			MatchListSelect = MatchList;
		}
		ArrayList<HashMap<String, Object>> MList = new ArrayList<>();
		for (int i = 0; i < MatchListSelect.size(); i++) {
			HashMap<String, Object> newGList = new HashMap<>();
			List<Map<String, RiotGameDto>> infoData = matchListService.RiotGameInfoSelect(MatchListSelect.get(i));
			;
//			Map<String, Object> a = webClientService.getgameTimeline(String.valueOf(infoData.get(0).get("matchId")));
			String MatchId = MatchListSelect.get(i);
			newGList.put("info", infoData);
			newGList.put("matchId", MatchId);
//			newGList.put("timelines", a);
			MList.add(newGList);
		}
		MorematchList = matchList;
		return MList;
	}

	@PostMapping("/lane/prefer")
	public ArrayList<HashMap<String, Object>> LanePrefer(String gameName) {
		ArrayList<HashMap<String, Object>> MList = new ArrayList<>();
		HashMap<String, Object> newGList = new HashMap<>();
		List<Map<String, Object>> championPrefer = matchListService.championPrefer(gameName);
		List<Map<String, Object>> LanePrefer = matchListService.LanePrefer(gameName);
		newGList.put("championPrefer", championPrefer);
		newGList.put("LanePrefer", LanePrefer);
//		System.out.println(newGList);
		MList.add(newGList);
		return MList;
	}

	@PostMapping("/GameMode/Search")
	public List<Map<String, Object>> GameModeSearch(@RequestBody Map<String, Object> qMap) {
//		log.info("==qMap: {}", qMap);

		List<Map<String, Object>> MList = new ArrayList<>();
		Integer[] qList = { 420, 440, 450, 490, 1900 }; // queueId 증가에 따라 추가요망

		for (int queueId : qList) {
			if ((Integer) qMap.get("queueId") == queueId) {

//				log.info("queueId : {}", queueId);
				return matchListService.GameModeSearch(qMap);
			}

		}
		if ((Integer) qMap.get("queueId") == 0) {

			return matchListService.infoDataAll(qMap);

//			return 

		}
		return matchListService.GameModeSearch(qMap);

	}

	@PostMapping("/GameMode/queuId")
	public List<Map<String, Object>> findPartOfQueuId(String riotIdGameName) {

		return matchListService.findPartOfQueuId(riotIdGameName);
	}

	@PostMapping("/GameMode/update")
	public List<Map<String, Object>> UserUpdate(@RequestBody Map<String, Object> uMap, Model model) {
		List<Map<String, Object>> MList = new ArrayList<>();
		List<Map<String, Object>> wishList = new ArrayList<>();

		List<String> needList = new ArrayList<>();
		RiotApiDto userListDto = new RiotApiDto();
		String gameName = (String) uMap.get("gameName");
		String tagLine = (String) uMap.get("tagLine");

		userListDto.setGameName(gameName);
		userListDto.setTagLine(tagLine);
		String puuid = matchListService.puuId(userListDto);
		List<Map<String, Object>> matchCntList = matchListService.nowMatchListCnt(uMap);

		int needCnt = matchCntList.size() + 3;

		if (needCnt > 100) {
			needCnt = 100;

		}

		uMap.put("puuid", puuid);
		uMap.put("needCnt", needCnt);

//		log.info("=== {}", puuid);
//		log.info("====matchCntList {}", needCnt);

		needList = matchListService.MatchList(uMap);

		for (int i = needList.size() - 1; i > needList.size() - 4; i--) {

			String matchId = needList.get(i);

			Map<String, Object> updateMap = webClientService.getgameinfo(matchId);
			wishList.add(updateMap);

		}

		return wishList;
	}

	@PostMapping("/upDate/saveData")
	public String saveData(String Mlist) {
		RiotGameDto riotGameDto = new RiotGameDto();
		Gson gson = new Gson();
		ArrayList<HashMap<String, ArrayList<HashMap<String, String>>>> map1 = gson.fromJson(Mlist, ArrayList.class);

		int res = 0;
		for (int i = 0; i < map1.size(); i++) {
			Map response = map1.get(i);
			List info = (List) response.get("info");
			for (int j = 0; j < info.size(); j++) {
				Map RiotInfo = (Map) info.get(j);
				matchListService.RiotGameInfo(RiotInfo);
			}
		}

		return "업데이트저장성공";

	}

	@PostMapping("/upDate/infoMatchId")
	public List<String> infoMatchId(@RequestBody Map<String, Object> iMap) {
		if ((Integer) iMap.get("queueId") == 0) {

		return matchListService.infoDataAllCnt(iMap);
		}
		return matchListService.infoDataCnt(iMap);

	}

	@PostMapping("/upDate/infoData")
	public List<Map<String, Object>> infoData(@RequestBody Map<String, Object> iMap) {
		List<Map<String, Object>> wishList = new ArrayList<>();
		
		List<String> nList = (List) iMap.get("needList");

		for (String matchId : nList) {
//			log.info(matchId);
			Map<String, Object> newMap = new HashMap<>();
			newMap.put("info", matchListService.DBRiotGameName(matchId));
			newMap.put("matchId", matchId);

			wishList.add(newMap);
		}
//			
		return wishList;

	}
}