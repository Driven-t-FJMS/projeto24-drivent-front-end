import {
  BoxOption,
  ButtonConfirmation,
  RowChoice,
  SectionRoomChoice,
  SingleChoice,
  SubtitleSection,
} from './styles';
import { IoIosPerson } from 'react-icons/io';
import HotelContext from '../../../../contexts/HotelContext';
import { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  createReservation,
  getRooms,
} from '../../../../services/accommodations';
export default function RoomChoice() {
  const { isHotelSelected } = useContext(HotelContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accommodation, setAccommodation] = useState({});
  const [disabled, setDisabled] = useState(true);
  const selectRoom = (room, indexVacancy) => {
    setAccommodation({ ...accommodation, room: room, indexVacancy });
    if (Object.keys(accommodation).length === 2) {
      setDisabled(false);
    }
    console.log(room);
  };
  const reservationRequest = async() => {
    try {
      const headers = { headers: { authorization: 'token' } };
      await createReservation(accommodation, headers);
	  localStorage.removeItem('selectedHotel');
    } catch (e) {
      toast(e.message);
      console.log(e);
    }
  };
  useEffect(() => {
    (async() => {
      try {
        const jsonHotel = localStorage.getItem('selectedHotel');
        const hotelData = JSON.parse(jsonHotel);
        const { data } = await getRooms(hotelData.name);
        setAccommodation({ hotel: hotelData });
        setData(data);
        setLoading(false);
        console.log(data, hotelData);
      } catch (e) {
        toast(e.message);
        console.log(e);
      }
    })();
  }, [isHotelSelected]);
  return (
    <SectionRoomChoice>
      {!loading && (
        <>
          <SubtitleSection>
            Ótima pedida! Agora escolha seu quarto
          </SubtitleSection>
          <RowChoice>
            {data.map((item, index) => (
              <SingleChoice key={index}>
                <BoxOption>{item.number}</BoxOption>
                {item.accommodationVacancy === 1 && (
                  <BoxOption>
                    <IoIosPerson
                      onClick={() => {
                        selectRoom(item, index + 1);
                      }}
                    />
                  </BoxOption>
                )}
                {item.accommodationVacancy === 2 && (
                  <BoxOption>
                    <IoIosPerson
                      onClick={() => {
                        selectRoom(item, index + 1);
                      }}
                    />
                    <IoIosPerson
                      onClick={() => {
                        selectRoom(item, index + 1);
                      }}
                    />
                  </BoxOption>
                )}
                {item.accommodationVacancy === 3 && (
                  <BoxOption>
                    <IoIosPerson
                      onClick={() => {
                        selectRoom(item, index + 1);
                      }}
                    />
                    <IoIosPerson
                      onClick={() => {
                        selectRoom(item, index + 1);
                      }}
                    />
                    <IoIosPerson
                      onClick={() => {
                        selectRoom(item, index + 1);
                      }}
                    />
                  </BoxOption>
                )}
              </SingleChoice>
            ))}
          </RowChoice>
        </>
      )}
      <ButtonConfirmation disabled={false} onClick={reservationRequest}>
        RESERVAR QUARTO
      </ButtonConfirmation>
    </SectionRoomChoice>
  );
}
