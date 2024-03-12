package com.project.projectFinal.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.projectFinal.dto.MemberDto;
import com.project.projectFinal.dto.KakaoDto;

@Mapper
public interface MemberDao {

	MemberDto login(MemberDto memberDto);

	int join(MemberDto memberDto);

	int find(MemberDto memberDto);

	int payDbSave(KakaoDto paymentDto);

	MemberDto main(MemberDto memberDto);

	int updatePoint(KakaoDto paymentDto);

	int ajaxtest(MemberDto memberDto);

	MemberDto joinIdCheck(MemberDto memberDto);

	void loginNow(MemberDto mDto);

	void logoutNow(String userId);

	String checkAdmin(String userId);

	ArrayList<HashMap<String, MemberDto>> memberTable();

	MemberDto addRoulette(MemberDto memberDto);

	MemberDto rouletteInfo(MemberDto memberDto);

	MemberDto minusRoulette(MemberDto memberDto);

	MemberDto findId(MemberDto memberDto);

	boolean findPw(MemberDto memberDto);

	int changePw(MemberDto memberDto);

	MemberDto myInfo(MemberDto memberDto);

	ArrayList<MemberDto> memberload(MemberDto memberDto);

//	String InfoChange(MemberDto memberDto);

	int changeInfo(MemberDto memberDto);

	int changePw2(MemberDto mDto);

	int emailcheck(MemberDto memberDto);

	ArrayList<HashMap<String, Object>> paymentTable();

	


}
