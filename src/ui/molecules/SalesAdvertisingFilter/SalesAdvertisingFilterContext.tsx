import { createContext, PropsWithChildren, useContext, useState } from 'react';

export enum Filter {
  Sales = 'Sales',
  Advertising = 'Advertising',
}

const SalesAdvertisingFilterContext = createContext<{
  filter: Filter;
  setFilter: (filter: Filter) => void;
}>({
  filter: Filter.Sales,
  setFilter: () => {},
});

export const SalesAdvertisingFilterProvider = ({
  children,
}: PropsWithChildren) => {
  const [filter, setFilter] = useState<Filter>(Filter.Sales);

  return (
    <SalesAdvertisingFilterContext.Provider value={{ filter, setFilter }}>
      {children}
    </SalesAdvertisingFilterContext.Provider>
  );
};

export const useSalesAdvertisingFilterContext = () => useContext(SalesAdvertisingFilterContext)