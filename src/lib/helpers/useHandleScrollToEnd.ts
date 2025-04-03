import { UIEventHandler, useCallback, useEffect, useState } from 'react';

type Handler = UIEventHandler<HTMLDivElement>;
type EventTarget = Parameters<Handler>[0]['currentTarget'];

export const useHandleScrollToEnd = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onScrollToEnd?: () => any,
  defineIsScrolledToEnd?: (scrollParams: EventTarget) => boolean,
) => {
  const [isReachedEnd, setIsReachedEnd] = useState(false);

  useEffect(() => {
    if (!isReachedEnd) return;

    setIsReachedEnd(false);

    onScrollToEnd?.();
  }, [onScrollToEnd, isReachedEnd]);

  const handleScroll: Handler = useCallback(
    (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

      const isEnd = defineIsScrolledToEnd
        ? defineIsScrolledToEnd(e.currentTarget)
        : scrollTop + clientHeight >= scrollHeight - 10;

      setIsReachedEnd(isEnd);
    },
    [defineIsScrolledToEnd],
  );

  return handleScroll;
};
