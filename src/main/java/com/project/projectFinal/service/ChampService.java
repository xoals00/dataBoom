package com.project.projectFinal.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.projectFinal.dao.ChampDao;
import com.project.projectFinal.dto.ChampionImageDto;
import com.project.projectFinal.dto.ChampionRankDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChampService {

	@Autowired
	ChampDao champDao;

	public List<HashMap<String, String>> championList() {

		return champDao.championList();
	}

	public List<HashMap<String, String>> champSearch(ChampionImageDto champDto) {

		return champDao.champSearch(champDto);
	}

	public List<HashMap<String, String>> champLineSelect(ChampionImageDto champDto) {
		return champDao.champLineSelect(champDto);
	}

	public List<HashMap<String, String>> champListAll() {
		return champDao.champListAll();
	}

	public List<HashMap<String, Object>> champRank(ChampionRankDto rankDto) {

		return champDao.champRank(rankDto);
	}
	
//	public void champCounter(ChampionRankDto rankDto) {
//
//		List<HashMap<String, Object>> laneChampCounterList = champDao.laneCounterListInfo(rankDto);
////
//		for (Map<String, Object> counterChamp : laneChampCounterList) {
////
//			String teamPosition = rankDto.getTeamPosition();
//			int championId = (int) counterChamp.get("championid");
////
//
//			List<HashMap<String, Object>> rList = champDao.rankListInfo(teamPosition, championId);
//
//			for (Map<String, Object> rl : rList) {
//
//				Object championName = rl.get("championName");
//				Object champion_name_kr = rl.get("champion_name_kr");
//				Object champ_win_cnt = rl.get("champ_win_cnt");
//				Object champ_win_rate = rl.get("champ_win_rate");
//				Object enemy_championName = rl.get("enemy_championName");
//				Object enemy_championName_kr = rl.get("enemy_championName_kr");
//				Object teamPosition1 = rl.get("teamPosition");
//				Object enemy_champ_win_cnt = rl.get("enemy_champ_win_cnt");
//				Object total = rl.get("total");
//				Object enemy_win_rate = rl.get("enemy_win_rate");
//				Object tier = rl.get("tier");
//				if (enemy_win_rate != null && enemy_win_rate instanceof Double) {
//					double enemyWinRate = (Double) enemy_win_rate;
//					if (enemyWinRate != 0.0 && enemyWinRate != 100.0) {
//						HashMap<String, Object> champCounterList = new HashMap<>();
//						champCounterList.put("championName", championName);
//						champCounterList.put("champion_name_kr", champion_name_kr);
//						champCounterList.put("champ_win_cnt", champ_win_cnt);
//						champCounterList.put("champ_win_rate", champ_win_rate);
//						champCounterList.put("enemy_championName", enemy_championName);
//						champCounterList.put("enemy_championName_kr", enemy_championName_kr);
//						champCounterList.put("teamPosition", teamPosition1);
//						champCounterList.put("enemy_champ_win_cnt", enemyWinRate);
//						champCounterList.put("total", total);
//						champCounterList.put("enemy_win_rate", enemy_win_rate);
//						champCounterList.put("tier", tier);
//						champDao.saveChampCounterT(champCounterList);
//					}
////				
//				}
//			}
//
//		}
//
//	}
//
//	public List<HashMap<String, Object>> CounterchampList(ChampionRankDto rankDto) {
//
//		return champDao.CounterchampList(rankDto);
//
//	}



	public void champUpdate(ChampionRankDto rankDto) {

		List<HashMap<String, Object>> laneChampList = champDao.laneListInfo(rankDto);

		for (Map<String, Object> champ : laneChampList) {
			List<HashMap<String, Object>> cList = new ArrayList<>();
			champ.get("championid"); // 챔프아이디
			String champion_name_kr = (String) champ.get("champion_name_kr"); // 한국어이름
			String champion_name = (String) champ.get("champion_name"); // 영어이름

			String teamPosition = rankDto.getTeamPosition(); // 현재 라인
			int championId = (int) champ.get("championid");

			String tier = (String) rankDto.getTier();

			// cList : 각각의 챔피언 총 리스트
			cList = champDao.ranktierlistInfo(tier, teamPosition, championId);

//			log.info("========{}", cList);

			int allCnt = cList.size(); // 한챔피언의 총 길이

			int winCnt = 0;
			int pickCnt = 0;
			double win_rate = 0;
			double pick_rate = 0;
			double ban_rate = 0;
			for (Map<String, Object> a : cList) {
//				allCnt++;

				if ((int) a.get("win") == 1) {
					winCnt++;
				}

			}
			int allChampCnt = champDao.allChampTierCnt(tier, teamPosition);
			int banChampCnt = champDao.banChampTierCnt(tier, champion_name_kr);

			double aa = (double) winCnt;
			double bb = (double) allCnt;
			double cc = (double) banChampCnt;

			if (allCnt != 0) {
				win_rate = Math.round(((aa / allCnt) * 100) * 100) / 100.0;
				pick_rate = Math.round(((bb / allChampCnt) * 100) * 100) / 100.0;
				ban_rate = Math.round(((cc / allChampCnt) * 100) * 100) / 100.0;
			} else {
				win_rate = 0;
				pick_rate = 0;
				ban_rate = 0;
			}

			int win_total_cnt = winCnt;

			HashMap<String, Object> champTierRankTList = new HashMap<>();

			champTierRankTList.put("teamPosition", teamPosition);
			champTierRankTList.put("champion_name", champion_name);
			champTierRankTList.put("champion_name_kr", champion_name_kr);
			champTierRankTList.put("pick_rate", pick_rate);
			champTierRankTList.put("win_rate", win_rate);
			champTierRankTList.put("win_total_cnt", win_total_cnt);
			champTierRankTList.put("champion_pick", allCnt);
			champTierRankTList.put("ban_rate", ban_rate);
			champTierRankTList.put("tier", tier);

			champDao.saveChampTierRankT(champTierRankTList);
			log.info("============{}", champTierRankTList);
		}
//		log.info("====초보자페이지 업데이트 종료 : {}", rankDto.getTeamPosition());

	}

//	public List<HashMap<String, Object>> champTierRank(ChampionRankDto rankDto) {
//
//		return champDao.champTierRank(rankDto);
//	}

	public List<Map<String, Object>> forGraphInfo(String championName) {

		return champDao.forGraphInfo(championName);

	}

	public List<Map<String, Object>> forGraphInfo2(Map<String, String> aMap) {
		// TODO Auto-generated method stub
		return champDao.forGraphInfo2(aMap);
	}


}
