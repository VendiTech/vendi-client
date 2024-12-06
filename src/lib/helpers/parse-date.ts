import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);

export const parseDate = (date: Date, showTime: boolean = true) => {
  const now = dayjs();
  const inputDate = dayjs(date);

  const time = showTime ? `, ${inputDate.format('HH:mm')}` : '';

  const isToday = inputDate.isSame(now, 'day');
  const isYesterday = inputDate.isSame(now.subtract(1, 'day'), 'day');

  const isSameWeek =
    inputDate.isSameOrAfter(now.startOf('week')) &&
    inputDate.isSameOrBefore(now.endOf('week'));

  if (isToday) {
    return 'Today' + time;
  }

  if (isYesterday) {
    return 'Yesterday' + time;
  }

  if (isSameWeek) {
    return inputDate.format('ddd') + time;
  }

  return `${inputDate.format('MMMM')}, ${inputDate.format('D')}`;
};
