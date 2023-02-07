import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostList from "../component/PostList";

export default function Home() {
  const navigate = useNavigate();

  const toCreatePostPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/createpost");
  };

  return (
    <HomeContainer>
      <CreatePostBtn onClick={toCreatePostPage}>게시글 작성하기</CreatePostBtn>
      <PostList />
    </HomeContainer>
  );
}

export const HomeContainer = styled.div``;

export const CreatePostBtn = styled.button`
  width: 120px;
  border: 1px solid gray;
  border-radius: 4px;
  background-color: white;
`;
