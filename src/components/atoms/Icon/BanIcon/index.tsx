import { type IIconProps, IconWrapper } from "../styled";
import { FiUserX } from "@react-icons/all-files/fi/FiUserX";

/**
 * 차단 아이콘
 */
export const BanIcon = ({ size = "m" }: IIconProps) => {
  return (
    <IconWrapper size={size}>
      <FiUserX />
    </IconWrapper>
  );
};
