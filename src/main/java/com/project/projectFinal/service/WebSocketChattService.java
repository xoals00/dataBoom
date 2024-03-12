package com.project.projectFinal.service;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.json.simple.JSONObject;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.projectFinal.config.CTXProvider;
import com.project.projectFinal.config.WebSocketConfig;
import com.project.projectFinal.dto.DuoMsgDto;
import com.project.projectFinal.dto.DuoSearchDto;

import jakarta.servlet.http.HttpSession;
import jakarta.websocket.EndpointConfig;
import jakarta.websocket.OnClose;
import jakarta.websocket.OnMessage;
import jakarta.websocket.OnOpen;
import jakarta.websocket.Session;
import jakarta.websocket.server.ServerEndpoint;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@ServerEndpoint(value = "/jgh", configurator = WebSocketConfig.class)
@Controller
@NoArgsConstructor
public class WebSocketChattService {

	private ChatService cServ = CTXProvider.ctx.getBean(ChatService.class);

	private HttpSession hSession;
	// 웹소켓 세션을 저장 : 웹소켓 전용
	private static Set<Session> clients = Collections.synchronizedSet(new HashSet<Session>());
	// 해당 세션에 로그인한 유저아이디를 맵으로 저장.
	private static Map<Session, String> users = Collections.synchronizedMap(new HashMap<Session, String>());

	@OnMessage // 메세지 수신시
	public void onMessage(String msg, Session session) throws Exception {

		// msg >> hashmap으로 변환시켜주는 구문
		ObjectMapper mapper = new ObjectMapper();
		HashMap<String, String> map = new HashMap<String, String>();
		DuoMsgDto msgDto = new DuoMsgDto();
		map = mapper.readValue(msg, new TypeReference<HashMap<String, String>>() {
		});
		String msg1 = msg;
		// db에 저장할 구문
//		cServ.moveService(map);

		log.info("======work : {}", map.get("work"));

		// 메세지 보내기 //
		if (map.get("work").equals("sendMsg")) {
			cServ.insertMsg(map);

			DuoMsgDto mDto = cServ.chattInfo(map);
			users.forEach((key, value) -> {
				if (value.equals(mDto.getGuestId()) || value.equals(mDto.getHostId())) {
					try {
						log.info("==={}", mDto);
						key.getBasicRemote().sendText(msg1);
					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			});

		} else if (map.get("work").equals("createQuestion")) {// 승낙문구보내기
			String rCnt = map.get("rCnt");
			DuoSearchDto mDto = cServ.duoInfo(rCnt);

			String userId = map.get("userId");

			

			users.forEach((key, value) -> {

				if (value.equals(mDto.getUserId())) {
					try {
						JSONObject jsonObject = new JSONObject();
						jsonObject.put("rCnt", mDto.getRCnt());
						jsonObject.put("userId", mDto.getUserId());
						jsonObject.put("guestId", userId);
						jsonObject.put("work", "createQuestion");
						String msg2 = jsonObject.toString();
						key.getBasicRemote().sendText(msg2);

					} catch (IOException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				}
			});
		} else if (map.get("work").equals("connectRoom")) {// 서로 방띄우기
			DuoMsgDto mDto = cServ.duoCreateMsgRoom(map);

			log.info("connectroom통과");
			users.forEach((key, value) -> {

				if (value.equals(mDto.getGuestId()) || value.equals(mDto.getHostId())) {
					try {
						JSONObject jsonObject = new JSONObject();
						jsonObject.put("rCnt", mDto.getRCnt());
						jsonObject.put("hostId", mDto.getHostId());
						jsonObject.put("guestId", mDto.getGuestId());
						jsonObject.put("work", "connectRoom");
						String msg2 = jsonObject.toString();
						key.getBasicRemote().sendText(msg2);

					} catch (IOException e) {

						e.printStackTrace();
					}
				} else {
					JSONObject jsonObject = new JSONObject();
					jsonObject.put("rCnt", mDto.getRCnt());
					jsonObject.put("work", "allRejeck");
					String msg2 = jsonObject.toString();
					try {
						key.getBasicRemote().sendText(msg2);
					} catch (IOException e) {

						e.printStackTrace();
					}

				}
			});
		} else if (map.get("work").equals("roomUpdate")) {// 방만들기
			cServ.roomUpdate(map);

			log.info("roomUpdate통과");
			users.forEach((key, value) -> {

				try {
					key.getBasicRemote().sendText(msg1);

				} catch (IOException e) {

					e.printStackTrace();
				}

			});
		} else if (map.get("work").equals("reject")) {// 방만들기
			String guestId = map.get("guestId");
			users.forEach((key, value) -> {
				if (guestId.equals(value)) {
					try {
						JSONObject jsonObject = new JSONObject();
						jsonObject.put("work", "reject");
						String msg2 = jsonObject.toString();
						key.getBasicRemote().sendText(msg2);

					} catch (IOException e) {

						e.printStackTrace();
					}
				}

			});
		} else {// 전체메세지
			log.info("방만들기");
			for (Session s : clients) {
				s.getBasicRemote().sendText(msg1);
			}

		}

	}

	@OnOpen // 클라이언트 접속시
	public void onOpen(Session s, EndpointConfig config) {

		this.hSession = (HttpSession) config.getUserProperties().get("hSession");

		String userId = (String) this.hSession.getAttribute("userId");

		if (!clients.contains(s)) {
			clients.add(s);
			users.put(s, userId);
			log.info("웹소켓 사용 시작 아이디 : " + userId);
			log.info("session open : " + s);
		} else {
			log.info("이미 연결된 session!");
		}
	}

	@OnClose // 클라이언트 접속해제
	public void onClose(Session s) {

		log.info("웹소켓 사용종료 아이디 : " + users.get(s));
		log.info("session close : " + s);
		clients.remove(s);
		users.remove(s);
	}

}