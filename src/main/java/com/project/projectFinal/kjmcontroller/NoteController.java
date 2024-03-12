package com.project.projectFinal.kjmcontroller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.projectFinal.dto.MemberDto;
import com.project.projectFinal.dto.NoteDto;
import com.project.projectFinal.service.NoteService;

import jakarta.servlet.http.HttpSession;
import kotlin.OverloadResolutionByLambdaReturnType;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@PreAuthorize("hasAnyAuthority('ADMIN','INQ-MNG')")
public class NoteController {
	@Autowired
	NoteService noteService;

	@PreAuthorize("hasAnyAuthority('ADMIN','INQ-MNG')")
	@GetMapping("/admin/inq")
	public String NoteAdmin(HttpSession session, Model model ,MemberDto memberDto) {
		String userId = (String) session.getAttribute("userId");
		memberDto.setUserId(userId);
		ArrayList<NoteDto> inqlist= noteService.adminInq(memberDto);
		model.addAttribute("inqlist", inqlist);

		return "admin/inq";
	}
	@PreAuthorize("hasAnyAuthority('ADMIN','INQ-MNG')")
	@GetMapping("/admin/allSendMessage")
	public String getallSendMessage() {

		return "admin/allSendMessage";
	}
	
	//url수정하라고 하기 ex) /note/send
	@PostMapping("/send")
	public String sendNote(NoteDto noteDto,HttpSession session,MemberDto memberDto) {
		String userId = (String) session.getAttribute("userId");
		memberDto.setUserId(userId);
		noteService.sendNote(noteDto);
		return "redirect:/Note";
	}
	
	@GetMapping("/delete")
	public String DeleteNote(@RequestParam("n_num")int num) {
			noteService.DeleteNote(num);
			return "redirect:/Note";
		
	}
	

}
