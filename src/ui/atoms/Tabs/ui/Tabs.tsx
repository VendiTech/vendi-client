import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Box, SxProps, Tab, Tabs, Theme } from '@mui/material';
import { TabsProps } from '../types';
import { CustomTabPanel } from './TabPanel';
import { createPortal } from 'react-dom';

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const tabsSx: SxProps<Theme> = {
  minHeight: 'auto',

  '& .MuiTabs-indicator': {
    height: '100%',
    backgroundColor: 'var(--sky-500)',
    borderRadius: 10,
    transitionDuration: '200ms',
  },

  '& .MuiTouchRipple-root': {
    display: 'none',
  },

  '& .MuiTab-root': {
    color: 'var(--slate-500)',
    fontSize: 14,
    fontWeight: 400,
    lineHeight: '21px',
    textTransform: 'none',
    minHeight: 'auto',
    minWidth: 'auto',
    p: '6px 12px',
    zIndex: 1,

    '&.Mui-selected': {
      color: 'var(--slate-000)',
    },
  },
};

export const BasicTab: FC<TabsProps> = ({
  tabComponents,
  tabLabels,
  tabLabelsContainer,
  additionalComponent,
  style,
  value,
  onChange,
}) => {
  const [tabValue, setTabValue] = useState(value ?? 0);
  const [containerEl, setContainerEl] = useState<Element | null>(null)

  useEffect(() => {
    setContainerEl(tabLabelsContainer?.current ?? null)
  }, [tabLabelsContainer]);

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    onChange?.(newValue)
  };

  const tabLabelsNode = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
      }}>
      <Box>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          sx={tabsSx}
          aria-label="basic tabs example">
          {tabLabels?.map((label, index) => {
            return <Tab label={label} key={index} {...a11yProps(index)} />;
          })}
        </Tabs>
      </Box>
      {additionalComponent && <Box>{additionalComponent[tabValue]}</Box>}
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {tabLabelsContainer
        ? containerEl
          ? createPortal(tabLabelsNode, containerEl)
          : null
        : tabLabelsNode}

      {tabComponents?.map((Component, index) => {
        return (
          <CustomTabPanel
            key={index}
            index={index}
            value={tabValue}
            style={style}>
            {Component}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};
