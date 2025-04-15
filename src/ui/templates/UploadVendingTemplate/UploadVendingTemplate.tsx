import { useSalesImport, useImpressionsImport } from '@/lib/api';
import { Flexbox } from '@/ui/atoms/Flexbox';
import { XlsxUploader } from '@/ui/molecules/XlsxUploader';

export const UploadVendingTemplate = () => {
  const { mutateAsync: importSales, isPending: isImportSalesPending } = useSalesImport();
  const { mutateAsync: importImpressions, isPending: isImportImpressionsPending } = useImpressionsImport();

  const handleNayaxUpload = async (file: File) => {
    await importSales(file);
  };
  const handleDataJamUpload = async (file: File) => {
    await importImpressions(file);
  };

  return (
    <Flexbox>
      <XlsxUploader
        sourceSystemName={'Nayax'}
        uploadFile={handleNayaxUpload}
        isFileLoading={isImportSalesPending}
        requiredColumns={[
          'Site ID',
          'Transaction ID',
          'Payment Method ID',
          'Currency',
          'Machine Name',
          'Quantity',
          'Cost Price',
          'Product Name',
          'NET Price',
          'Settlement Date and Time (GMT)',
          'Settlement Value (Vend Price)',
          'Machine Location',
          'Product Group',
          'Product Selection Info',
          'Card Number',
        ]}
        headersRow={2}
      />
      <XlsxUploader
        sourceSystemName={'DataJam'}
        uploadFile={handleDataJamUpload}
        isFileLoading={isImportImpressionsPending}
        requiredColumns={[
          'Device',
          'Date',
          'Day',
          'Field',
          'Location',
          'Frame ID',
          'Temp( °C )',
          'Rain ( in mm)',
          'Total',
          '00:00',
          '01:00',
          '02:00',
          '03:00',
          '04:00',
          '05:00',
          '06:00',
          '07:00',
          '08:00',
          '09:00',
          '10:00',
          '11:00',
          '12:00',
          '13:00',
          '14:00',
          '15:00',
          '16:00',
          '17:00',
          '18:00',
          '19:00',
          '20:00',
          '21:00',
          '22:00',
          '23:00',
        ]}
      />
    </Flexbox>
  );
};
