import styled from '@emotion/styled';
import { TextButtonWrapper } from 'components/atoms/Button/TextButton/styled';
import type { IPostItemImageProps } from '.';

export const PostItemImageWrapper: ReturnType<
  typeof styled.div<Pick<IPostItemImageProps, 'size'>>
> = styled.div<Pick<IPostItemImageProps, 'size'>>`
  width: ${({ size }) => (size === 'mini' ? '60px' : '90px')};
`;

export const PostItemContainerWrapper: ReturnType<typeof styled.div> =
  styled.div`
    //9.5px = 0.59375rem
    padding: 0.59375rem 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  `;

export const PostItemTitleWrapper: ReturnType<typeof styled.div> = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
  white-space: normal;
`;

export const PostItemLocationAndTimeWrapper: ReturnType<typeof styled.div> =
  styled.div`
    display: flex;
    gap: 0.5rem;

    color: ${({ theme }) => theme.colors.grey500};
  `;

export const PostItemPriceWrapper: ReturnType<typeof styled.div> = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const PostItemRemainingTimeWrapper: ReturnType<typeof styled.div> =
  styled.div`
    display: flex;
    gap: 0.25rem;
  `;

export const PostItemButtonContainerWrapper: ReturnType<typeof styled.div> =
  styled.div`
    width: 100%;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    ${TextButtonWrapper} {
      flex: 1;
    }
  `;

export const PostItemRootWrapper: ReturnType<typeof styled.div> = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 1rem;
  cursor: pointer;
  padding: 1rem;

  color: ${({ theme }) => theme.colors.grey600};

  /**
   * Hover 됬을 때 명확한 색 필요, 임시로 grey100으로 결정
   */
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey100};
  }
`;
