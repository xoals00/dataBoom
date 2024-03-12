package com.project.projectFinal.controller;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.project.projectFinal.customEx.CustomException;
import com.project.projectFinal.customEx.JangShopException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@ControllerAdvice
public class DbErrorController {

	@ExceptionHandler(CustomException.class)
	public String error(RedirectAttributes redirectAttributes, Exception ex) {

		redirectAttributes.addFlashAttribute("error", ex.getMessage());

		return "redirect:/";
	}

	@ExceptionHandler(JangShopException.class)
	public String shopError( Exception ex) {
                    
		return ex.getMessage();
	}
	
}
