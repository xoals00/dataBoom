package com.project.projectFinal.service;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.projectFinal.dto.DuoMsgDto;
import com.project.projectFinal.dto.DuoSearchDto;
import com.project.projectFinal.jghController.ChattRepository;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ChatService {

	@Autowired
	ChattRepository chattRepository;

	// 서비스를 여기서 실행
	// 메세지 저장문구

	public void insertMsg(HashMap<String, String> map) {
		DuoMsgDto mDto = new DuoMsgDto();

		mDto.setRCnt(map.get("rCnt"));
		mDto.setUserId(map.get("userId"));
		mDto.setMsg(map.get("msg"));
		mDto.setDate(map.get("date"));

		chattRepository.insertMsg(mDto);

	}

	public DuoSearchDto duoInfo(String rCnt) {
		DuoSearchDto mDto = new DuoSearchDto();

		mDto.setRCnt(Integer.valueOf(rCnt));
		return chattRepository.duoInfo(mDto);
	}

	public DuoMsgDto duoCreateMsgRoom(HashMap<String, String> map) {

		DuoMsgDto mDto = new DuoMsgDto();
		mDto.setRCnt(map.get("rCnt"));
		mDto.setGuestId(map.get("guestId"));
		mDto.setHostId(map.get("hostId"));
		log.info("=={}", mDto);

		return chattRepository.duoCreateMsgRoom(mDto);
	}

	public DuoSearchDto roomUpdate(HashMap<String, String> map) {
		DuoSearchDto mDto = new DuoSearchDto();
		mDto.setUserId(map.get("userId"));
		mDto.setMyPosition(map.get("myPosition"));
		mDto.setTier(map.get("tier"));
		mDto.setDuoPosition(map.get("duoPosition"));
		mDto.setGameType(map.get("gameType"));
		mDto.setMemo(map.get("memo"));

		return chattRepository.roomUpdate(mDto);
	}

	public DuoMsgDto chattInfo(HashMap<String, String> map) {
		DuoMsgDto mDto = new DuoMsgDto();
		mDto.setRCnt(map.get("rCnt"));
		
		
		return chattRepository.chattInfo(mDto);
	}

}
