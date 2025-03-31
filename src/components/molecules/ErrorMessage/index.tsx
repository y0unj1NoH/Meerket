import { Text } from "components/atoms";
import { ErrorMessageWrapper } from "./styled";

interface IErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: IErrorMessageProps) =>
  <ErrorMessageWrapper>
    <Text variant="guide_regular">
      {message}
    </Text>
  </ErrorMessageWrapper>;
