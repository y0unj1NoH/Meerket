import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";

import { ToastInstance as Toast } from "components/atoms/Toast"; // 순환 의존 문제로 수정
import { Loading } from "components/molecules";
import { EmptyTemplate, ChatRoomTemplate } from "components/templates";
import { TopSheet } from "components/templates/ChatRoomTemplate/TopSheet";

import { DEFAULT_IMG_PATH } from "constants/imgPath";
import { CHATROOM_LOADING_MESSAGE, CHATROOM_ENTER_API_URL, CHATROOM_NEW_MESSAGE_API_URL, CHATROOM_NAVIGATE_URL } from "constants/ChatRoomPageConstants";
import { useChatGroups, useWebSocket } from "hooks";
import { http } from "services/api";
import { completeProduct } from "services/apis";
import { useTopBarStore } from "stores";
import type { IPost, IChatMsg, IChatRoomPageResponse, IChatRoomNewMsgResponse } from "types";
import { decryptRoomId } from "utils";

interface IChatRoomBasic {
  /** 채팅방 ID, 몽고DB */
  roomId: string;
  /** 상대방 닉네임 */
  otherNickname: string;
  /** 상대방 프로필 이미지 */
  otherProfileImage: string | undefined;
  /** 상대방 아이디 */
  otherUserId: number;
  /** 게시글 아이디 */
  productId: number;
  /** 게시글 제목 */
  productTitle: string;
  /** 게시글 썸네일 */
  productImage: string | undefined;
  /** 게시글 최종 가격 */
  price: number;
  /** 판매자인지 아닌지 (판매완료를 위해) */
  isSeller: boolean;
  /** 현재 채팅 가능 상태인지(상대방이 채팅방에서 안나갔는지) */
  isChatAvailable: boolean;
  /** 게시글 판매 동네*/
  sellerAddress: string;
  /** 게시글 등록 날짜 */
  productCreatedAt: string;
  /** 게시글 상태 */
  productStatus: "BIDDING" | "IN_PROGRESS" | "COMPLETED";
}


const ChatRoomPage = () => {
  const { clear, setTitle } = useTopBarStore();
  const navigate = useNavigate();
  const { roomId, userId } = useParams(); // URL에서 roomId 가져오기
  const decrtyptRoomId = roomId ? decryptRoomId(roomId) : "";

  const [post, setPost] = useState<IPost>();
  const [otherUserId, setOtherUserId] = useState<number>(-1);
  const [otherNickname, setOtherNickname] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>(DEFAULT_IMG_PATH);
  const [chats, setChats] = useState<IChatMsg[]>([]);
  const [lastMsgTime, setLastMsgTime] = useState<string>("");
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const chatGroups = useChatGroups(chats, otherUserId, imgUrl);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { connect, disconnect, sendMessage, isConnected } = useWebSocket();
  const [isMsgSended, setIsMsgSended] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [prevHeight, setPrevHeight] = useState(0); // 이전 스크롤 높이 저장

  const [loading, setLoading] = useState(true); // 로딩 상태


  /** 백엔드 IChatRoom 타입을 프론트 IChatItemProps 으로 변환 함수
   * @param chatRoom : IChatRoom
   * @returns IChatItemProps
   */
  const createChatRoomBasicInfo = (
    chatRoomBasicInfo: IChatRoomBasic
  ): IPost => {
    setIsCompleted(chatRoomBasicInfo.productStatus === "COMPLETED");
    return {
      productId: chatRoomBasicInfo.productId,
      imgUrl: chatRoomBasicInfo.productImage || DEFAULT_IMG_PATH,
      title: chatRoomBasicInfo.productTitle,
      maxPrice: 0,
      price: chatRoomBasicInfo.price,
      address: chatRoomBasicInfo.sellerAddress,
      uploadTime: chatRoomBasicInfo.productCreatedAt,
      expiredTime: "",
      isSeller: chatRoomBasicInfo.isSeller,
      status: chatRoomBasicInfo.productStatus,
      onClick: () => {
        navigate(`${CHATROOM_NAVIGATE_URL}/${chatRoomBasicInfo.productId}`);
      },
      onTextButtonClick: () => {
        completeProduct(chatRoomBasicInfo.productId!.toString())
        .then(() => {
          Toast.show("거래가 완료되었어요!", 2000);
          setIsCompleted(true);
        })
        .catch((error) => {
          Toast.show("잠시 후에 다시 시도해 주세요.", 2000);
          console.error(error);
        });
      },
      onIconButtonClick: () => {
        console.log("onIconButtonClick");
      },
    };
  };

  /** 메시지 시간순(오름차순) 으로 정렬하는 함수
   * @param messages : IChatMsg[]
   * @return messages : IChatMsg[]
   */
  const sortMessages = useCallback((messages: IChatMsg[]): IChatMsg[] => {
    messages.sort((a, b) => {
      const dateA = new Date(a.createdAt); // a의 createdAt을 Date 객체로 변환
      const dateB = new Date(b.createdAt); // b의 createdAt을 Date 객체로 변환

      return dateA.getTime() - dateB.getTime(); // 오름차순 정렬
    });
    return messages;
  },[]);

  /** 초기 채팅방 진입 시 기본 정보 및 초기 메시지30 불러오는 함수
   */
  const fetchMessages = async () => {
    try {
      const response = await http.post<IChatRoomPageResponse>(`${CHATROOM_ENTER_API_URL}/${decrtyptRoomId}`);
      if (response.success && response.code === "COMMON200") {
        setOtherUserId(response.result.chatRoomBasicInfo.otherUserId);
        setOtherNickname(response.result.chatRoomBasicInfo.otherNickname);
        // 백엔드 타입 프론트엔드 타입으로 변환
        const createdPost = createChatRoomBasicInfo(
          response.result.chatRoomBasicInfo
        );
        setPost(createdPost);
        setImgUrl(
          response.result.chatRoomBasicInfo.otherProfileImage ||
            DEFAULT_IMG_PATH
        );
        if (response.result.messages.length !== 0) {
          const sortedMessages = sortMessages(response.result.messages);
          setChats(sortedMessages);
          setLastMsgTime(sortedMessages[0].createdAt);
        }
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  /** 스크롤 올릴때마다 30개씩 새로운 메시지만 fetch 하는 함수
   */
  const fetchNewMessages = async () => {
    try {
      const response = await http.get<
        IChatRoomNewMsgResponse,
        { roomId: string; beforeTime: string }
      >(CHATROOM_NEW_MESSAGE_API_URL, {
        roomId: decrtyptRoomId || "",
        beforeTime: lastMsgTime || "",
      });
      if (
        response.success &&
        response.code === "COMMON200" &&
        response.result.length !== 0
      ) {
        const sortedMessages = sortMessages(response.result);
        const responseLastMsgTime = sortedMessages[0].createdAt;

        if (lastMsgTime !== responseLastMsgTime) {
          setChats([...sortedMessages, ...chats]);
          setLastMsgTime(responseLastMsgTime);
        }
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  /** 초기 채팅방 진입 시 수행되는 useEffect
   * 1. fetchChatMessages 호출
   */
  useEffect(() => {
    clear();
    const fetchChatMessages = async () => {
      await fetchMessages();
    };
    fetchChatMessages()
      .catch((error) => {
        console.error("Error fetching Chat Message:", error);
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTitle(otherNickname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otherNickname]);

  /**
   * 2. connectToWebSocket 호출(웹소켓 연결)
   * 3. 컴포넌트 언마운트시 disconnectFromWebSocket 호출 설정
   * (isConnected 값 바로 반영안되는 문제로 초기 채팅방 진입 시 수행되는 useEffect와 분리 하였음)
   */
  useEffect(() => {
    /** 웹 소켓 연결 */
    const connectToWebSocket = async () => {
      if (decrtyptRoomId && userId) {
        await connect(decrtyptRoomId, userId, setChats);
      }
    };

    connectToWebSocket().catch((error) => {
      console.error("Error connecting to WebSocket:", error);
    }); // 연결 시도 중 발생할 수 있는 오류를 처리

    /** 컴포넌트 언마운트 시 웹 소켓 연결 끊기 */
    return () => {
      const disconnectFromWebSocket = async () => {
        await disconnect();
      };

      disconnectFromWebSocket().catch((error) => {
        console.error("Error disconnecting from WebSocket:", error);
      }); // 연결 시도 중 발생할 수 있는 오류를 처리
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  /** 초기 채팅방 입장 시 스크롤 맨 아래로 내리는 함수
   */
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const [check, setCheck] = useState(false);
  const [isNewFetch, setIsNewFetch] = useState(false);

  /** 데이터가 fetch된 후, DOM이 렌더링된 상태에서 스크롤을 내리는 useEffect
   *  isFirstFetch 값에 따라 scrollToBottom() 실행해서 맨 아래로 내림
   */
  useEffect(() => {
    if (chatGroups.length > 0) {
      if (isFirstFetch) {
        scrollToBottom();
        setIsFirstFetch(false);
      }
      if (isMsgSended) {
        scrollToBottom();
        setIsMsgSended(false);
      }
      if (isNewFetch && scrollRef.current) {
        document.documentElement.scrollTop = scrollRef.current.scrollHeight - prevHeight; 
        setIsNewFetch(false);
      }
    }
  }, [chatGroups]);


  const { ref: loadMoreRef, inView } = useInView();

  useEffect(() => {
    if (inView) {
      if(!check){
        setCheck(true);
        return;
      }
      setPrevHeight(scrollRef.current?.scrollHeight || 0);
      fetchNewMessages().then(() => {
        setIsNewFetch(true);
      }).catch((error) => {
        console.error("Failed to fetch new messages:", error);
      });
    }
  }, [inView]); 

  const handleInput = (message: string) => {
    sendMessage(decrtyptRoomId, message, Number(userId!), otherUserId);
    setIsMsgSended(true);
  };

  if (loading) {
    return <Loading message={CHATROOM_LOADING_MESSAGE}></Loading>; // 로딩 중 메시지
  }
  return post ? (
    <>
      <TopSheet post={post} isCompleted={isCompleted}></TopSheet>
      <ChatRoomTemplate
        post={post}
        chatBubbles={chatGroups}
        onWriteMessage={handleInput}
        scrollContainerRef={scrollContainerRef}
        scrollRef={scrollRef}
      >
        <div ref={loadMoreRef} />
      </ChatRoomTemplate>
    </>
  ) : (
    <div style={{ width: "100%" }}>
      <EmptyTemplate type={"chatRoom"}></EmptyTemplate>
    </div>
  );
};

export default ChatRoomPage;