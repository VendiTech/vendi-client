import { FC } from 'react'

export type Modal = {
  id: string
  Component: FC
}

export type ModalsService = {
  modals: Modal[]
  openModal: (id: string, Component: FC) => void
  closeModal: (id: string) => void
}