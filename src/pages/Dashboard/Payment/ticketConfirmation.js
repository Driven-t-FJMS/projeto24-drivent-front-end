import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import useToken from '../../../hooks/useToken';
import { StyledTypography } from './ticketSelection';
import ticketApi from '../../../services/ticketApi';

export default function TicketConfirmation(props) {
  const token = useToken();
  const { ticketInfo, setTicketInfo } = props;

  async function handleConfirmation() {
    try {
      const ticket = {
        eventId: ticketInfo.eventId,
        enrollementId: ticketInfo.enrollementId,
        isPresential: ticketInfo.modality === 'presential',
        hasHotel: ticketInfo.hotel === 'yes',
      };
      await ticketApi.saveTicket(token, ticket);
      toast('Ingresso reservado com sucesso!');
      setTicketInfo({
        ...ticketInfo,
        complete: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <StyledTypography>
        Fechado! O total ficou em
        <strong>{`R$ ${ticketInfo.modality === 'online' ? 100 : ticketInfo.hotel === 'yes' ? 600 : 250}`}</strong>.
        Agora é só confirmar:
      </StyledTypography>
      <br />
      <ConfirmButton variant="contained" onClick={handleConfirmation}>
        <strong>RESERVAR INGRESSO</strong>
      </ConfirmButton>
    </>
  );
}

export const ConfirmButton = styled(Button)`
  background-color: #e0e0e0;
`;
