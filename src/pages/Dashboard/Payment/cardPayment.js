import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import { useState } from 'react';

import cardImage from '../../../assets/images/card.png';
import { ConfirmButton } from './ticketConfirmation';

export default function CardPayment(props) {
  const { setTicketInfo, ticketInfo } = props;
  const [formsData, setFormsData] = useState({
    cardNumber: '',
    name: '',
    validThru: '',
    cvc: '',
  });

  function handleSubmit() {
    //TODO: Confirmar pagamento
    setTicketInfo({
      ...ticketInfo,
      finish: true,
    });
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
              inputProps={{ inputMode: 'numeric', pattern: '[0-9]{4}' }}
            />
            <TextField
              name="cvc"
              label="CVC"
              variant="outlined"
              onChange={handleInputChange}
              type="text"
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
`;
