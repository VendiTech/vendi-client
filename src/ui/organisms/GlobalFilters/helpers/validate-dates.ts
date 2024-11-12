import dayjs, { Dayjs } from 'dayjs';

export const validateDates = (dateFrom: Dayjs | null, dateTo: Dayjs | null) => {
  const today = dayjs();
  const oneMonthAgo = today.subtract(1, 'month');

  let validatedDateFrom = dateFrom ? dateFrom : oneMonthAgo;
  let validatedDateTo = dateTo ? dateTo : today;

  if (validatedDateFrom.isAfter(today)) {
    validatedDateFrom = today;
  }
  if (validatedDateFrom.isAfter(validatedDateTo)) {
    validatedDateFrom = validatedDateTo;
  }

  if (validatedDateTo.isAfter(today)) {
    validatedDateTo = today;
  }
  if (validatedDateTo.isBefore(validatedDateFrom)) {
    validatedDateTo = validatedDateFrom;
  }

  return { validatedDateFrom, validatedDateTo };
};
