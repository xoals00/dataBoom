package com.project.projectFinal.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.project.projectFinal.dto.RiotApiDto;

@Mapper
public interface WebDao {

	void dbSaveInfoRiotTv(Map<String, Object> i);

	ArrayList<String> dbFindData(RiotApiDto riotApiDto);

	List<Map<String, Object>> dbFindData1(String matchId);

	int matchListVsDb(String matchId);

	ArrayList<String> matchIdRecent(RiotApiDto riotApiDto);



	List<Map<String, Object>> newDataInfo(RiotApiDto riotApiDto);

	List<Map<String, Object>> forGraphInfo(RiotApiDto riotApiDto);

}
