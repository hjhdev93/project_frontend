import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createPost } from "../store/post/postSlice";

export default function CreatePost() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.users);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const completeCreatePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(user[0]);
    dispatch(createPost({ id: user[0].id, post: { title: title, description: description } }));
    navigate("/");
  };

  return (
    <CreatePostContainer>
      제목 입력란
      <TitleInputBox onChange={handleTitle} />
      게시글 입력란
      <DescriptionInputBox value={description} onChange={handleDescription} />
      <CompleteBtn onClick={completeCreatePost}>완료</CompleteBtn>
    </CreatePostContainer>
  );
}

export const CreatePostContainer = styled.div``;

export const TitleInputBox = styled.input``;

export const DescriptionInputBox = styled.textarea``;

export const CompleteBtn = styled.button``;
