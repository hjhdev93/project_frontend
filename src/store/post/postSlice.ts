import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  id: number;
  username: string;
  title: string;
  description: string;
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
}

interface UpdatePostInfo {
  id: number;
  post: Post;
}

export const loadPost = createAsyncThunk("posts/loadPost", async (id: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/post/load/onepost/${id}`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

export const loadPostList = createAsyncThunk("posts/loadPostList", async (page: number) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_URL}/load/postlist/${page}`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});

export const createPost = createAsyncThunk("posts/createPost", async (createPostInfo: CreatePostInfo) => {
  console.log(createPostInfo);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_URL}/post/create/post/${createPostInfo.id}`,
      createPostInfo.post
    );
    console.log(response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});
export const updatePost = createAsyncThunk("posts/updatePost", async (updatePostInfo: UpdatePostInfo) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_URL}/updatepost/${updatePostInfo.id}`);
    console.log(response);
    return response.data;
  } catch (err: any) {
    return err.message;
  }
});
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
      state.posts = action.payload;
      state.status = "fullfiled";
    });
    builder.addCase(loadPostList.fulfilled, (state, action) => {});
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
