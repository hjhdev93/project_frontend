import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadPostList } from "../store/post/postSlice";
import PageNation from "./PageNation";

export default function PostList() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [postPage, SetPostPage] = useState<number>(1);
  const postList = useAppSelector((state) => state.post.posts);

  useEffect(() => {
    dispatch(loadPostList(postPage));
  }, []);

  const loadPostByPage = (page: number) => {
    SetPostPage(page);
  };

  const postDetail = (id: number) => {
    navigate("/post", { state: id });
  };

  return (
    <PostListContainer>
      {postList &&
        postList.map((l) => {
          return (
            <PostContainer>
              <PostTitle onClick={() => postDetail(l.id)}>제목:{l.title}</PostTitle>
              <PostCreateUsername>작성자:{l.username}</PostCreateUsername>
              <PostCreatedDate>{l.createdDate}</PostCreatedDate>
            </PostContainer>
          );
        })}

      <PageNation loadPostByPage={loadPostByPage} />
    </PostListContainer>
  );
}

export const PostListContainer = styled.div``;

export const PostContainer = styled.div`
  display: flex;
`;

export const PostTitle = styled.div``;

export const PostCreateUsername = styled.div``;

export const PostCreatedDate = styled.div``;
