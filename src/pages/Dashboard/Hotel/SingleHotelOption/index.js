import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  BoxHotel,
  Image,
  HotelDataSection,
  HotelDataText,
  Wrapper,
} from './styles';
import HotelContext from '../../../../contexts/HotelContext';
export default function SingleHotelOption({ hotelData }) {
  const { isHotelSelected, setHotelSelected } = useContext(HotelContext);
  const selectOption = (e) => {
    try {
      //e.target.parentElement.classList.add('selected-option');
      localStorage.removeItem('selectedHotel');
      localStorage.setItem('selectedHotel', JSON.stringify(hotelData));
      if (isHotelSelected) {
        setHotelSelected(false);
        setHotelSelected(true);
      } else {
        setHotelSelected(true);
      }
    } catch (e) {
      toast(e.message);
      console.log(e);
    }
  };
  return (
    <BoxHotel className='default-hotel-option'>
      <Wrapper onClick={selectOption}></Wrapper>
      <Image>
        <img src={hotelData.image} alt='Imagem não carregada' />
      </Image>
      <HotelDataSection>
        <div>
          <HotelDataText infoType='main-title'>{hotelData.name}</HotelDataText>
        </div>
        <div>
          <HotelDataText infoType='subtitle'>
            tipos de acomodação:
          </HotelDataText>
          <HotelDataText infoType='accommodation'>
            {hotelData.accommodationType}
          </HotelDataText>
        </div>
        <div>
          <HotelDataText infoType='subtitle'>vagas disponíveis:</HotelDataText>
          <HotelDataText infoType='num-vacancy'>
            {hotelData.vacancy}
          </HotelDataText>
        </div>
      </HotelDataSection>
    </BoxHotel>
  );
}
