import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store/store";
import { naverLogin } from "../store/user/userSlice";

export default function NaverLoginRedirectHandler() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const user = useSelector((state: RootState) => state.user.users);

  useEffect(() => {
    dispatch(naverLogin(code));
    navigate("/");
  }, []);

  console.log(user);

  return <div>NaverLoginRedirectHandler</div>;
}
