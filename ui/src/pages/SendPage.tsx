import React from 'react'; 
import { SendPopupContent } from '../components/SendPopupContent/SendPopupContent';
import {useLocation, useNavigate} from 'react-router-dom'

export const SendPage: React.FC = () => {
  const nav = useNavigate();
  return (
    <SendPopupContent handleClose={() => nav(-1)}/>
  )
}