import { ParamsNames } from '../helpers/params-names';
import { useGlobalFilters } from '../helpers/use-global-filters';
import { useHandleParamChange } from '../helpers/use-handle-param-change';
import { useUserFilters } from '../helpers/use-user-filters';
import { useValidateUrl } from '../helpers/use-validate-url';
import { BaseFilter } from './BaseFilter';

export const UserFilter = () => {
  const { user } = useGlobalFilters();
  const userFilters = useUserFilters();
  const handleParamChange = useHandleParamChange();

  const selectedUser = user ?? [userFilters[0].id];

  useValidateUrl(ParamsNames.User, user, userFilters);

  return (
    <BaseFilter
      multiple
      showSearch
      onChange={(e) =>
        handleParamChange(ParamsNames.User, e.target.value as string[])
      }
      displayValue={
        user
          ? userFilters
              .filter((item) => user.includes(String(item.id)))
              .map((item) => item.name)
              .join(', ')
          : userFilters[0].name
      }
      options={userFilters.map((item) => ({
        key: item.id,
        value: String(item.id),
        displayValue: item.name,
      }))}
      value={selectedUser}
    />
  );
};
