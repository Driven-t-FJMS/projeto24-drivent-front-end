import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import {
  StyledTypography,
  StyledBox,
  SelectModalityDiv,
  PaperTypography1,
  PaperTypography2,
} from '../Payment/ticketSelection';
import activityApi from '../../../services/activityApi';
import useToken from '../../../hooks/useToken';

export default function EventDays(props) {
  const { setTicketInfo, ticketInfo } = props;
  const token = useToken();
  const [activities, setActivities] = useState([]);
  const [days, setDays] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await activityApi.getActivities(token, ticketInfo.eventId);
    setActivities(response);
  }

  if (activities) {
    activities.map((activity) => {
      const date = new Date(activity.date).toLocaleDateString('pt-BR');
      if (!days.includes(date)) {
        setDays([date, ...days]);
      }
    });
  }
  
  return (
    <>
      <StyledTypography>Primeiro, filtre pelo dia do evento:</StyledTypography>
      <SelectDayDiv>
        {days
          ? days.map((day) => (
            <DaysButton variant="contained">
              <strong>{day}</strong>
            </DaysButton>
          ))
          : null}
      </SelectDayDiv>
    </>
  );
}

const DaysButton = styled(Button)`
  background-color: #e0e0e0;
`;

const SelectDayDiv = styled.div`
    display: flex;
    gap: 10px;
`;
