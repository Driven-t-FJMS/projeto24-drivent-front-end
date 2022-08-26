import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';

export default function TicketSelection(props) {
  const { setTicketInfo, ticketInfo } = props;
  const [selectedPresential, setSelectedPresential] = useState(false);
  const [selectedOnline, setSelectedOnline] = useState(false);

  function handlePresentialTicket() {
    setTicketInfo({
      ...ticketInfo,
      modality: 'presential',
    });
    setSelectedPresential(true);
    setSelectedOnline(false);
  }

  function handleOnlineTicket() {
    setTicketInfo({
      ...ticketInfo,
      modality: 'online',
    });
    setSelectedOnline(true);
    setSelectedPresential(false);
  }

  return (
    <>
      <StyledTypography>Primeiro, escolha sua modalidade de ingresso</StyledTypography>
      <StyledBox>
        <SelectModalityDiv onClick={handlePresentialTicket} $selectedticket={selectedPresential}>
          <PaperTypography1> Presencial </PaperTypography1>
          <PaperTypography2> R$ 250 </PaperTypography2>
        </SelectModalityDiv>
        <SelectModalityDiv onClick={handleOnlineTicket} $selectedticket={selectedOnline}>
          <PaperTypography1> Online </PaperTypography1>
          <PaperTypography2> R$ 100 </PaperTypography2>
        </SelectModalityDiv>
      </StyledBox>
    </>
  );
}

const StyledTypography = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
`;

const PaperTypography1 = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #454545;
`;

const PaperTypography2 = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  color: #898989;
`;

const StyledBox = styled(Box)`
  display: flex;
  margin-top: 17px;
`;

const SelectModalityDiv = styled.div`
  width: 145px;
  height: 145px;
  margin-right: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #cecece;
  border-radius: 20px;

  cursor: pointer;

  background-color: ${(props) => (props.$selectedticket ? '#FFEED2' : null)};
`;
