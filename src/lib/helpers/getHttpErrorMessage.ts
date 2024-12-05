import { AxiosError } from 'axios';
import { ErrorsEnum } from '../constants/errors';

interface HTTPValidationError {
  detail?: string;
}

interface HTTPValidationErrors {
  detail?: { detail: { msg: string }[] };
}

interface AvailabilityError {
  errors?: { message: string }[];
}

type ErrorItemType = { msg: string } | { message: string } | { detail: string };

const capitalizeFirstLetter = (str: string) =>
  str
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

const formatLabel = (label: string) =>
  label
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase());

export const formatStringToWords = (label: string, substr?: string) => {
  if (!substr) {
    return formatLabel(label);
  }

  return label
    .split(substr)
    .map((part, index) =>
      index === 0 ? formatLabel(part) : capitalizeFirstLetter(part),
    )
    .join(substr);
};

const fromArrayToString = (items: Array<ErrorItemType>): string => {
  return items
    .map((item) =>
      'msg' in item
        ? formatStringToWords(item?.msg)
        : 'message' in item
          ? formatStringToWords(item?.message)
          : formatStringToWords(item?.detail),
    )
    .join('\n');
};

export const getHttpErrorMessage = (error: unknown): string => {
  const errorData = error as AxiosError;
  console.log(errorData);
  const responseData = (errorData?.response?.data ??
    {}) as HTTPValidationError & HTTPValidationErrors & AvailabilityError;

  let errorConverted: ErrorItemType[] = [];

  if (Array.isArray(responseData?.detail?.detail)) {
    errorConverted = responseData.detail.detail;
  } else if (Array.isArray(responseData?.errors)) {
    errorConverted = responseData.errors;
  } else if (typeof responseData?.detail === 'string') {
    return (
      //@ts-expect-error Error
      ErrorsEnum[responseData.detail] ?? responseData.detail
    );
  }

  return fromArrayToString(errorConverted) || errorData.message;
};
