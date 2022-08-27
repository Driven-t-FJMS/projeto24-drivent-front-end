import { useState, useEffect } from 'react';

import { StyledTypography, StyledBox, SelectModalityDiv, PaperTypography1, PaperTypography2 } from './ticketSelection';

export default function HotelSelection(props) {
  const { setTicketInfo, ticketInfo } = props;
  const [selectedHotel, setSelectedHotel] = useState(false);
  const [selectedNoHotel, setNoHotel] = useState(false);

  function handleHotel() {
    setTicketInfo({
      ...ticketInfo,
      hotel: 'yes',
    });
    setSelectedHotel(true);
    setNoHotel(false);
  }

  function handleNoHotel() {
    setTicketInfo({
      ...ticketInfo,
      hotel: 'no',
    });
    setNoHotel(true);
    setSelectedHotel(false);
  }

  return (
    <>
      <StyledTypography>Ótimo! Agora escolha sua modalidade de hospedagem</StyledTypography>
      <StyledBox>
        <SelectModalityDiv onClick={handleNoHotel} $selectedticket={selectedNoHotel}>
          <PaperTypography1> Sem Hotel </PaperTypography1>
          <PaperTypography2> + R$ 0 </PaperTypography2>
        </SelectModalityDiv>
        <SelectModalityDiv onClick={handleHotel} $selectedticket={selectedHotel}>
          <PaperTypography1> Com Hotel </PaperTypography1>
          <PaperTypography2> + R$ 350 </PaperTypography2>
        </SelectModalityDiv>
      </StyledBox>
    </>
  );
}
