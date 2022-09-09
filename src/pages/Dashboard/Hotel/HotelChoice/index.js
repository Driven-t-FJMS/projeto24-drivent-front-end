import {
  SectionHotelChoice,
  RowHotels,
  SubtitleSection,
  WrapperRowHotels,
} from './styles';
import { useState, useEffect, Fragment } from 'react';
import SingleHotelOption from '../SingleHotelOption';
import { toast } from 'react-toastify';
import { getHotels } from '../../../../services/accommodations';
import Loading from '../../../../components/Loading';

export default function HotelChoice() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async() => {
      try {
        const { data } = await getHotels();
        setData(data);
        setLoading(false);
      } catch (e) {
        toast(e.message);
        console.log(e);
      }
    })();
  }, []);
  return (
    <SectionHotelChoice>
      <SubtitleSection>Primeiro, escolha seu hotel</SubtitleSection>
      {loading && <Loading />}
      {!loading && (
        <WrapperRowHotels numItems={data.length}>
          <RowHotels>
            <Fragment>
              {data.map((item, index) => (
                <SingleHotelOption
                  key={index}
                  hotelData={item}
                />
              ))}
            </Fragment>
          </RowHotels>
        </WrapperRowHotels>
      )}
    </SectionHotelChoice>
  );
}
