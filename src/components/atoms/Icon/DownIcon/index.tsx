import { type IIconProps, IconWrapper } from "../styled";
import { FiChevronDown } from "@react-icons/all-files/fi/FiChevronDown";
/**
 * Down 아이콘
 */
export const DownIcon = ({ size = "m" }: IIconProps) => {
  return (
    <IconWrapper size={size}>
      <FiChevronDown />
    </IconWrapper>
  );
};
