import React from "react";
import styled from "styled-components";
import naverLoginBtnImg from "../img/naverLoginBtn.png";
import kakaoLoginBtnImg from "../img/kakaoLoginBtn.png";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <LoginContainer>
      <LoginBtnContainer>
        {/* 네이버 로그인 페이지로 이동 */}
        <NaverLoginBtn to={`${process.env.REACT_APP_NAVER_AUTH_URL}`}>
          <NaverLoginBtnImg src={naverLoginBtnImg} />
        </NaverLoginBtn>
        {/*  카카오 로그인 페이지로 이동 */}
        <KakaoLoginBtn to={`${process.env.REACT_APP_KAKAO_AUTH_URL}`}>
          <KakaoLoginBtnImg src={kakaoLoginBtnImg} />
        </KakaoLoginBtn>
      </LoginBtnContainer>
    </LoginContainer>
  );
}

export const LoginContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

export const LoginBtnContainer = styled.div`
  width: 600px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;

export const NaverLoginBtn = styled(Link)`
  width: 240px;
  height: 100px;
  border: none;
  background-color: white;
`;

export const NaverLoginBtnImg = styled.img`
  width: 100%;
  height: 100%;
`;

export const KakaoLoginBtn = styled(Link)`
  width: 240px;
  height: 100px;
  border: none;
  background-color: white;
`;

export const KakaoLoginBtnImg = styled.img`
  width: 100%;
  height: 100%;
`;
