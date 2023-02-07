import React, { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createPost } from "../store/post/postSlice";

export default function CreatePost() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user.users);
  const FILE_MAX_SIZE = 5 * 1024 * 1024; // 5MB;

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, SetImage] = useState<FileList | null>(null);
  const [record, SetRecord] = useState<File>();

  //  게시글 제목 입력
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  //  게시글 내용 입력
  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  //  이미지 업로드
  const handleImageFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files);

    //  이미지 최대 업로드 개수 3개 제한
    if (files && files.length > 3) {
      e.target.value = "";
      alert("최대 3개의 이미지만 업로드 할 수 있습니다.");
      return;
    }

    //  이미지 1개당 5MB용량 체크
    if (files) {
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > FILE_MAX_SIZE) {
          e.target.value = "";
          alert("한 사진당 업로드 가능한 최대 용량은 5MB 입니다.");
          return;
        }
      }
    }

    SetImage(files);
  };

  //  음성파일 업로드
  const handleRecordFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files[0].size > FILE_MAX_SIZE) {
      e.target.value = "";
      alert("한 파일당 업로드 가능한 최대 용량은 5MB 입니다.");
      return;
    }

    if (files) {
      SetRecord(files[0]);
    }
  };

  //  게시글 작성 완료
  const completeCreatePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(image);
    console.log(record);

    dispatch(createPost({ id: user[0].id, post: { title: title, description: description }, image, record }));
    navigate("/");
  };

  return (
    <CreatePostContainer>
      사진 첨부
      <PostImageInput type="file" accept="image/*" onChange={handleImageFileChange} multiple />
      음성 파일 첨부
      <PostRecordInput type="file" accept="audio/*" onChange={handleRecordFileChange} />
      제목 입력란
      <TitleInputBox onChange={handleTitle} />
      게시글 입력란
      <DescriptionInputBox value={description} onChange={handleDescription} />
      <CompleteBtn onClick={completeCreatePost}>완료</CompleteBtn>
    </CreatePostContainer>
  );
}

export const CreatePostContainer = styled.div`
  display: flex;
`;

export const TitleInputBox = styled.input``;

export const DescriptionInputBox = styled.textarea``;

export const CompleteBtn = styled.button``;

export const PostImageInput = styled.input``;

export const PostRecordInput = styled.input``;
