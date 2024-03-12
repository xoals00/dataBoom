package com.project.projectFinal.jghController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
@RequestMapping("/py")
public class PythonBuilder {
	@GetMapping("/main")
	public String test(Model model) {

		return "Ai/AiMain";

	}

	@PostMapping("/aicheck")
	public String main(String[] args, Model model, String cs, String ward) throws Exception {
		String filePath = "src/main/resources/static/py/test.py";
//		String filePath = "C:\\Users\\user\\Desktop\\test\\test.py";
		ProcessBuilder pb = new ProcessBuilder().command("python", filePath, cs, ward);
		Process p = pb.start();
		BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
		StringBuilder buffer = new StringBuilder();
		String line = null;
		while ((line = in.readLine()) != null) {
			buffer.append(line);
		}
		int exitCode = p.waitFor();
		System.out.println("Value is: " + buffer.toString());
//        System.out.println("Process exit value:"+exitCode);        
		in.close();
		ObjectMapper mapper = new ObjectMapper();
		Map<String, String> map = mapper.readValue(buffer.toString(), Map.class);

		model.addAttribute("check", map);
		return "Ai/AiResult";
	}

	@GetMapping(value = { "/puuid/{gameName}/{tagLine}" })
	public String puuid(@PathVariable(required = false) String gameName, @PathVariable(required = false) String tagLine,
			Model model) throws Exception {
		String filePath = "src/main/resources/static/py/request.py";
//		String filePath = "C:\\Users\\user\\Desktop\\test\\test.py";
		ProcessBuilder pb = new ProcessBuilder().command("python", filePath, gameName, tagLine);
		Process p = pb.start();
		BufferedReader in = new BufferedReader(new InputStreamReader(p.getInputStream()));
		StringBuilder buffer = new StringBuilder();
		String line = null;
		while ((line = in.readLine()) != null) {
			buffer.append(line);
		}
		int exitCode = p.waitFor();
		System.out.println("Value is: " + buffer.toString());
//        System.out.println("Process exit value:"+exitCode);        
		in.close();
		if (buffer.toString().length() != 0) {
			ObjectMapper mapper = new ObjectMapper();
			Map<String, String> map = mapper.readValue(buffer.toString(), Map.class);
			model.addAttribute("result", map.get("result"));
		}

//		model.addAttribute("result",  buffer.toString());
		return "Ai/Riotinfo";

	}
}
