import { AxiosError } from 'axios';

interface HTTPValidationError {
  detail?: string;
}

interface HTTPValidationErrors {
  detail?: { msg: string }[];
}

interface AvailabilityError {
  errors?: { message: string }[];
}

type ErrorItemType = { msg: string } | { message: string } | { detail: string };

const fromArrayToString = (items: Array<ErrorItemType>): string => {
  return items
    .map((item) =>
      'msg' in item
        ? item?.msg
        : 'message' in item
          ? item?.message
          : item?.detail,
    )
    .join('. ');
};

export const getHttpErrorMessage = (error: unknown): string => {
  const errorData = error as AxiosError;
  const responseData = (errorData?.response?.data ??
    {}) as HTTPValidationError & HTTPValidationErrors & AvailabilityError;

  const errorConverted = responseData?.detail ?? responseData?.errors ?? [];

  if (typeof errorConverted === 'string') {
    return errorConverted;
  }

  return fromArrayToString(errorConverted) || errorData.message;
};
