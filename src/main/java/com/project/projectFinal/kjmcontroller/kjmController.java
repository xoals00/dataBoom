package com.project.projectFinal.kjmcontroller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.project.projectFinal.service.KjmItemService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller

public class kjmController {
	@Autowired
	KjmItemService kjmItemService;
	
	@GetMapping("/kjm")
	public String kjm(){
		return "kjm/kjm";
	}
	
	@GetMapping("/kjm1")
	public String iteminfo(Model model){
		model.addAttribute("itemlist",kjmItemService.iteminfo());
		return "kjm/kjm1";
	}
	
	@GetMapping("/kjm2")
	public String kjm2(){
		return "kjm/kjm2";
	}
	
	
	@GetMapping("/kjm4")
	public String kjm4(){
		return "kjm/kjm4";
	}
	
	@GetMapping("/kjm5")
	public String kjm5(){
		return "kjm/kjm5";
	}
	
//	@PostMapping("/")
	
}
