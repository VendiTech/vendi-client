import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ParamsNames } from './params-names';
import { useUpdateUrl } from './use-update-url';

export const useValidateUrl = (param: ParamsNames, filter: string[] | null, allFilters: {id: string | number,  name: string}[]) => {
  const updateUrl = useUpdateUrl()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    if (allFilters.length < 2) return;

    const validatedFilter = filter?.filter((item) =>
      allFilters.find((filter) => String(filter.id) === item),
    );

    const params = new URLSearchParams(searchParams);

    if (!validatedFilter || !validatedFilter.length) {
      params.delete(param);
    } else {
      params.set(param, validatedFilter.join(','));
    }

    updateUrl(params);
  }, [filter, allFilters, searchParams, updateUrl, param]);
}