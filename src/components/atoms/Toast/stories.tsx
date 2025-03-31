import type { Meta, StoryObj } from "@storybook/react";
import { ToastInstance as Toast } from "components/atoms/Toast"; // 순환 의존 문제로 수정
interface IToastArgs {
  message: string;
  duration: number;
}

const meta: Meta<IToastArgs> = {
  title: "Atoms/Toast",
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "text",
      description: "토스트 메시지"
    },
    duration: {
      control: "number",
      description: "토스트 지속시간 (ms)"
    }
  },
  render: ({ message, duration }) => (
    <button
      onClick={() => {
        Toast.show(message, duration);
      }}
    >
      Show Toast
    </button>
  )
};

type Story = StoryObj<IToastArgs>;

export const Default: Story = {
  args: {
    message: "This is a toast message",
    duration: 2000
  }
};

export default meta;

