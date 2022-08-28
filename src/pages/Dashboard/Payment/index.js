import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react';

import { StyledTypography } from '../../../components/PersonalInformationForm/index';
import useToken from '../../../hooks/useToken';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import TicketSelection from './ticketSelection';
import HotelSelection from './hotelSelection';
import TicketConfirmation from './ticketConfirmation';
import PaymentCompleted from './paymentComplete';

export default function Payment() {
  const token = useToken();
  const [personalInformations, setPersonalInformations] = useState([]);
  const [accountComplete, setAccountComplete] = useState(false);
  const [ticketInfo, setTicketInfo] = useState({
    modality: '',
    hotel: '',
    complete: false,
    finish: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const promiseUserInfo = await getPersonalInformations(token);
    console.log(promiseUserInfo);
    if (promiseUserInfo) setAccountComplete(true);
  }
  console.log(ticketInfo);
  return (
    <>
      <StyledTypography variant="h4">Ingresso e pagamento</StyledTypography>

      {!ticketInfo.complete ? (
        <>
          {!accountComplete ? (
            <>
              <StyledBoxCompleteAccount>
                <StyledTypographyCompleteAccount>
                  Você precisa completar sua inscrição antes <br /> de prosseguir pra escolha de ingresso
                </StyledTypographyCompleteAccount>
              </StyledBoxCompleteAccount>
            </>
          ) : (
            <TicketSelection setTicketInfo={setTicketInfo} ticketInfo={ticketInfo} />
          )}
          {ticketInfo.modality === 'presential' ? (
            <HotelSelection setTicketInfo={setTicketInfo} ticketInfo={ticketInfo} />
          ) : null}
          {ticketInfo.modality === 'online' || ticketInfo.hotel === 'yes' || ticketInfo.hotel === 'no' ? (
            <TicketConfirmation setTicketInfo={setTicketInfo} ticketInfo={ticketInfo} />
          ) : null}
        </>
      ) : (
        <PaymentCompleted setTicketInfo={setTicketInfo} ticketInfo={ticketInfo} />
      )}
    </>
  );
}

const StyledBoxCompleteAccount = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
`;

const StyledTypographyCompleteAccount = styled(Typography)`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #8e8e8e;
`;
