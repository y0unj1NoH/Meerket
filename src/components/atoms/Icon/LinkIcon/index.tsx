import { FaAngleRight } from "@react-icons/all-files/fa/FaAngleRight";
import { type IIconProps, IconWrapper } from "../styled";

/**
 * 링크 아이콘 ( 거래희망장소 `>` )
 */
export const LinkIcon = ({ size = "m" }: IIconProps) => {
  return (
    <IconWrapper size={size}>
      <FaAngleRight />
    </IconWrapper>
  );
};
