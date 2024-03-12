package com.project.projectFinal.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.project.projectFinal.dao.WebDao;
import com.project.projectFinal.dto.RiotApiDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class WebClientService {

	@Autowired
	WebDao webdao;

	private String[] api_keyList = { "RGAPI-c6320d0e-7590-4ec7-9e0b-d4ae0f1f775a",
			"RGAPI-9c64dc62-e93a-48f3-9080-14ab007cd6e3", "RGAPI-3437c0e1-8256-4aae-b01c-1854a01a3533",
			"RGAPI-f94a4128-cb3b-4303-b92b-0016fa59b5a8", "RGAPI-3a9db266-dbba-4ead-9ec5-93b90d528991",
			"RGAPI-175e99fa-a692-4cbb-acfb-9410f712f370" };
	private int cnt = 1;

	public String getPuuId(String lolId, String tagId) {

		String api_key = api_keyList[cnt%6];
		String url = "https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + lolId + "/" + tagId
				+ "?api_key=" + api_key;
		// webClient 기본 설정
		WebClient webClient = WebClient.builder().baseUrl(url).build();

		// api 요청 >> 맵인경우
//		Map<String, Object> response = webClient.get()
//				.uri(uriBuilder -> uriBuilder
//				.build())
//				.retrieve()
//				.bodyToMono(Map.class)
//				.block();
		RiotApiDto response = webClient.get().uri(uriBuilder -> uriBuilder.build()).retrieve()
				.bodyToMono(RiotApiDto.class).block();
		// 결과 확인
//		log.info(response.toString());
		return response.getPuuid();

	}

	public ArrayList<String> getgameid(String puuid, String count) {

		// 가지고 올 경기 수 << 추후에 늘리기 // 깡통차기 , 씹악질 ,버프싸개
//		String[] ApikeyList = { "RGAPI-c6320d0e-7590-4ec7-9e0b-d4ae0f1f775a",
//				"RGAPI-9c64dc62-e93a-48f3-9080-14ab007cd6e3", "RGAPI-3437c0e1-8256-4aae-b01c-1854a01a3533",
//				"RGAPI-f94a4128-cb3b-4303-b92b-0016fa59b5a8", "RGAPI-3a9db266-dbba-4ead-9ec5-93b90d528991",
//				"RGAPI-175e99fa-a692-4cbb-acfb-9410f712f370" };

		String api_key = api_keyList[cnt%6];
//		cnt++;
		log.info(api_key);

		String url = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuid + "/ids?start=0&count="
				+ count + "&api_key=" + api_key;
		// webClient 기본 설정
		WebClient webClient = WebClient.builder().baseUrl(url).build();

		List<String> response = webClient.get().uri(uriBuilder -> uriBuilder.build()).retrieve().bodyToMono(List.class)
				.block();
		// 결과 확인
//		log.info(response.toString());
		ArrayList<String> res = new ArrayList<>(response);

		return res;
	}

	public Map getgameinfo(String matchId) { // 매치id를 통해서 데이터를 받음
		cnt++;
		String api_key = api_keyList[cnt%6];
		
		String url = "https://asia.api.riotgames.com/lol/match/v5/matches/" + matchId + "?api_key=" + api_key;
		// webClient 기본 설정

		WebClient webClient = WebClient.builder().baseUrl(url).build();

		Map response = webClient.get() // 맵으로 받으면 됨
				.uri(uriBuilder -> uriBuilder.build()).retrieve().bodyToMono(Map.class).block();
//
//		JSONObject parser = new JSONObject(checkTime(response)); // 받은 데이터를 json화 시킴
//
//		return parser;

		return response;

	}

	public Map getgameTimeline(String matchId) {
		
		cnt++;
		String api_key = api_keyList[cnt%6];
		String url = "https://asia.api.riotgames.com/lol/match/v5/matches/" + matchId + "/timeline?api_key=" + api_key;

		WebClient webClient = WebClient.builder()
				.codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(30 * 1024 * 1024)).baseUrl(url)
				.build();

		Map response = webClient.get() // 맵으로 받으면 됨
				.uri(uriBuilder -> uriBuilder

						.build())
				.retrieve().bodyToMono(Map.class).block();

//		JSONObject parser = new JSONObject(response); // 받은 데이터를 json화 시킴
//
//		return parser;
		return response;

	}

// 타임 스탬프를 통해서 몇일전 게임인지 찾는 구문
	public Map checkTime(Map response) {

		Map<String, Object> gameEndTimestamp = (Map<String, Object>) response.get("info");
		String gameEndTimestamp1 = gameEndTimestamp.get("gameEndTimestamp") + "";
		Instant current = Instant.now();
		long epochSecond = current.getEpochSecond() * 1000;
		long time = epochSecond - Long.parseLong(gameEndTimestamp1);

		int day = (int) Math.floor(time / 1000 / 60 / 60 / 24);
		int hour = (int) Math.floor(time / 1000 / 60 / 60);
		int min = (int) Math.floor(time / 1000 / 60);
		String spentTime;
		if (day == 0 && hour == 0) {
			spentTime = min + "분 전 게임입니다.";
		} else if (day == 0) {
			spentTime = hour + "시간 전 게임입니다.";
		} else {
			spentTime = day + "일 전 게임입니다.";
		}
		response.put("timeCheck", spentTime);
		return response;
	}

	public void dbSaveInfoRiotTv(List<Map<String, Object>> dbList) {
		for (Map<String, Object> i : dbList) {

			webdao.dbSaveInfoRiotTv(i);

		}
	}

	public List<Map<String, Object>> dbFindData(RiotApiDto riotApiDto) {

		ArrayList<String> mList = webdao.dbFindData(riotApiDto);

		int matchId = riotApiDto.getMatchIdCnt(); // 총 갯수

		if (mList.size() == 0) {

			return null;
		} else {
			List<Map<String, Object>> dList = new ArrayList<>();

			for (String i : mList) {
				List<Map<String, Object>> dbList = new ArrayList<>();
				dbList = webdao.dbFindData1(i);
				dList.addAll(dbList);

			}

			return dList;

		}

	}

	// 없는 매치아이디 리스트 확인작업
	public List<Map<String, Object>> matchListVsDb(ArrayList<String> mList, RiotApiDto riotApiDto) {

		riotApiDto.setStartValue(riotApiDto.getStartValue() - riotApiDto.getMatchIdCnt());

		ArrayList<String> newmList = new ArrayList<>(); // 뒤에 3개만

		for (int i = mList.size() - 1; mList.size() - riotApiDto.getMatchIdCnt() <= i; i--) {

			newmList.add(mList.get(i));
		}

		ArrayList<String> dbList = webdao.matchIdRecent(riotApiDto);
		log.info("==dbList{}", newmList);
		log.info("==dbList{}", dbList);
		newmList.removeAll(dbList);
		log.info("==dbList{}", newmList);
		List<Map<String, Object>> findList = new ArrayList<>();
		if (mList.size() != 0) {// 3개다 같지 않다.

			for (String matchId : newmList) { // 남아있는 경기번호만 가면됨

				Map<String, Object> mMap = getgameinfo(matchId);
				findList.add(mMap);
			}

		}

		return findList;
	}

	public List<Map<String, Object>> newDataInfo(RiotApiDto riotApiDto) {

		return webdao.newDataInfo(riotApiDto);
	}

	public List<Map<String, Object>> forGraphInfo(RiotApiDto riotApiDto) {

		return webdao.forGraphInfo(riotApiDto);
	}

}