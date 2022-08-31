import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';
import { toast } from 'react-toastify';

import cardImage from '../../../assets/images/card.png';
import { ConfirmButton } from './ticketConfirmation';
import ticketApi from '../../../services/ticketApi';
import useToken from '../../../hooks/useToken';

export default function CardPayment(props) {
  const token = useToken();
  const { setTicketInfo, ticketInfo } = props;
  const [formsData, setFormsData] = useState({
    cardNumber: '',
    name: '',
    validThru: '',
    cvc: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    const valid = checkInput();
    if (!valid) return;
    toast('Pagamento realizado com sucesso!');

    const body = { eventId: ticketInfo.eventId, enrollementId: ticketInfo.enrollementId };
    ticketApi.payTicket(token, body);

    setTicketInfo({
      ...ticketInfo,
      finish: true,
    });
  }

  function checkInput() {
    if (
      formsData.cardNumber.length === 16 &&
      formsData.name.length > 0 &&
      formsData.validThru.length === 5 &&
      formsData.cvc.length === 3 &&
      //check if name has only letters
      formsData.name.match(/^[a-zA-Z ]+$/) &&
      //check if validThru is in the format MM/YY
      formsData.validThru.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/) &&
      //check if cardNumber is only numbers
      formsData.cardNumber.match(/^[0-9]+$/) &&
      //check if cvc is only numbers
      formsData.cvc.match(/^[0-9]+$/)
    ) {
      return true;
    }
    toast('Preencha todos os campos corretamente');
    return false;
  }

  function handleInputChange(event) {
    setFormsData({ ...formsData, [event.target.name]: event.target.value });
  }

  return (
    <>
      <CardDiv>
        <img src={cardImage} alt="credit card" />
        <Forms onSubmit={handleSubmit}>
          <TextField
            name="cardNumber"
            label="Card Number"
            variant="outlined"
            helperText="E.g.: 49...,51...,36...,37..."
            onChange={handleInputChange}
            type="text"
            required
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]{16}' }}
          />
          <TextField name="name" label="Name" variant="outlined" onChange={handleInputChange} type="text" />
          <BottomCardDiv>
            <TextField
              name="validThru"
              label="Valid Thru"
              variant="outlined"
              onChange={handleInputChange}
              type="text"
              helperText="MM/YY"
              required
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]{4}' }}
            />
            <TextField
              name="cvc"
              label="CVC"
              variant="outlined"
              onChange={handleInputChange}
              type="text"
              required
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]{3}' }}
            />
          </BottomCardDiv>
        </Forms>
      </CardDiv>
      <ConfirmButton variant="contained" onClick={handleSubmit}>
        <strong>FINALIZAR PAGAMENTO</strong>
      </ConfirmButton>
    </>
  );
}

const CardDiv = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  img {
    width: 320px;
    padding-right: 20px;
  }
`;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 10px;
`;

const BottomCardDiv = styled.div`
  display: flex;
  gap: 10px;
`;
