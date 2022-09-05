import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Loading from '../../../components/Loading';
import { getReservation } from '../../../services/accommodations';
import HotelChoice from './HotelChoice';
import Reservation from './Reservation';
import RoomChoice from './RoomChoice';
export default function Hotel() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ hasData: false });
  const [change, setChange] = useState(false);
  useEffect(() => {
    (async() => {
      try {
        const headers = { headers: { authorization: 'token' } };
        const reservation = await getReservation(headers);
        setData({ hasData: true, accommodation: reservation.data });
        setLoading(false);
        console.log(reservation.data);
      } catch(e) {
        setLoading(false);
        toast(e.message);
        console.log(e);
      }
    })();
  }, []);
  return (
    <>
	  {loading && <Loading />}
      {!loading && (
        <>
          <TitlePage>Escolha de hotel e quarto</TitlePage>
          {(!data.hasData && change) && (
            <>
              <HotelChoice />
              <RoomChoice />
            </>
          )}
          {(data.hasData && !change) && <Reservation data={data.accommodation} wantToChange={{ change, setChange }} />}
        </>
      )}
    </>
  );
}

const TitlePage = styled.p`
  font-size: 30px;
  font-weight: normal;
`;
