package com.project.projectFinal.service;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.projectFinal.customEx.CustomException;
import com.project.projectFinal.dao.DuoDao;
import com.project.projectFinal.dto.DuoMsgDto;
import com.project.projectFinal.dto.DuoSearchDto;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class DuoService {

	@Autowired
	DuoDao duoDao;

	public ArrayList<HashMap<String, DuoSearchDto>> duostartinfo() {

		return duoDao.duoInfo();

	}
	public ArrayList<HashMap<String, DuoMsgDto>> chattRoomInfo(String userId) {

		return duoDao.chattRoomInfo(userId);
	}
	
	public DuoSearchDto duoInfo(DuoSearchDto duoSearchDto) {
		// TODO Auto-generated method stub
		return duoDao.infoDuoT(duoSearchDto);
	}

	public DuoMsgDto myRoomCheck(DuoMsgDto duoChattRoomDto) {
		DuoMsgDto dDto = duoDao.myRoomCheck(duoChattRoomDto); // 방생성이 되었는지 확인

		return dDto;
	}
	public ArrayList<HashMap<String, DuoMsgDto>> msgAll(DuoMsgDto msgDto) {

		return duoDao.msgAll(msgDto);
	}
	
	public void goOutRoom(DuoMsgDto duoMsgDto) {

		DuoMsgDto dDtoResult = duoDao.myRoomCheck(duoMsgDto);
		// 방에서 나오고 둘다 없는게 확인되면 방자체를 삭제시키기
		if (dDtoResult.getGuestId().equals("") && dDtoResult.getHostId().equals("")) {

			duoDao.deleteChattRoom(duoMsgDto);

		}

	}
	@Transactional
	public DuoSearchDto nowlogin(DuoSearchDto duoSearchDto) {

		DuoSearchDto result = duoDao.nowlogin(duoSearchDto); // 로그인 했는지 확인

		return result;
	}
	public int delete(DuoSearchDto duoSearchDto) {
		
		return duoDao.delete(duoSearchDto);

	}

}
