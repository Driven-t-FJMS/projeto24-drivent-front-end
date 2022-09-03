import styled from "styled-components";

export const BoxHotel = styled.div`
  padding: 10px;
  width: 200px;
  height: 225px;
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({isActive}) => isActive ? 'rgb(254,239,210);' : 'rgba(0, 0, 0, 0.1);'}
`;

export const Image = styled.div`
  width: 100%;
  height: 45%;
  background-color: aqua;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
  }
`;

export const HotelDataSection = styled.div`
  width: 100%;
  height: 50%;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const HotelDataText = styled.p`
  ${({ infoType }) =>
    infoType === 'main-title'
      ? 'font-size: 20px; font-weight: bold;'
      : infoType === 'subtitle'
      ? 'font-size: 13px; font-weight: bold;'
      : 'font-size: 11px;'}
`;