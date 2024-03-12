package com.project.projectFinal.dao;

import java.util.ArrayList;
import java.util.HashMap;

import org.apache.ibatis.annotations.Mapper;

import com.project.projectFinal.dto.DuoMsgDto;
import com.project.projectFinal.dto.DuoSearchDto;

@Mapper
public interface DuoDao {
	ArrayList<HashMap<String, DuoSearchDto>> duoInfo();

	ArrayList<HashMap<String, DuoMsgDto>> chattRoomInfo(String userId);

	DuoSearchDto infoDuoT(DuoSearchDto duoSearchDto);

	DuoMsgDto myRoomCheck(DuoMsgDto duoChattRoomDto);

	ArrayList<HashMap<String, DuoMsgDto>> msgAll(DuoMsgDto msgDto);

	void deleteChattRoom(DuoMsgDto duoChattRoomDto);

	DuoSearchDto nowlogin(DuoSearchDto duoSearchDto);

	int delete(DuoSearchDto duoSearchDto);

}
