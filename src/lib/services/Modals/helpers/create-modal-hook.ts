'use client'

import { FC, useCallback, useContext, useRef } from 'react';
import { ModalsContext } from '../ui/ModalsContext'

export const createModalHook =
  <T>(Component: FC<T>) =>
    () => {
      const {openModal, closeModal} = useContext(ModalsContext)
  
      const idRef = useRef<string>()

      const closeDialog = useCallback(() => {
        if (!idRef.current) return

        closeModal(idRef.current)
      }, [closeModal])

      const openDialog = useCallback(
        (props?: Omit<T, 'onClose'>) => {
          idRef.current = Date.now().toString()

          openModal(idRef.current, () => Component({ ...props, onClose: closeDialog } as T))
        },
        [closeDialog, openModal]
      )

      return [openDialog, closeDialog]
    }