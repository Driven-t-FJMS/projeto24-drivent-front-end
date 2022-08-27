import styled from 'styled-components';
import { StyledTypography, StyledBox, PaperTypography1, PaperTypography2 } from './ticketSelection';

function PaymentCompleted(props) {
  const { modality } = props;

  function verifyModality() {
    if(modality === 'presential') {
      return 'Presencial + Com Hotel';
    }
    return 'Online + Sem Hotel';
  }

  return (
    <>
      <StyledTypography>Ingresso escolhido</StyledTypography>
      <StyledBox>
        <TicketAndHotelSelected>
          <PaperTypography1>{verifyModality()}</PaperTypography1>
          <PaperTypography2>R$ 600</PaperTypography2>
        </TicketAndHotelSelected>
      </StyledBox>
      <PaymentArea>Pagamento</PaymentArea>
      <PaymentConfirmed>
        <Completed />
      </PaymentConfirmed>
    </>
  );
}
export default PaymentCompleted;

function Completed() {
  return (
    <>
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          fill="#36B853"
          d="M21.0002 0.833332C9.86266 0.833332 0.833496 9.8625 0.833496 21C0.833496 32.1375 9.86266 41.1667 21.0002 41.1667C32.1377 41.1667 41.1668 32.1375 41.1668 21C41.1668 9.8625 32.1377 0.833332 21.0002 0.833332ZM29.7415 17.59C29.9025 17.406 30.025 17.1917 30.1019 16.9596C30.1788 16.7276 30.2085 16.4825 30.1893 16.2388C30.1701 15.9951 30.1024 15.7577 29.9901 15.5406C29.8777 15.3234 29.7231 15.131 29.5353 14.9745C29.3475 14.818 29.1303 14.7006 28.8965 14.6293C28.6627 14.558 28.417 14.5341 28.1738 14.5592C27.9306 14.5842 27.6949 14.6577 27.4805 14.7752C27.2662 14.8927 27.0774 15.0518 26.9255 15.2433L19.0422 24.7015L14.963 20.6205C14.6172 20.2865 14.1541 20.1018 13.6734 20.1059C13.1927 20.1101 12.7329 20.3029 12.393 20.6428C12.0531 20.9827 11.8603 21.4426 11.8561 21.9233C11.8519 22.404 12.0367 22.8671 12.3707 23.2128L17.8707 28.7128C18.0508 28.8929 18.2665 29.0334 18.5039 29.1254C18.7414 29.2175 18.9954 29.2591 19.2498 29.2475C19.5042 29.236 19.7535 29.1715 19.9816 29.0583C20.2097 28.9451 20.4118 28.7856 20.5748 28.59L29.7415 17.59Z"
        />
      </svg>
      <div>
        <p className="confirmed">Pagamento confirmado!</p>
        <p>Prossiga para escolha de hospedagem e atividades</p>
      </div>
    </>
  );
}

const TicketAndHotelSelected = styled.div`
  width: 310px;
  height: 105px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #cecece;
  border-radius: 20px;
  background-color: #ffeed2;

  cursor: pointer;
`;

const PaymentArea = styled.p`
  font-size: 1rem;
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 0.00938em;
  color: #8e8e8e;
  margin-top: 30px;
`;

const PaymentConfirmed = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;

  div {
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #8e8e8e;

    .confirmed {
      color: #454545;
      font-weight: 700;
    }
  }
`;
