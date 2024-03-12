package com.project.projectFinal.jhlController;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.projectFinal.service.ChampService;

import lombok.extern.slf4j.Slf4j;

//import com.project.projectFinal.service.JhlChampService;
@Controller
@Slf4j
public class JhlChampController {

	@Autowired
	ChampService champService;

	@GetMapping("/jhl")
	public String jhl(Model model) {
		
		List<HashMap<String, String>> champlist = champService.championList();
		model.addAttribute("champlist",champlist);
		return "jhl/jhl";
	}
	
	@PreAuthorize("hasAnyAuthority('ADMIN','CMP-MNG')")
	@GetMapping("/jhl/admin")
	public String jhlAdmin(Model model) {
		
		List<HashMap<String, String>> champlist = champService.championList();
		model.addAttribute("champlist",champlist);
		return "jhl/jhlAdmin";
	}
}
