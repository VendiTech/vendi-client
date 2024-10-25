import { Box, Tab, Tabs } from '@mui/material';
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
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            {tabLabels?.map((label, index) => {
              return <Tab label={label} key={index} {...a11yProps(index)} />;
            })}
          </Tabs>
        </Box>
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
