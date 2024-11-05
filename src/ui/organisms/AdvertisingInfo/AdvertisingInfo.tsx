import { NordicTotalImpressions } from './charts/NordicTotalImpressions';
import { SecondsOfExposure } from './charts/SecondsOfExposure';
import { TotalAdvertPlayouts } from './charts/TotalAdvertPlayouts';

export const AdvertisingInfo = () => {
  return (
    <>
      <SecondsOfExposure />

      <NordicTotalImpressions />

      <TotalAdvertPlayouts />
    </>
  );
};
