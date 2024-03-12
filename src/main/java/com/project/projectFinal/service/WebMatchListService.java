package com.project.projectFinal.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.client.WebClient;

import com.project.projectFinal.dao.RiotGameDao;
import com.project.projectFinal.dto.RiotApiDto;
import com.project.projectFinal.dto.RiotGameDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class WebMatchListService {
	private int apiCount = 0;
	String[] ApikeyList = { "RGAPI-f94a4128-cb3b-4303-b92b-0016fa59b5a8", "RGAPI-3a9db266-dbba-4ead-9ec5-93b90d528991",
			"RGAPI-175e99fa-a692-4cbb-acfb-9410f712f370" }; // 깡통차기 , 씹악질 ,버프싸개
	private String api_key = null; // 리스트 돌아가면서 들어갈 예정

	@Autowired
	RiotGameDao riotGameDao;

//	private List<Map<String, RiotGameDto>> SummonerV4;
	public String getpuuId(RiotApiDto apiDto) {
		apiCount = apiDto.getMatchCnt();
		String apiKeyTeam = ApikeyList[Integer.valueOf(apiCount) % ApikeyList.length];
		api_key = apiKeyTeam;
//		log.info(apiKeyTeam);
//		System.out.println("getMatchCnt= " + apiDto.getMatchCnt() + " 이번에사용할 api key=" + api_key);
		String url = "https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + apiDto.getGameName() + "/"
				+ apiDto.getTagLine() + "?api_key=" + api_key;

		WebClient webClient = WebClient.builder().baseUrl(url).build();

		RiotApiDto response = webClient.get().uri(uriBuilder -> uriBuilder.build()).retrieve()
				.bodyToMono(RiotApiDto.class).block();

		return response.getPuuid();
	}

	public List<String> MatchList(RiotApiDto apiDto) {
		int Matchcnt = apiCount * 3;
		String count = Integer.toString(Matchcnt);

		String url = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + apiDto.getPuuid()
				+ "/ids?start=0&count=" + count + "&api_key=" + api_key;

		WebClient webClient = WebClient.builder().baseUrl(url).build();

		List<String> response = webClient.get().uri(uriBuilder -> uriBuilder.build()).retrieve().bodyToMono(List.class)
				.block();

		return response;
	}

	public Map gamedate(String matchList) {

		String url = "https://asia.api.riotgames.com/lol/match/v5/matches/" + matchList + "?api_key=" + api_key;
		WebClient webClient = WebClient.builder().baseUrl(url).build();

		Map response = webClient.get().uri(uriBuilder -> uriBuilder.build()).retrieve().bodyToMono(Map.class).block();

		return response;

	}

	private int RankCnt = 0;

	public Map<String, Object> SummonerV4(@RequestBody Map<String, Object> data) {
		try {

//			log.info(" ==data {}", data); // 티어값이 있으면 없으면으로 밑에 로직 시작
			if (data.get("Tier").equals("Tier")) {
				RankCnt++; // 동근 , 진문
				String[] SummonerV4_Api_keyList = { "RGAPI-3437c0e1-8256-4aae-b01c-1854a01a3533",
						"RGAPI-90ac9a4b-b80e-4142-b655-44166b6e9a2a" };
				String SummonerV4_Api_key = SummonerV4_Api_keyList[RankCnt % SummonerV4_Api_keyList.length];
//			System.out.println(RankCnt+ SummonerV4_Api_key);
				String riotIdGameName = String.valueOf(data.get("riotIdGameName"));
				String riotIdTagline = String.valueOf(data.get("riotIdTagline"));

				String url = "https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + riotIdGameName
						+ "/" + riotIdTagline + "?api_key=" + SummonerV4_Api_key;
				WebClient webClient = WebClient.builder().baseUrl(url).build();

				RiotApiDto account = webClient.get().uri(uriBuilder -> uriBuilder.build()).retrieve()
						.bodyToMono(RiotApiDto.class).block();

				String puuid = account.getPuuid();

				String url2 = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + puuid + "?api_key="
						+ SummonerV4_Api_key;
				WebClient webClient2 = WebClient.builder().baseUrl(url2).build();

				RiotApiDto SummonerId = webClient2.get().uri(uriBuilder -> uriBuilder.build()).retrieve()
						.bodyToMono(RiotApiDto.class).block();

				String url3 = "https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/" + SummonerId.getId()
						+ "?api_key=" + SummonerV4_Api_key;

				WebClient webClient3 = WebClient.builder().baseUrl(url3).build();

				List<Map<String, String>> Tier = webClient3.get().uri(uriBuilder -> uriBuilder.build()).retrieve()
						.bodyToMono(List.class).block();

				if (Tier.size() != 0) {
					Map<String, String> UPdateTier = Tier.get(0);
					if (UPdateTier.get("queueType").equals("RANKED_SOLO_5x5")) {
						String tier = UPdateTier.get("tier");
						String rank = UPdateTier.get("rank");
//					System.out.println(data);
						RiotGameDto rDto = new RiotGameDto();
						rDto.setRiotIdGameName(String.valueOf(data.get("riotIdGameName")));
						rDto.setRiotIdTagline(String.valueOf(data.get("riotIdTagline")));
						rDto.setMatchId(String.valueOf(data.get("matchId")));
						rDto.setTier(tier);
						rDto.setRank(rank);
						System.out.println(rDto);
						// 티어가 널일 때 업데이트
						return riotGameDao.UPdateTier(rDto);
					}
				}
			}
		}

		catch (Exception e) { // 없는 소환사 아이디 일경우 //
			String tier = "Tier";
			RiotGameDto rDto = new RiotGameDto();
			rDto.setRiotIdGameName(String.valueOf(data.get("riotIdGameName")));
			rDto.setRiotIdTagline(String.valueOf(data.get("riotIdTagline")));
			rDto.setMatchId(String.valueOf(data.get("matchId")));
			rDto.setTier(tier);

			return riotGameDao.UPdateTier(rDto);
		}
		return riotGameDao.forOneData(data);

	}

	public List<Map<String, Object>> SearchUser(String gameName, String tagLine) {
		String UserApi_key = "RGAPI-175e99fa-a692-4cbb-acfb-9410f712f370";

		String url = "https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + gameName + "/" + tagLine
				+ "?api_key=" + UserApi_key;

		WebClient webClient = WebClient.builder().baseUrl(url).build();

		RiotApiDto response = webClient.get().uri(uriBuilder -> uriBuilder.build()).retrieve()
				.bodyToMono(RiotApiDto.class).block();
/////////////////////////////////////////
		String url2 = "https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/" + response.getPuuid()
				+ "?api_key=" + UserApi_key;
		WebClient webClient2 = WebClient.builder().baseUrl(url2).build();

		RiotApiDto response2 = webClient2.get().uri(uriBuilder -> uriBuilder.build()).retrieve()
				.bodyToMono(RiotApiDto.class).block();
////////////////////////////////////////////
		String url3 = "https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/" + response2.getId()
				+ "?api_key=" + UserApi_key;

		WebClient webClient3 = WebClient.builder().baseUrl(url3).build();

		List<Map<String, Object>> response3 = webClient3.get().uri(uriBuilder -> uriBuilder.build()).retrieve()
				.bodyToMono(List.class).block();
//		log.info("==response3 : {}", response3);
		return response3;

	}

	public List<String> MatchList(Map<String, Object> uMap) {
//		log.info("=={}", uMap);
		int count1 = (Integer) uMap.get("needCnt");
		String count = String.valueOf(count1);
		String puuId = (String) uMap.get("puuid");
		String url = "https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/" + puuId + "/ids?start=0&count="
				+ count + "&api_key=" + api_key;

		WebClient webClient = WebClient.builder().baseUrl(url).build();

		List<String> response = webClient.get().uri(uriBuilder -> uriBuilder.build()).retrieve().bodyToMono(List.class)
				.block();

		return response;

	}

}