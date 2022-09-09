import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loading from '../../../components/Loading';
import HotelChoice from './HotelChoice';
import RoomChoice from './RoomChoice';
export default function Hotel() {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const wantToModificate = localStorage.getItem('wantToModificate');
      if (wantToModificate === 'yes' || !wantToModificate) {
        navigate('/dashboard/hotel');
      } else {
        navigate('/dashboard/reserved');
      }
    } catch (e) {
      toast(e.message);
      console.log(e);
    }
  }, []);
  return (
    <>
      <TitlePage>Escolha de hotel e quarto</TitlePage>
      <HotelChoice />
      <RoomChoice />
    </>
  );
}

const TitlePage = styled.p`
  font-size: 30px;
  font-weight: normal;
`;
