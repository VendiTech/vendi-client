import type { CellData, Sort } from '../types';

type Params = {
  data: CellData[];
  fieldsForSearch: string[];
  searchTerm?: string;
  sort: Sort;
};

export const sortItems = ({
  data,
  fieldsForSearch,
  searchTerm,
  sort,
}: Params) =>
  data
    .filter((item) => {
      if (!searchTerm || !fieldsForSearch.length) return true;

      return fieldsForSearch.reduce((prev, curr) => {
        const searched = item.elements.find(
          (element) =>
            element.field === curr &&
            element.value?.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        return prev || !!searched;
      }, false);
    })
    .sort((prev, curr) => {
      if (!sort.field || !sort.direction) return 0;

      const targetPrev = prev.elements.find(
        (item) => item.field === sort.field,
      )?.value;
      const targetCurr = curr.elements.find(
        (item) => item.field === sort.field,
      )?.value;

      if (!targetPrev) return 1;
      if (!targetCurr) return -1;

      let result = targetPrev > targetCurr! ? 1 : -1;

      if (sort.comparator) {
        result = sort.comparator(targetPrev, targetCurr);
      }

      return sort.direction === 'asc' ? result : result * -1;
    });
