import { Text } from "components/atoms";
import { getTime } from "utils";
import type { IChat } from "types";
import {
  ChatMessageWrapper,
  MessageInfoWrapper,
  MessageWrapper,
} from "./styled";

export interface IChatMessageProps extends IChat {
  /** 채팅 보낸 유저가 나인지 타인인지 구분 */
  isMe: boolean;
}

export const ChatMessage = ({
  isMe,
  isRead,
  isLastMsg,
  msg,
  createdAt,
}: IChatMessageProps) => {
  return (
    <ChatMessageWrapper isMe={isMe}>
      <MessageWrapper>
        <Text variant="guide_regular">{msg}</Text>
      </MessageWrapper>
      <MessageInfoWrapper>
        {!isRead && <Text variant="tag_regular">1</Text>}
        {isLastMsg && (
          <Text variant="tag_regular">{getTime(createdAt)}</Text>
        )}
      </MessageInfoWrapper>
    </ChatMessageWrapper>
  );
};
