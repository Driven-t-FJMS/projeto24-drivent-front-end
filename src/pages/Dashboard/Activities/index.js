import { useEffect, useState } from 'react';

import { StyledTypography } from '../../../components/PersonalInformationForm/index';
import useToken from '../../../hooks/useToken';
import { getPersonalInformations } from '../../../services/enrollmentApi';
import { getEventInfo } from '../../../services/eventApi';
import ticketApi from '../../../services/ticketApi';
import { StyledBoxCompleteAccount, StyledTypographyCompleteAccount } from '../Payment/index';
import EventDays from './eventDays';

export default function Activities() {
  const token = useToken();
  const [ticketInfo, setTicketInfo] = useState({
    eventId: 0,
    enrollementId: 0,
    modality: '',
    complete: false,
    hotel: '',
    paid: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchTicketData();
  }, [ticketInfo.eventId]);

  async function fetchData() {
    const promiseUserInfo = await getPersonalInformations(token);
    const promiseEventInfo = await getEventInfo();

    setTicketInfo({ ...ticketInfo, eventId: promiseEventInfo.id, enrollementId: promiseUserInfo.id });
  }

  async function fetchTicketData() {
    const body = { eventId: ticketInfo.eventId, enrollementId: ticketInfo.enrollementId };

    if (body.enrollementId !== 0 && body.eventId !== 0) {
      const promiseTicketInfo = await ticketApi.getTicket(token, body);
      console.log(promiseTicketInfo.isPresential);
      if (promiseTicketInfo.id) {
        setTicketInfo({
          ...ticketInfo,
          modality: promiseTicketInfo.isPresential ? 'presential' : 'online',
          hotel: promiseTicketInfo.hasHotel ? 'yes' : 'no',
          complete: true,
          paid: promiseTicketInfo.isPaid ? true : false,
        });
      }
    }
  }

  return (
    <>
      <StyledTypography variant="h4">Escolha de atividades</StyledTypography>
      {!ticketInfo.paid ? (
        <StyledBoxCompleteAccount>
          <StyledTypographyCompleteAccount>
            Você precisa ter confirmado pagamento antes <br /> de fazer a escolha de hospedagem
          </StyledTypographyCompleteAccount>
        </StyledBoxCompleteAccount>
      ) : ticketInfo.modality === 'presential' ? (
        <EventDays ticketInfo={ticketInfo} setTicketInfo={setTicketInfo} />
      ) : (
        <StyledBoxCompleteAccount>
          <StyledTypographyCompleteAccount>
            Sua modalidade de ingresso não necessita escolher <br /> atividade. Você terá acesso a todas as atividades.
          </StyledTypographyCompleteAccount>
        </StyledBoxCompleteAccount>
      )}
    </>
  );
}
