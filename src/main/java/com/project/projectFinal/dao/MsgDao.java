package com.project.projectFinal.dao;

import org.apache.ibatis.annotations.Mapper;

import com.project.projectFinal.dto.DuoMsgDto;
import com.project.projectFinal.dto.DuoSearchDto;

@Mapper
public interface MsgDao {

	int insertMsg(DuoMsgDto msgDto);

	DuoSearchDto roomUpdate(DuoSearchDto duoSearchDto);

	DuoMsgDto connectRoom(DuoMsgDto duoChattRoomDto);

	DuoMsgDto chattInfo(DuoMsgDto mDto);

	DuoSearchDto duoInfo(DuoSearchDto mDto);

	void duoCreateMsgRoom(DuoMsgDto mDto);

	
}
