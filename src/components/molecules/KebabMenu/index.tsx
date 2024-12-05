import { TextButton } from "components/atoms";
import { KebabMenuWrapper } from "./styled";
import type { IMenu } from "types";

interface IKebabMenuProps {
  children: React.ReactNode;
}

const KebabMenuRoot = ({ children }: IKebabMenuProps) => {
  return <KebabMenuWrapper>{children}</KebabMenuWrapper>;
};

const Button = (menu: IMenu) => {
  return <TextButton text={menu.content} size="s" onClick={menu.onClick} />;
};

export const KebabMenu: typeof KebabMenuRoot & {
  Button: typeof Button;
} = Object.assign(KebabMenuRoot, {
  Button: Button,
});
