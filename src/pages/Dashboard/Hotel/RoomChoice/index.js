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
  changeAccommodation,
  createReservation,
  getRooms,
} from '../../../../services/accommodations';
import { useNavigate } from 'react-router-dom';
export default function RoomChoice() {
  const { isHotelSelected } = useContext(HotelContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [accommodation, setAccommodation] = useState({});
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const selectRoom = (room, indexVacancy, element) => {
    element.classList.add('selected-room-option');
    /*element.parentElement.parentElement.classList.add(
      'selected-option'
    );*/
    const reservation = { ...accommodation, room: room, indexVacancy };
    setAccommodation(reservation);
    if (Object.keys(reservation).length === 3) {
      setDisabled(false);
    }
  };
  const reservationRequest = async() => {
    try {
      const modification = localStorage.getItem('modification');
      const headers = { headers: { authorization: 'token' } };
      if (modification) {
        const { reservationId } = JSON.parse(modification);
        await changeAccommodation({ ...accommodation, reservationId }, headers);
      } else {
        await createReservation(accommodation, headers);
      }
      localStorage.removeItem('selectedHotel');
      localStorage.removeItem('modification');
      navigate('/dashboard/reserved');
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
        if (jsonHotel) {
          const { data } = await getRooms(hotelData.name);
          console.log(hotelData, data);
          setAccommodation({ hotel: hotelData });
          setData(data);
          setLoading(false);
        }
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
                      onClick={({ target }) => {
                        selectRoom(item, index + 1, target);
                      }}
                    />
                  </BoxOption>
                )}
                {item.accommodationVacancy === 2 && (
                  <BoxOption>
                    <IoIosPerson
                      onClick={({ target }) => {
                        selectRoom(item, index + 1, target);
                      }}
                    />
                    <IoIosPerson
                      onClick={({ target }) => {
                        selectRoom(item, index + 1, target);
                      }}
                    />
                  </BoxOption>
                )}
                {item.accommodationVacancy === 3 && (
                  <BoxOption>
                    <IoIosPerson
                      onClick={({ target }) => {
                        selectRoom(item, index + 1, target);
                      }}
                    />
                    <IoIosPerson
                      onClick={({ target }) => {
                        selectRoom(item, index + 1, target);
                      }}
                    />
                    <IoIosPerson
                      onClick={({ target }) => {
                        selectRoom(item, index + 1, target);
                      }}
                    />
                  </BoxOption>
                )}
              </SingleChoice>
            ))}
          </RowChoice>
          <ButtonConfirmation disabled={disabled} onClick={reservationRequest}>
            RESERVAR QUARTO
          </ButtonConfirmation>
        </>
      )}
    </SectionRoomChoice>
  );
}
