import { Box, SxProps, Tab, Tabs, Theme } from '@mui/material';
import { CSSProperties, FC, ReactNode, SyntheticEvent, useState } from 'react';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
  style?: CSSProperties;
}

type Props = {
  tabLabels: string[];
  tabComponents?: ReactNode[];
  additionalComponent?: ReactNode[];
  style?: CSSProperties;
};

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
    </div>
  );
};

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
    zIndex: -1,
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
    p: '6px 12px',

    '&.Mui-selected': {
      color: 'var(--slate-000)',
    },
  },
};

export const BasicTab: FC<Props> = ({
  tabComponents,
  tabLabels,
  additionalComponent,
  style,
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Tabs
          value={value}
          onChange={handleChange}
          sx={tabsSx}
          aria-label="basic tabs example">
          {tabLabels?.map((label, index) => {
            return <Tab label={label} key={index} {...a11yProps(index)} />;
          })}
        </Tabs>
        {additionalComponent && <Box>{additionalComponent[value]}</Box>}
      </Box>
      {tabComponents?.map((Component, index) => {
        return (
          <CustomTabPanel key={index} index={index} value={value} style={style}>
            {Component}
          </CustomTabPanel>
        );
      })}
    </Box>
  );
};
