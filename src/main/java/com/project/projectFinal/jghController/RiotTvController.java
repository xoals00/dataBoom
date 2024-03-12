package com.project.projectFinal.jghController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/riotTv")
public class RiotTvController {

	
	@GetMapping(value = "/main")
	public String main() {

		return "jgh/riotTv";
	}

}
