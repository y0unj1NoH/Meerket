import React from "react";
import { TextButton } from "components/atoms";
import { NeighborhoodSelectionList } from "components/organisms";
import { NeighborhoodSelectionTemplateWrapper } from "./styled";
import type { IActivityArea, ICoord } from "types";

interface INeighborhoodSelectionTemplateProps {
  /** 동네 목록 */
  neighborhoods: IActivityArea[];
  /** 동네 클릭 시 실행할 함수 */
  onNeighborhoodClick: (neighborhood: string) => void;
  /** 현재 위치로 찾기 클릭 시 실행할 함수 */
  onFindCurrentLocationClick: (location?: ICoord) => void;
}

const baseNeighborhoodSelectionTemplate = ({
  neighborhoods,
  onNeighborhoodClick,
  onFindCurrentLocationClick,
}: INeighborhoodSelectionTemplateProps) => {
  return (
    <NeighborhoodSelectionTemplateWrapper>
      <NeighborhoodSelectionList
        neighborhoods={neighborhoods.map(
          (neighborhood) => neighborhood.fullAddress
        )}
        onClick={onNeighborhoodClick}
      />
      <TextButton
        text="현재 위치로 찾기"
        onClick={() => onFindCurrentLocationClick()}
      />
    </NeighborhoodSelectionTemplateWrapper>
  );
};

export const NeighborhoodSelectionTemplate = React.memo(baseNeighborhoodSelectionTemplate);