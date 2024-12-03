import { NeighborhoodAuthForm } from "components/organisms";
import { NeighborhoodAuthTemplateWrapper } from "./styled";
import { ILocation } from "types";

interface INeighborhoodAuthTemplateProps {
  /** 동네 인증 버튼 클릭 이벤트 */
  onSubmitButtonClick?: (location: ILocation) => void;
  /** 위치 권한 가져오기 실패 시 모달을 실행할 함수 */
  locationErrorEvent: (message: string) => void;
}

export const NeighborhoodAuthTemplate = ({
  onSubmitButtonClick,
  locationErrorEvent
}: INeighborhoodAuthTemplateProps) => {
  return (
    <NeighborhoodAuthTemplateWrapper>
      <NeighborhoodAuthForm
        onSubmitButtonClick={onSubmitButtonClick}
        locationErrorEvent={locationErrorEvent}
      />
    </NeighborhoodAuthTemplateWrapper>
  );
};
