import {
  SectionHotelChoice,
  RowHotels,
  SubtitleSection,
  WrapperRowHotels
} from './styles';
import { useState, useEffect } from 'react';
import SingleHotelOption from '../SingleHotelOption';
import { Fragment } from 'react';
export default function HotelChoice() {
  const [selected, setSelected] = useState();
  const products = [1, 2, 3, 4];
  return (
    <SectionHotelChoice>
      <SubtitleSection>Primeiro, escolha seu hotel</SubtitleSection>
      <WrapperRowHotels numItems={products.length}>
        <RowHotels>
          {products.map((item, index) => (
              <SingleHotelOption hotelData={item} isActive={selected} />
          ))}
        </RowHotels>
      </WrapperRowHotels>
    </SectionHotelChoice>
  );
}
