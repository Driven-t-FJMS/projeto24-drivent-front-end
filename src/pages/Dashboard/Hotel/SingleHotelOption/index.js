import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { BoxHotel, Image, HotelDataSection, HotelDataText } from './styles';
import HotelContext from '../../../../contexts/HotelContext';
export default function SingleHotelOption({
  hotelData,
  isActive,
  setIsActive,
}) {
  const { isHotelSelected, setHotelSelected } = useContext(HotelContext);
  const selectOption = (e) => {
    const { id, name, accommodationType, vacancy } = hotelData;
    try {
      localStorage.setItem(
        'selectedHotel',
        JSON.stringify({ name, accommodationType, vacancy })
      );
	  setHotelSelected(true);
    } catch (e) {
      toast(e.message);
      console.log(e);
    }
  };
  return (
    <BoxHotel isActive={isActive} onClick={selectOption}>
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
