import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Post {
  id: number;
  username: string;
  title: string;
  description: string;
  createdDate: string;
  images: Array<FileInfo>;
  record: FileInfo;
}

interface FileInfo {
  id: number;
  fileName: string;
  fileUrl: string;
  key: string;
}

interface PostSliceState {
  posts: Post[];
  status: "fullfiled" | "pending" | "failed";
}

const initialState: PostSliceState = {
  posts: [],
  status: "pending",
};

interface CreatePostInfo {
  id: number;
  post: {
    title: string;
    description: string;
  };
  image?: FileList | null;
  record?: File;
}

interface UpdatePostInfo {
  id: number;
  post: Post;
}

//  게시글 1개 가져오기
export const loadPost = createAsyncThunk("posts/loadPost", async (id: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/post/load/onepost/${id}`);
    console.log(response.data);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

//  게시글 10개씩 가져오기
export const loadPostList = createAsyncThunk("posts/loadPostList", async (page: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/post/load/postlist/${page}`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

//  게시글 작성
export const createPost = createAsyncThunk("posts/createPost", async (createPostInfo: CreatePostInfo) => {
  console.log(createPostInfo);
  const formData = new FormData();

  formData.append("title", JSON.stringify(createPostInfo.post.title));
  formData.append("description", JSON.stringify(createPostInfo.post.description));

  if (createPostInfo.image) {
    for (let i = 0; i < createPostInfo.image.length; i++) {
      formData.append("image", createPostInfo.image[i]);
    }
  }
  if (createPostInfo.record) formData.append("record", createPostInfo.record);

  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/post/create/post/${createPostInfo.id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

//  게시글 수정
export const updatePost = createAsyncThunk("posts/updatePost", async (updatePostInfo: UpdatePostInfo) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/updatepost/${updatePostInfo.id}`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

//  게시글 삭제
export const deletePost = createAsyncThunk("posts/deletePost", async (id: number) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/delete/post/${id}`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadPost.fulfilled, (state, action) => {
      state.posts = [action.payload];
      state.status = "fullfiled";
    });
    builder.addCase(loadPostList.fulfilled, (state, action) => {
      state.posts = [];
      const postList = [...state.posts, ...action.payload];
      state.posts = postList;
      state.status = "fullfiled";
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      const postList = [...state.posts, action.payload];
      state.posts = postList;
      state.status = "fullfiled";
    });
    builder.addCase(updatePost.fulfilled, (state, action) => {
      const postList = state.posts.filter((post: Post) => post.id !== action.payload.id);
      const updatedPostList = [...postList, action.payload.post];
      state.posts = updatedPostList;
      state.status = "fullfiled";
    });
    builder.addCase(deletePost.fulfilled, (state, action) => {
      const postList = state.posts.filter((post: Post) => post.id !== action.payload.id);
      state.posts = postList;
      state.status = "fullfiled";
    });
  },
});

export default postSlice;
