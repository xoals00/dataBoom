package com.project.projectFinal.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.projectFinal.dao.ChampionDao;
import com.project.projectFinal.dto.ChampionImageDto;
import com.project.projectFinal.dto.ChampionRankDto;
import com.project.projectFinal.dto.GraphDto;


@Service
public class ChampionService {

	@Autowired
	ChampionDao cd;

	public List<HashMap<String,String>> champList() {
		
		return cd.champList();
	
	}

	public List<HashMap<String, String>> searchChamp(ChampionImageDto cDto) {
		
		return cd.searchChamp(cDto);
		
	}


	public List<HashMap<String, String>> champLine(ChampionImageDto cDto) {

		if(cDto.getLine().equals("all")) {
			return cd.allChampLine(cDto);
		} else{
			return cd.champLine(cDto);
		}
		
	}


	public List<HashMap<String, String>> reChampList() {
		
		return cd.reChampList();
		
	}

	public List<HashMap<String, ChampionRankDto>> champRankTOP() {
		
		return cd.champRankTOP();
	}

	public List<HashMap<String, ChampionRankDto>> champRankJUG() {

		return cd.champRankJUG();
	}
	
	public List<HashMap<String, ChampionRankDto>> champRankMID() {
		
		return cd.champRankMID();
	}
	
	public List<HashMap<String, ChampionRankDto>> champRankADC() {
		
		return cd.champRankADC();
	}
	
	public List<HashMap<String, ChampionRankDto>> champRankSUP() {
		
		return cd.champRankSUP();
	}

	public String getKRname(ChampionImageDto ciDto) {
		
		return cd.getKRname(ciDto);
	}

	
}
