import { ImageSlider } from "components/molecules";
import {
  AuctionBidBottomSheet,
  AuctionControlBar,
  AuctionTimer,
  Comment,
  ItemDetails,
  LocationMap,
  Profile,
} from "components/organisms";
import { DetailTemplateWrapper, ImageSliderAndTimer } from "./styled";
import { useBid, useDetailModal } from "hooks";
import { buttonNames, priceNames } from "constants/auctionControlBarNames";
import type { IComment, IProductDetail } from "types";

interface IBaseDetailTemplateProps extends IProductDetail {
  /** 판매자 정보 */
  seller: {
    id: number;
    name: string;
    image: string;
  };
  /** 이미지 목록 */
  images: string[];
  /** 마감일자 */
  expiredTime: string;
  /** 카테고리 */
  category: string;
  /** 제목 */
  title: string;
  /** 내용 */
  content: string;
  /** 작성일자 */
  uploadTime: string;
  /** 거래 희망 장소 */
  productLocation: {
    longtitude: number;
    latitube: number;
    address: string;
    location: string;
  };
  /** 거래 희망 장소 클릭 시 이벤트 */
  onLocationClick: () => void;
  /** 댓글 목록 */
  comments: IComment[];
  /** 댓글 작성 함수 */
  onWriteComment: (message: string) => void;
  /** 최소 입찰가 */
  minimumPrice: number;
  /** 내 입찰가 */
  myPrice?: number;
  /** 최고 입찰가 */
  maximumPrice?: number;
  /** 입찰 취소 */
  onCancel: () => void;
  /** 조기마감 */
  onEarlyClosing: () => void;
}

export const DetailTemplate = ({
  // 이미지 슬라이더
  images,
  // AuctionTimer
  expiredTime,
  // 아이템 상세
  category,
  title,
  content,
  uploadTime,
  // 판매자 정보
  seller: { name, image },
  // 거래 희망 장소
  productLocation: { longtitude, latitube, address, location },
  onLocationClick,
  // 댓글
  comments,
  // 가격
  minimumPrice,
  myPrice,
  maximumPrice,
  isEarly,
  // hasBuyer,
  onCancel,
  onEarlyClosing,
}: IBaseDetailTemplateProps) => {
  const modal = useDetailModal();
  const {
    open,
    price,
    setPrice,
    handleOpenBottomSheet,
    handleCloseBottomSheet,
    handleBid,
  } = useBid();

  return (
    <DetailTemplateWrapper>
      <ImageSliderAndTimer>
        <ImageSlider imgUrls={images} />
        <AuctionTimer targetDate={new Date(expiredTime)} />
      </ImageSliderAndTimer>
      <ItemDetails
        title={title}
        category={category}
        createdAt={uploadTime}
        description={content}
      />
      <Profile imgUrl={image} nickname={name} location={address} />
      <LocationMap
        coord={{ lat: latitube, lng: longtitude }}
        location={location}
        onClick={onLocationClick}
      />
      <Comment comments={comments} />
      <AuctionControlBar>
        <AuctionControlBar.BidContainer>
          <AuctionControlBar.Bid
            title={priceNames.minimumPrice}
            price={minimumPrice}
          />
          {myPrice && (
            <AuctionControlBar.Bid title={priceNames.myPrice} price={myPrice} />
          )}
          {maximumPrice && (
            <AuctionControlBar.Bid
              title={priceNames.maximumPrice}
              price={maximumPrice}
            />
          )}
        </AuctionControlBar.BidContainer>
        <AuctionControlBar.ButtonContainer>
          {!maximumPrice && !myPrice && (
            <AuctionControlBar.Button
              text={buttonNames.bid}
              onClick={handleOpenBottomSheet}
            />
          )}
          {myPrice && (
            <>
              <AuctionControlBar.Button
                text={buttonNames.cancel}
                onClick={
                  isEarly
                    ? () => modal.cancelEarly()
                    : () => modal.cancel(onCancel)
                }
              />
              <AuctionControlBar.Button
                text={buttonNames.edit}
                onClick={handleOpenBottomSheet}
              />
            </>
          )}
          {maximumPrice && (
            <AuctionControlBar.Button
              text={buttonNames.early}
              onClick={() => modal.earlyClosing(onEarlyClosing)}
            />
          )}
        </AuctionControlBar.ButtonContainer>
      </AuctionControlBar>
      <AuctionBidBottomSheet
        price={price}
        setPrice={setPrice}
        minPrice={minimumPrice}
        beforePrice={myPrice}
        onBid={handleBid}
        open={open}
        onClose={handleCloseBottomSheet}
      />
    </DetailTemplateWrapper>
  );
};