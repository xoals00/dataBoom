package com.project.projectFinal.jghController;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.projectFinal.dto.DuoMsgDto;
import com.project.projectFinal.dto.DuoSearchDto;
import com.project.projectFinal.service.DuoService;

import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/jgh")
public class RestDuoController {

	@Autowired
	DuoService duoService;

	@PostMapping("/duostartinfo")
	public ArrayList<HashMap<String, DuoSearchDto>> duostartinfo() {

		return duoService.duostartinfo();
	}

	@PostMapping("/chattRoomInfo")
	public ArrayList<HashMap<String, DuoMsgDto>> chattRoomInfo(DuoMsgDto duoMsgDto, HttpSession session) {
		String userId = (String) session.getAttribute("userId");

//		log.info("=={}",cDto);
		return duoService.chattRoomInfo(userId);
	}

	@PostMapping("/duoInfo")
	public DuoSearchDto duoInfo(DuoSearchDto duoSearchDto) {

		return duoService.duoInfo(duoSearchDto);

	}

	@PostMapping("/myRoomCheck")
	public DuoMsgDto myRoomCheck(DuoMsgDto duoChattRoomDto) {

		return duoService.myRoomCheck(duoChattRoomDto);
	}

	@PostMapping("/msgAll")
	public ArrayList<HashMap<String, DuoMsgDto>> msgAll(DuoMsgDto msgDto) {

		return duoService.msgAll(msgDto);

	}

	@PostMapping("/goOutRoom")
	public void goOutRoom(DuoMsgDto duoMsgDto, HttpSession session) {
		String userId = (String) session.getAttribute("userId");

		duoMsgDto.setUserId(userId);
		duoService.goOutRoom(duoMsgDto);
	}

	@PostMapping("/delete")
	public int delete(DuoSearchDto duoSearchDto, HttpSession session) {
		String userId = (String) session.getAttribute("userId");
		duoSearchDto.setUserId(userId);
		return duoService.delete(duoSearchDto);

	}

}
