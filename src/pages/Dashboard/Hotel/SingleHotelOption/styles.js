import styled from 'styled-components';

export const BoxHotel = styled.div`
  position: relative;
  padding: 10px;
  width: 200px;
  height: 225px;
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

export const Image = styled.div`
  width: 100%;
  height: 45%;
  background-color: transparent;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
	border-radius: 10px;
  }
`;

export const HotelDataSection = styled.div`
  width: 100%;
  height: 50%;
  background-color: transparent;
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
