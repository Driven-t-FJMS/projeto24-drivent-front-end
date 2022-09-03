import { useState } from 'react';
import { useEffect } from 'react';
import { BoxHotel, Image, HotelDataSection, HotelDataText } from './styles';
export default function SingleHotelOption({ hotelData, isActive }) {
  return (
    <BoxHotel isActive={isActive}>
      <Image></Image>
      <HotelDataSection>
        <div>
          <HotelDataText infoType="main-title">hotel lá</HotelDataText>
        </div>
        <div>
          <HotelDataText infoType="subtitle">tipos de acomodação:</HotelDataText>
          <HotelDataText infoType="accommodation">tal e tal</HotelDataText>
        </div>
        <div>
          <HotelDataText infoType="subtitle">vagas disponíveis:</HotelDataText>
          <HotelDataText infoType="num-vacancy">tal e tal</HotelDataText>
        </div>
      </HotelDataSection>
    </BoxHotel>
  );
}
