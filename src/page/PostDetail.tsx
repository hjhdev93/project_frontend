import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadPost } from "../store/post/postSlice";

interface test {
  id: number;
  username: string;
  title: string;
  description: string;
  createdDate: string;
}

export default function PostDetail() {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const post = useAppSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(loadPost(state));
  }, [state]);

  console.log(post);

  return (
    <PostDetailContainer>
      {post[0] && (
        <>
          <PostInfo>작성자:{post[0].id}</PostInfo>
          <PostTitle>제목:{post[0].title}</PostTitle>
          <PostDescription>내용:{post[0].description}</PostDescription>
          {post[0].images &&
            post[0].images.map((l) => {
              return <PostImage src={l.fileUrl} />;
            })}
          {post[0].record && <PostRecord src={post[0].record.fileUrl} controls />}
        </>
      )}
    </PostDetailContainer>
  );
}

export const PostDetailContainer = styled.div``;

export const PostTitle = styled.div``;

export const PostDescription = styled.div``;

export const PostInfo = styled.div``;

export const PostImage = styled.img``;

export const PostRecord = styled.audio``;
