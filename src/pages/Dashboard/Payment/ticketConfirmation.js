import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';

import useToken from '../../../hooks/useToken';
import { StyledTypography } from './ticketSelection';

export default function TicketConfirmation(props) {
  const { ticketInfo, setTicketInfo } = props;

  function handleConfirmation() {
    setTicketInfo({
      ...ticketInfo,
      complete: true,
    });
  }

  return (
    <>
      <StyledTypography>
        Fechado! O total ficou em{' '}
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
