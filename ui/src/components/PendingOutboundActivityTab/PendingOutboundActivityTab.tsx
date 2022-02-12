import React from 'react'; 
import { PendingSendRow } from '../PendingSendRow/PendingSendRow';

export const PendingOutboundActivityTab: React.FC = () => {
  return (
    <>
    <PendingSendRow isInbound={false}  sender='User-1000101-010100' ticker={'BTOKEN'} quantity={1000} />
    <PendingSendRow  isInbound={false} sender='User-Alex-43324' ticker={'ALEX'} quantity={25000} />
    </>
  )
}