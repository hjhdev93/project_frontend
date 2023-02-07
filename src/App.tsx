import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Login from "./page/Login";
import CreatePost from "./page/CreatePost";
import UpdatePost from "./page/UpdatePost";
import NaverLoginRedirectHandler from "./util/NaverLoginRedirectHandler";
import KakaoLoginRedirectHandler from "./util/KakaoLoginRedirectHandler";
import Header from "./component/Header";
import PostDetail from "./page/PostDetail";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/updatepost" element={<UpdatePost />} />
        <Route path="/post" element={<PostDetail />} />
        <Route path="/auth/naver/callback" element={<NaverLoginRedirectHandler />} />
        <Route path="/auth/kakao/callback" element={<KakaoLoginRedirectHandler />} />
      </Routes>
    </div>
  );
}

export default App;
