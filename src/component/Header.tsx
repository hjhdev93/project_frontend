import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { deleteUser, logout } from "../store/user/userSlice";

export default function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user.users);

  //  홈페이지로 이동
  const homePage = () => {
    navigate("/");
  };

  //  로그인 페이지로 이동
  const loginPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    navigate("/login");
  };

  //  로그아웃 요청
  const userLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = user[0].id;
    const loginType = user[0].loginType;
    dispatch(logout({ id, loginType }));
  };

  //  회원탈퇴 요청
  const deleteUserInfo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = user[0].id;
    const loginType = user[0].loginType;
    dispatch(deleteUser({ id, loginType }));
  };

  return (
    <HeaderContainer>
      <HomeBtn onClick={homePage}>홈으로</HomeBtn>
      {/* 로그인된 상태면 로그아웃 버튼 노출, 로그인 안된 상태면 로그인 버튼 노출 */}

      {user.length > 0 ? (
        <LogoutBtn onClick={userLogout}>로그아웃</LogoutBtn>
      ) : (
        <LoginBtn onClick={loginPage}>로그인</LoginBtn>
      )}
      <DeleteUserBtn onClick={deleteUserInfo}>회원탈퇴</DeleteUserBtn>
    </HeaderContainer>
  );
}

export const HeaderContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 14px;
  border-bottom: 1px solid gray;
`;
export const HomeBtn = styled.button`
  font-size: 14px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
`;

export const LoginBtn = styled.button`
  font-size: 14px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
`;
export const LogoutBtn = styled.button``;
export const DeleteUserBtn = styled.button`
  font-size: 14px;
  background-color: white;
  color: black;
  border: none;
  cursor: pointer;
`;
