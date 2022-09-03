import { Fragment } from 'react';
import styled from 'styled-components';
import HotelChoice from './HotelChoice';
import RoomChoice from './RoomChoice';
export default function Hotel() {
  return (
    <Fragment>
      <TitlePage>Escolha de hotel e quarto</TitlePage>
      <HotelChoice />
      <RoomChoice />
    </Fragment>
  );
}

const TitlePage = styled.p`
  font-size: 30px;
  font-weight: normal;
`;
