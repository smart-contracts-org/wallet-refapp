import React from 'react'; 
import { SendPopupContent } from '../components/SendPopupContent/SendPopupContent';
import { useNavigate} from 'react-router-dom'

export const SendPage: React.FC = () => {
  const nav = useNavigate();
  return (
    <SendPopupContent ticker={''} handleClose={() => nav(-1)}/>
  )
}