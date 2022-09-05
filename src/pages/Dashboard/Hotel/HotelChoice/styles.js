import styled from 'styled-components';

export const SectionHotelChoice = styled.section`
  margin: 40px auto;
  position: relative;
`;

export const SubtitleSection = styled.p`
  font-size: 19px;
  color: rgba(0, 0, 0, 0.7);
`;

export const WrapperRowHotels = styled.div`
  ${({ numItems }) => (numItems > 4 ? 'overflow-x: scroll;' : '')}
`;

export const RowHotels = styled.div`
  display: flex;
  padding-top: 20px;
  /*justify-content: space-between;*/
`;
