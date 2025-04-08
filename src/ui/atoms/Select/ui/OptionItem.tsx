import { MouseEvent, useState } from 'react';
import { Box, IconButton, MenuItem, Typography } from '@mui/material';
import ChevronRight from '@/assets/icons/ChevronRight.svg';
import { getSearchType } from '../helpers/getSearchType';
import { NestedOptionType, OptionType, SearchType } from '../types';
import CheckIcon from '@/assets/icons/Check.svg';

type Props = {
  option: OptionType;
  searchTerm: string;
  selectedOptions: NestedOptionType[];
  level?: number;
  isParentSearched?: boolean;
  onOptionSelect?: (option: NestedOptionType) => void;
};

export const OptionItem = (props: Props) => {
  const {
    option,
    level = 0,
    searchTerm,
    selectedOptions,
    isParentSearched,
    onOptionSelect,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const searchType = getSearchType(option, searchTerm);
  const shouldBeDisplayed =
    isParentSearched || searchType !== SearchType.None || !searchTerm;
  const isHighlighted = searchTerm && searchType === SearchType.ByName;
  const isOpenOrSearched = isOpen || searchType !== SearchType.None;
  const isSelected = selectedOptions.some(
    (selectedOption) =>
      selectedOption.key === option.key && selectedOption.level === level,
  );

  const selectedChildrenCount = option.children?.reduce((acc, child) => {
    const isChildrenSelected = selectedOptions.some(
      (selectedOption) =>
        selectedOption.key === child.key && selectedOption.level === level + 1,
    );

    return isChildrenSelected ? acc + 1 : acc;
  }, 0);

  if (!shouldBeDisplayed) return null;

  const handleItemClick = () => {
    onOptionSelect?.({
      ...option,
      level,
    });
  };

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <MenuItem
        disableRipple
        value={option.value}
        key={option.key}
        sx={{
          '& .MuiButtonBase-root.MuiMenuItem-root:hover, .MuiButtonBase-root.Mui-focusVisible, .MuiButtonBase-root.Mui-selected, .MuiMenuItem-root.Mui-selected.Mui-focusVisible ':
            {
              background: 'var(--slate-050)',
            },
          height: 5,
          p: 0,
          pl: level * 3,
        }}
        onClick={handleItemClick}>
        <Box
          sx={{
            height: '100%',
            p: 1,
            gap: 1,
            display: 'flex',
            alignItems: 'center',
            width: '100%',
          }}>
          <CheckIcon
            style={{
              opacity: isSelected ? 1 : 0,
              fill: 'var(--sky-500)',
              width: '16px',
              height: '16px',
            }}
          />

          <Box
            sx={{
              display: 'flex',
              gap: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
              <Typography
                variant="sm-regular"
                sx={{
                  background: isHighlighted ? 'var(--sky-200)' : 'none',
                }}>
                {option.displayValue ?? option.value}
              </Typography>
              {selectedChildrenCount ? (
                <Typography variant="sm-regular" color="var(--sky-500)">
                  {selectedChildrenCount} {selectedChildrenCount === 1 ? 'item' : 'items'}
                </Typography>
              ) : null}
            </Box>

            {option.children?.length ? (
              <IconButton onClick={handleOpen}>
                {isOpenOrSearched ? (
                  <ChevronRight
                    width={15}
                    height={15}
                    style={{ transform: 'rotate(-90deg)' }}
                  />
                ) : (
                  <ChevronRight
                    width={15}
                    height={15}
                    style={{ transform: 'rotate(90deg)' }}
                  />
                )}
              </IconButton>
            ) : null}
          </Box>
        </Box>
      </MenuItem>

      {isOpenOrSearched &&
        option.children?.map((childOption) => (
          <OptionItem
            key={childOption.key}
            option={childOption}
            searchTerm={searchTerm}
            selectedOptions={selectedOptions}
            level={level + 1}
            isParentSearched={searchType === SearchType.ByName}
            onOptionSelect={onOptionSelect}
          />
        ))}
    </>
  );
};
