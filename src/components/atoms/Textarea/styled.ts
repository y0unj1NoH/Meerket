import styled from '@emotion/styled';

interface ITextareaWrapperProps {
  focus: boolean;
}

export const TextareaWrapper: ReturnType<
  typeof styled.div<ITextareaWrapperProps>
> = styled.div<ITextareaWrapperProps>`
  border: 1px solid
    ${({ focus, theme }) =>
      focus ? theme.colors.primary : theme.colors.grey200};
  border-radius: ${({ theme }) => theme.radius.lg};
  width: 100%;

  // TODO: 스크롤이 아니라 쓰는 방법 높이가 늘어나도록 수정
  textarea {
    background: transparent;
    border: none;
    outline: none;
    width: 100%;
    height: 140px;
    color: ${({ theme }) => theme.colors.grey600};
    padding: 16px;
    resize: none;
    overflow-y: auto;
    box-sizing: border-box;

    transition: all 0.125s ease-in;

    &::placeholder {
      color: ${({ theme }) => theme.colors.grey400};
    }

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-button:vertical:start:decrement,
    &::-webkit-scrollbar-button:vertical:end:decrement {
      display: block;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.grey200};
      border-radius: ${({ theme }) => theme.radius.lg};
      background-clip: padding-box;
      border: 2px solid transparent;
    }

    // TODO: 왜인지 모르겠지만, 폰트가 이상함
    font-family: 'Pretendard-Regular' !important;
    /* 가이드/regular */
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: 145%; /* 18.85px */
    letter-spacing: -0.325px;
    white-space: pre-line;
  }
`;
