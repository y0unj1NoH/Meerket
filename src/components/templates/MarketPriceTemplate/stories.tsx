import type { Meta, StoryObj } from "@storybook/react";
import { MarketPriceTemplate } from ".";
import { DEFAULT_IMG_PATH } from "constants/imgPath";
import { IPost } from "components/organisms/PostList";

const meta: Meta<typeof MarketPriceTemplate> = {
  title: "Templates/MarketPriceTemplate",
  component: MarketPriceTemplate,
  tags: ["autodocs"],
};

type Story = StoryObj<typeof meta>;

const tempPosts: IPost[] = Array.from({ length: 30 }, (_, index) => ({
  productId: index + 1,
  imgUrl: DEFAULT_IMG_PATH,
  title: `물품 ${index + 1}`,
  price: 3500 + index * 1000, // 가격에 변화를 주기 위해 설정
  address: "신림동",
  uploadTime: `2024-11-28 ${11 + index}:00:00`, // 시간에 변화를 주기 위해 설정
  onClick: () => {
    console.log(`클릭 ${index + 1}`);
  },
  expiredTime: `2024-12-29 ${11 + index}:00:00`,
  maxPrice: 30000,
  onTextButtonClick: () => {
    console.log("Text Button 클릭");
  },
  onIconButtonClick: () => {
    console.log("Icon Button 클릭");
  },
}));

export const Default: Story = {
  args: {
    posts: tempPosts,
  },
  parameters: {
    initialEntries: ["/history"], // 스토리별 초기 URL 설정
  },
};

export const Empty: Story = {
  args: {
    posts: [],
  },
  parameters: {
    initialEntries: ["/history"], // 스토리별 초기 URL 설정
  },
};
export default meta;