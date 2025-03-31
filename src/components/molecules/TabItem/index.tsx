import { TabIndicator, Text } from "components/atoms";
import { TabItemWrapper } from "./styled";

export type TabItemState = "default" | "active";

interface ITabItemProps {
  /** 현재 선택된 아이템인지 아닌지 구분 */
  state: TabItemState;
  /** 타이틀 */
  title: string;
  /** 클릭 이벤트 */
  onClick: () => void;
}

export const TabItem = ({ state, title, onClick }: ITabItemProps) => {
  return (
    <TabItemWrapper state={state} onClick={onClick}>
      <Text variant="guide_bold">
        {title}
      </Text>
      <TabIndicator isActive={state === "active"} />
    </TabItemWrapper>
  );
};
