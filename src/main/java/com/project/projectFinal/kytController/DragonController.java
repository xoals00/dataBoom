package com.project.projectFinal.kytController;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class DragonController {

	@GetMapping("/kyt")
	public String dragon() {

		return "kyt/kyt";
	}

}
