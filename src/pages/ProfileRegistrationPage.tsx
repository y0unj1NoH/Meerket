import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastInstance as Toast } from "components/atoms/Toast"; // 순환 의존 문제로 수정
import { ProfileRegistrationTemplate } from "components/templates";
import { useTopBarStore, useUserStore } from "stores";

import type { IUser, IUserProfileData } from "types";
import { registerAndEditProfile } from "services/apis/user";

const ProfileRegistrationPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { clear, setTitle } = useTopBarStore();

  const handleProfileRegistration = useCallback((data: IUser) => {
    // nickname은 검사하고 오기 때문에 타입 어설션 사용
    const nickname = data.nickname!;
    const profile = data.profile;
    const requestData: IUserProfileData = {
      name: nickname,
    };

    if (typeof profile !== "string") {
      requestData.image = profile || null;
    }

    // TODO API 확정 이후 수정
    registerAndEditProfile(requestData)
      .then(() => {
        // 저장 완료 내역을 클라이언트에도 적용
        // const { result } = data;
        // setUser(result);

        // profile 제외 닉네임은 저장가능해서 일단 저장
        setUser({ ...user, nickname: nickname });

        navigate("/my-page", {
          replace: true,
        });
      })
      .catch((error) => {
        // 닉네임 중복 확인
        if (error.response.data.code === "USER409") {
          Toast.show("이미 존재하는 닉네임이에요!", 2000);
        }
        console.error(error);
      });
  },[user, setUser]);

  useEffect(() => {
    clear();
    if (user === null || !user?.nickname) {
      setTitle("프로필 등록");
    } else {
      setTitle("프로필 수정");
    }
  }, []);

  return (
    <ProfileRegistrationTemplate
      user={user || undefined}
      onSubmit={handleProfileRegistration}
    />
  );
};

export default ProfileRegistrationPage;