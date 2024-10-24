'use client'

import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import { ModalsContainer } from './ModalsContainer';
import type { Modal, ModalsService } from '../types';

export const ModalsContext = createContext<ModalsService>({
  modals: [],
  closeModal: () => {},
  openModal: () => {},
});

export const ModalsProvider = ({ children }: PropsWithChildren) => {
  const [modals, setModals] = useState<Modal[]>([]);

  const openModal = useCallback((id: string, Component: FC) => {
    setModals((prevModals) => [...prevModals, { id, Component }]);
  }, []);

  const closeModal = useCallback((id: string) => {
    setModals((prevModals) => prevModals.filter((modal) => modal.id !== id));
  }, []);

  return (
    <ModalsContext.Provider value={{ modals, openModal, closeModal }}>
      {children}
      
      <ModalsContainer />
    </ModalsContext.Provider>
  );
};
