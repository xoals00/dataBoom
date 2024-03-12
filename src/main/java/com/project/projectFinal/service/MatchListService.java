package com.project.projectFinal.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.projectFinal.dao.RiotGameDao;
import com.project.projectFinal.dto.RiotApiDto;
import com.project.projectFinal.dto.RiotGameDto;

@Service
public class MatchListService {
	@Autowired
	WebMatchListService webmatchListService;
	@Autowired
	RiotGameDao riotGameDao;

	public String puuId(RiotApiDto userListDto) {
		String puuid = webmatchListService.getpuuId(userListDto);

		return puuid;
	}

	public List<String> MatchList(RiotApiDto apiDto) {

		List<String> MList = webmatchListService.MatchList(apiDto);

		return MList;

	}

	public List<Map<String, Object>> gamedate(List<String> matchList) {
		List<Map<String, Object>> MList = new ArrayList<>();
//		System.out.println(matchList);
		for (String i : matchList) {
			Map gMap = webmatchListService.gamedate(i);
			MList.add(gMap);
		}
//		System.out.println(MList);
		return MList;
	}

	public void RiotGameInfo(Map<String, RiotGameDto> rMap) {
		riotGameDao.RiotGameInfo(rMap);
	}

	public void RiotGameTeams(Map<String, RiotGameDto> rMap) {
		riotGameDao.RiotGameTeams(rMap);

	}

	public void RiotGameBans(Map<String, RiotGameDto> rMap) {
		riotGameDao.RiotGameBans(rMap);

	}

	public List<Map<String, RiotGameDto>> RiotGameInfoSelect(String matchId) {
		return riotGameDao.RiotGameInfoSelect(matchId);
	}

//	public List<Map<String, RiotGameDto>> RiotGameTeamsSelect(String matchId) {
//		return riotGameDao.RiotGameTeamsSelect(matchId);
//
//	}

//	public List<Map<String, RiotGameDto>> RiotGameBansSelect(String matchId) {
//		return riotGameDao.RiotGameBansSelect(matchId);
//		
//	}

	public List<String> DBRiotGameMatchSelect(String gameName) {
		return riotGameDao.DBRiotGameMatchSelect(gameName);

	}

	public List<Map> DbriotGameData(List<String> matchList) {
		List<Map> MList = new ArrayList<>();
		for (int i = 0; i < matchList.size(); i++) {
			Map gMap = riotGameDao.DbriotGameData(matchList.get(i));
			MList.add(gMap);
		}
		System.out.println(MList);
		return MList;
	}

	public int getMatchId(String matchId) {
		int riotcount = riotGameDao.getMatchId(matchId);
		return riotcount;
	}

//	장기훈
	public Map<String, Object> sendDataToPy(Map<String, String> sMap) {

		return riotGameDao.sendDataToPy(sMap);
	}

	public List<Map<String, Object>> DBRiotGameName(String matchId) {

		return riotGameDao.DBRiotGameName(matchId);

	}

	public HashMap<String, Object> saveAiData(Map<String, Object> aiReultMap) {
		return riotGameDao.saveAiData(aiReultMap);

	}

	public Map<String, Object> forOneData(Map<String, Object> aMap) {
		return riotGameDao.forOneData(aMap);

	}

	public List<Map<String, Object>> timelineInfo(String matchId) {

		return riotGameDao.timelineInfo(matchId);
	}

	public List<Map<String, Object>> teamList(String matchId) {
		// TODO Auto-generated method stub
		return riotGameDao.teamList(matchId);
	}

	public List<Map<String, Object>> LanePrefer(String gameName) {
		return riotGameDao.LanePrefer(gameName);

	}

	public List<Map<String, Object>> championPrefer(String gameName) {
		return riotGameDao.championPrefer(gameName);

	}

	public List<Map<String, Object>> GameModeSearch(Map<String, Object> qMap) {
		List<String> macthIdList = new ArrayList<>();
		List<Map<String, Object>> mList = new ArrayList<>();
		int queueId = (Integer) qMap.get("queueId");

		// 1 . 해당 조건에 맞는 리스트 3개를 가지고옴

		macthIdList = riotGameDao.RiotGameInfoSelectQueueId(qMap);

		// 2. 그 리스트 3개를 기존 형식에 맞춰서 가지고 감
		for (String matchId : macthIdList) {
			// 3 기존에 있는 메서드를 활용하여 데이터를 가지고옴
			Map<String, Object> addmathIdMap = new HashMap<>();
			// 4. 기존형식과 동일하게 만들어줌
			addmathIdMap.put("info", riotGameDao.DBRiotGameName(matchId));
			addmathIdMap.put("matchId", matchId);
			mList.add(addmathIdMap);
		}

		return mList;
	}

	public List<Map<String, Object>> findPartOfQueuId(String riotIdGameName) {

		return riotGameDao.findPartOfQueuId(riotIdGameName);
	}

	public List<Map<String, Object>> nowMatchListCnt(Map<String, Object> uMap) {
		// TODO Auto-generated method stub
		return riotGameDao.nowMatchListCnt(uMap);
	}

	public List<String> MatchList(Map<String, Object> uMap) {

		return webmatchListService.MatchList(uMap);
	}

	public List<Map<String, Object>> infoData(Map<String, Object> iMap) {
		// TODO Auto-generated method stub
		return riotGameDao.infoData(iMap);
	}

	public List<Map<String, Object>> matchIdList(Map<String, Object> iMap) {
		// TODO Auto-generated method stub
		return riotGameDao.matchIdList(iMap);
	}

	public List<Map<String, Object>> infoDataAll(Map<String, Object> qMap) {
		List<String> macthIdList = new ArrayList<>();
		List<Map<String, Object>> mList = new ArrayList<>();

		// 1 . 해당 조건에 맞는 리스트 3개를 가지고옴

		macthIdList = riotGameDao.infoDataAll(qMap);

		// 2. 그 리스트 3개를 기존 형식에 맞춰서 가지고 감
		for (String matchId : macthIdList) {
			// 3 기존에 있는 메서드를 활용하여 데이터를 가지고옴
			Map<String, Object> addmathIdMap = new HashMap<>();
			// 4. 기존형식과 동일하게 만들어줌
			addmathIdMap.put("info", riotGameDao.DBRiotGameName(matchId));
			addmathIdMap.put("matchId", matchId);
			mList.add(addmathIdMap);
		}
		return mList;
	}

	public List<Map<String, Object>> matchIdCntList(Map<String, Object> iMap) {
		List<String> macthIdList = new ArrayList<>();
		List<Map<String, Object>> mList = new ArrayList<>();
		// 10개의 matchId가 들어옴

		// 2. 그 리스트 3개를 기존 형식에 맞춰서 가지고 감
		for (String matchId : macthIdList) {
			// 3 기존에 있는 메서드를 활용하여 데이터를 가지고옴
			Map<String, Object> addmathIdMap = new HashMap<>();
			// 4. 기존형식과 동일하게 만들어줌
			addmathIdMap.put("info", riotGameDao.DBRiotGameName(matchId));
			addmathIdMap.put("matchId", matchId);
			mList.add(addmathIdMap);
		}
		return mList;

	}

	public List<String> infoDataCnt(Map<String, Object> iMap) {

		return riotGameDao.infoDataCnt(iMap);
	}

	public List<String> infoDataAllCnt(Map<String, Object> iMap) {
		// TODO Auto-generated method stub
		return riotGameDao.infoDataAllCnt(iMap);
	}

	public HashMap<String, Object> findAiData(Map<String, Object> aMap) {
		// TODO Auto-generated method stub
		return riotGameDao.findAiData(aMap);
	}

}