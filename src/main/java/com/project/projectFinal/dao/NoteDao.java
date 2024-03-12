package com.project.projectFinal.dao;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;

import com.project.projectFinal.dto.MemberDto;
import com.project.projectFinal.dto.NoteDto;

@Mapper
public interface NoteDao {

	ArrayList<NoteDto> NoteInfo(MemberDto memberDto);

	int sendNote(NoteDto noteDto);

	void DeleteNote(int num);

	ArrayList<NoteDto> selectNoteById(String sendId);

	int mailsend(NoteDto noteDto);

	int findId(NoteDto noteDto);

	ArrayList<NoteDto> inqMain(String userId);

	ArrayList<NoteDto> adminInq(MemberDto memberDto);

	int sendToallMembers(MemberDto memberDto, NoteDto noteDto);

	int inqAnswer(NoteDto noteDto);

	NoteDto inqDetailView(NoteDto noteDto);

	ArrayList<NoteDto> eventMessage(String userId);


//	int findMsg(NoteDto noteDto);

}
