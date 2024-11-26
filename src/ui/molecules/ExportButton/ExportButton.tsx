import ExportIcon from '@/assets/icons/Export.svg';
import { ExportTypeEnum } from '@/lib/generated/api';
import { MenuButton } from '@/ui/molecules/MenuButton';

type Props = {
  onExport: (exportType: ExportTypeEnum) => Promise<unknown>;
};

export const ExportButton = ({ onExport }: Props) => {
  return (
    <MenuButton
      variant={'outlined'}
      size={'small'}
      endIcon={null}
      startIcon={<ExportIcon />}
      actions={[
        {
          name: ExportTypeEnum.Csv,
          fn: () => onExport(ExportTypeEnum.Csv),
        },
        {
          name: ExportTypeEnum.Excel,
          fn: () => onExport(ExportTypeEnum.Excel),
        },
      ]}>
      Export data
    </MenuButton>
  );
};
