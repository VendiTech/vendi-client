'use client'

import { Suspense, useContext } from 'react';
import { ModalsContext } from './ModalsContext';

export const ModalsContainer = () => {
  const { modals } = useContext(ModalsContext)

  return (
    <Suspense>
      {modals.map(({ id, Component }) => (
        <Component key={id} />
      ))}
    </Suspense>
  )
}