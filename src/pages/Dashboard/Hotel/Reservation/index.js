import { toast } from 'react-toastify';
import {
  SectionHotelChoice,
  RowHotels,
  SubtitleSection,
  WrapperRowHotels
} from '../HotelChoice/styles';
import {
  BoxHotel,
  Image,
  HotelDataSection,
  HotelDataText
} from '../SingleHotelOption/styles';
import { ButtonConfirmation } from '../RoomChoice/styles';
export default function Reservation({ data, wantToChange }) {
  return (
    <SectionHotelChoice>
      <SubtitleSection>Você já escolheu seu quarto:</SubtitleSection>
      <WrapperRowHotels numItems={data.length}>
        <RowHotels>
          <BoxHotel>
            <Image>
              <img src={data.hotel.image} alt='Imagem não carregada' />
            </Image>
            <HotelDataSection>
              <div>
                <HotelDataText infoType='main-title'>
                  {data.hotel.name}
                </HotelDataText>
              </div>
              <div>
                <HotelDataText infoType='subtitle'>
                  Quarto reservado
                </HotelDataText>
                <HotelDataText infoType='accommodation'>
                  {data.room.number}
                </HotelDataText>
              </div>
              <div>
                <HotelDataText infoType='subtitle'>
                  Pessoas no seu quarto:
                </HotelDataText>
                <HotelDataText infoType='num-vacancy'>Você</HotelDataText>
              </div>
            </HotelDataSection>
          </BoxHotel>
        </RowHotels>
      </WrapperRowHotels>
      <ButtonConfirmation onClick={() => wantToChange.setChange(true) }>
        TROCAR DE QUARTO
      </ButtonConfirmation>
    </SectionHotelChoice>
  );
}
