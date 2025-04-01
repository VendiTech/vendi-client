import { useSearchParams } from 'next/navigation';
import { useUpdateUrl } from './use-update-url';
import { useCallback } from 'react';

type ParamChange = {
  paramName: string;
  newParamValue: string | string[];
};

export const useHandleParamChange = () => {
  const searchParams = useSearchParams();
  const updateUrl = useUpdateUrl();

  return useCallback(
    (paramChanges: ParamChange | ParamChange[]) => {
      const params = new URLSearchParams(searchParams);

      const changes = Array.isArray(paramChanges)
        ? paramChanges
        : [paramChanges];

      const newParams = changes.map(({ paramName, newParamValue }) => {
        let filteredNewParams = Array.isArray(newParamValue)
          ? newParamValue.length
            ? [...newParamValue]
            : ['0']
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

        return { paramName, newParamValue: joinedParamValue };
      });

      newParams.forEach(({ paramName, newParamValue }) => {
        if (newParamValue === '0') {
          params.delete(paramName);
        } else {
          params.set(paramName, newParamValue);
        }
      });

      updateUrl(params);
    },
    [searchParams, updateUrl],
  );
};
