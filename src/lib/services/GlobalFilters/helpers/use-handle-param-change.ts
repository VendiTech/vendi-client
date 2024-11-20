import { useSearchParams } from 'next/navigation';
import { useUpdateUrl } from './use-update-url';
import { useCallback } from 'react';

export const useHandleParamChange = () => {
  const searchParams = useSearchParams();
  const updateUrl = useUpdateUrl();

  return useCallback(
    (paramName: string, newParamValue: string | string[]) => {
      const params = new URLSearchParams(searchParams);

      let filteredNewParams = Array.isArray(newParamValue)
        ? [...newParamValue]
        : newParamValue;

      if (
        Array.isArray(filteredNewParams) &&
        newParamValue[newParamValue.length - 1] === '0'
      ) {
        filteredNewParams = '0';
      }

      if (Array.isArray(filteredNewParams) && newParamValue.length > 1) {
        filteredNewParams = filteredNewParams.filter((item) => item !== '0');
      }

      const joinedParamValue = Array.isArray(filteredNewParams)
        ? filteredNewParams.join(',')
        : filteredNewParams;

      if (joinedParamValue === '0') {
        params.delete(paramName);
      } else {
        params.set(paramName, joinedParamValue);
      }

      updateUrl(params);
    },
    [searchParams, updateUrl],
  );
};
