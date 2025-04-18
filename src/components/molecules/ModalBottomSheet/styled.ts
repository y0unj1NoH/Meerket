import { css } from "@emotion/react";
import styled from "@emotion/styled";
import type { IModalBottomSheetProps } from ".";

export const ModalBottomSheetBackgroundWrapper: ReturnType<typeof styled.div> =
  styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => `${theme.colors.black}80`};
`;

export const ModalBottomSheetBodyWrapper: ReturnType<typeof styled.div> =
  styled.div`
  position: fixed;
  left: 0;
  width: 100%;
  // max-width: 375px;
  max-width: 400px;
  left: 50%;
  translate: -50%;
  padding: 1rem;
  border-radius: 16px 16px 0 0;
  background-color: ${({ theme }) => theme.colors.white};
`;

const modalBottomSheetConfig = (open: boolean) => css`
  visibility: ${open ? "visible" : "hidden"};
  ${ModalBottomSheetBackgroundWrapper} {
    transition: 0.3s;
    opacity: ${open ? 1 : 0};
  }
  ${ModalBottomSheetBodyWrapper} {
    transition: 0.3s;
    bottom: ${open ? "0" : "-100%"};
  }
`;

export const ModalBottomSheetWrapper: ReturnType<
  typeof styled.div<Pick<IModalBottomSheetProps, "open">>
> = styled.div<Pick<IModalBottomSheetProps, "open">>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndexes.BottomSheet};
  width: 100%;
  height: 100%;
  ${({ open }) => modalBottomSheetConfig(!!open)}
`;
