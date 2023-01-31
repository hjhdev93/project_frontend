import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { kakaoLogin } from "../store/user/userSlice";

export default function KakaoLoginRedirectHandler() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const user = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(kakaoLogin(code));
    navigate("/");
  }, []);

  console.log(user);

  return <div>KakaoLoginRedirectHandler</div>;
}
