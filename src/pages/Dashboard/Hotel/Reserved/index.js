import styled from 'styled-components';
import {
  SectionHotelChoice,
  RowHotels,
  SubtitleSection,
  WrapperRowHotels,
} from '../HotelChoice/styles';
import {
  BoxHotel,
  Image,
  HotelDataSection,
  HotelDataText,
} from '../SingleHotelOption/styles';
import { ButtonConfirmation } from '../RoomChoice/styles';
import { useState, useEffect } from 'react';
import Loading from '../../../../components/Loading';
import { getReservation } from '../../../../services/accommodations';
import { useNavigate } from 'react-router-dom';
export default function Reserved() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const modificateAccommodation = () => {
    localStorage.setItem('wantToModificate', 'yes');
    navigate('/dashboard/hotel');
  };
  useEffect(() => {
    (async() => {
      try {
        const headers = { headers: { authorization: 'token' } };
        const { data } = await getReservation(headers);
        setData(data);
        setLoading(false);
        console.log(data);
      } catch (e) {
        console.log(e.message);
        navigate('/dashboard/hotel');
      }
    })();
  }, []);
  return (
    <>
      <TitlePage>Escolha de hotel e quarto</TitlePage>
      <SectionHotelChoice>
        <SubtitleSection>Você já escolheu seu quarto:</SubtitleSection>
        {loading && <Loading />}
        {!loading && (
          <>
            <WrapperRowHotels>
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
                      {/* modificar */}
                    </div>
                  </HotelDataSection>
                </BoxHotel>
              </RowHotels>
            </WrapperRowHotels>
            <ButtonConfirmation onClick={modificateAccommodation}>
              TROCAR DE QUARTO
            </ButtonConfirmation>
          </>
        )}
      </SectionHotelChoice>
    </>
  );
}

const TitlePage = styled.p`
  font-size: 30px;
  font-weight: normal;
`;
