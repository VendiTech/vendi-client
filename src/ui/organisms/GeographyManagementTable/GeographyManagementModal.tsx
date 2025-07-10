import { createModalHook } from '@/lib/services/Modals';
import { BaseModal, ModalProps } from '@/ui/molecules/BaseModal';
import { Map } from '@/ui/molecules/MapChart/ui/Map';
import { RegionData } from '@/ui/molecules/MapChart/types';

type Props = {
  onConfirm: (mapLocationId: string) => void;
  selectedRegion?: RegionData
} & Omit<ModalProps, 'onConfirm'>;

const GeographyManagementModal = ({ onConfirm, onClose, selectedRegion }: Props) => {
  return (
    <BaseModal
      title={'Create location mapping'}
      actionButtons={<></>}
      wrapperProps={{}}
      onClose={onClose}>
      <Map regionsData={[]} onSelect={onConfirm} initialZoom={2.5} selectedRegion={selectedRegion}/>
    </BaseModal>
  );
};

export const useGeographyManagementModal = createModalHook<Props>((props) => (
  <GeographyManagementModal {...props} />
));
