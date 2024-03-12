package com.project.projectFinal.config;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class CTXProvider implements ApplicationContextAware {
	// 웹소켓의 내용을 db로 끌고 갈수 있게 주입 가능하게 해주는 클래스
	public static ApplicationContext ctx;

	@Override
	public void setApplicationContext(ApplicationContext applicationContext)
			throws BeansException {
		this.ctx = applicationContext;
	}
}