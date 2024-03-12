package com.project.projectFinal.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.projectFinal.dto.ChampionImageDto;
import com.project.projectFinal.dto.ChampionRankDto;

@Mapper
public interface ChampDao {
	public List<HashMap<String, String>> championList();

	public List<HashMap<String, String>> champSearch(ChampionImageDto champDto);

	public List<HashMap<String, String>> champLineSelect(ChampionImageDto champDto);

	public List<HashMap<String, String>> champListAll();

	public List<HashMap<String, Object>> laneListInfo(ChampionRankDto rankDto);
	
	public List<HashMap<String, Object>> ranktierlistInfo(String tier,String teamPosition, int championId);

	public int allChampTierCnt(String tier, String teamPosition);

	public int banChampTierCnt(String tier, String champion_name_kr);

	public void saveChampTierRankT(HashMap<String, Object> champTierRankTList);


	public List<HashMap<String, Object>> champRank(ChampionRankDto rankDto);

	public List<Map<String, Object>> forGraphInfo(String championName);

	public List<Map<String, Object>> forGraphInfo2(Map<String, String> aMap);

	


	public void saveChampCounterT(HashMap<String, Object> champCounterList);

	public List<HashMap<String, Object>> CounterchampList(ChampionRankDto rankDto);
	
	public List<HashMap<String, Object>> laneCounterListInfo(ChampionRankDto rankDto);

	public List<HashMap<String, Object>> rankListInfo(String teamPosition, int championId);

;

}
