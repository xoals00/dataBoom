package com.project.projectFinal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.projectFinal.dto.MemberDto;
import com.project.projectFinal.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/member")

public class MemberController {

	@Autowired
	MemberService memberService;

	@GetMapping("/login")
	public String login(HttpServletRequest req) {

		return "aMain/loginFrm";
	}

	@GetMapping("/join")
	public String join() {

		return "aMain/joinFrm";
	}

	@GetMapping("/passwordcheck")
	public String pchk() {
		
		return "aMain/passwordChk";
	}
	@GetMapping("/ChangeInfo")
	public String ChangeInfo() {
		
		return "aMain/ChangeInfo";
	}
	@PreAuthorize("hasAnyAuthority('USER')")
	@GetMapping("/MyChangePw")
	public String MyChangePw() {
	
		return "aMain/changePw";
	}
	
	@GetMapping("/mypage")
	public String mypage(Model model, HttpSession session, MemberDto memberDto) {
		String userId = (String) session.getAttribute("userId");
		memberDto.setUserId(userId);
		MemberDto mlist = memberService.myInfo(memberDto);
		model.addAttribute("mlist", mlist);
		return "aMain/myPage";
	}
	
	
	

	@PostMapping("/join")
	public String join(MemberDto memberDto) {
		log.info("=={}", memberDto);
		if (memberService.join(memberDto)) {

			return "redirect:/member/login";
		} else {

			return "redirect:/member/join";
		}

	}

	@GetMapping("/findIdT")
	public String fId() {
		return "aMain/findIdT";
	}
	
	@GetMapping("/findPw")
	public String fPw() {
		return "aMain/findPw";
	}
	
	@PostMapping("/findPw")
	public String findPw (MemberDto memberDto, HttpSession session) {
//		@RequestParam String userId,
//		memberDto.setUserId(userId);
		
		boolean findPw = memberService.findPw(memberDto);
		if(findPw) {
			session.setAttribute("userId", memberDto.getUserId());
			return "aMain/changePw";
		}else {
			return "aMain/findPw";
		}
	}
	
	@PostMapping("/changePw2")
	public String changePw2(MemberDto memberDto) {
//		log.info("==========={}",memberDto);	
		int result = memberService.changePw2(memberDto);
		if(result ==1) {
			return "redirect:/member/login";
		}else {
			return "redirect:/member/changePw";
		}
		
		
	}
	
	

	
//	@PostMapping("/ChangeInfo")
//	public String InfoChange(MemberDto memberDto, Model model) {
//		
//		boolean InfoChange = memberService.InfoChange(memberDto);
//		log.info("==========컨{}",memberDto);
//		if(InfoChange) {
////			String userId = (String) session.getAttribute("userId");
////			memberDto.setUserId(userId);
//			MemberDto mlist = memberService.myInfo(memberDto);
//			model.addAttribute("mlist", mlist);
//		return "aMain/ChangeInfo";
//		
//		}
//		else {
//			return "redirect:/member/passwordcheck";
//		}
//	}
//	
//	
}
