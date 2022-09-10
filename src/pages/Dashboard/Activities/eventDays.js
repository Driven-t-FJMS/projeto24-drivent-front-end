import { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { IoIosCloseCircleOutline, IoIosLogIn, IoIosCheckmarkCircleOutline } from 'react-icons/io';

import {
  StyledTypography,
  PaperTypography1
} from '../Payment/ticketSelection';
import activityApi from '../../../services/activityApi';
import useToken from '../../../hooks/useToken';

export default function EventDays(props) {
  const { setTicketInfo, ticketInfo } = props;
  const token = useToken();
  const [activities, setActivities] = useState([]);
  const [days, setDays] = useState([]);
  const [selectedDay, setSelectedDay] = useState('');
  const [filterByDay, setFilterByDay] = useState([]);
  const [userActivities, setUserActivities] = useState([]);
  const [reload, setReload] = useState(1);

  useEffect(() => {
    fetchData();
  }, [reload]);

  useEffect(() => {
    const filteredActivities = activities.filter((activity) => {
      return new Date(activity.date).toLocaleDateString('pt-BR') === selectedDay;
    });
    setFilterByDay(filteredActivities);
  }, [selectedDay]);

  async function fetchData() {
    const response = await activityApi.getActivities(token, ticketInfo.eventId);
    setActivities(response);

    const body = { enrollentId: ticketInfo.enrollementId, eventId: ticketInfo.eventId };
    const userActivitiesResponse = await activityApi.getUserActivities(token, body);
    
    setUserActivities(userActivitiesResponse);
  }

  async function selectDay(day) {
    setSelectedDay(day);
  }

  async function handleSubscribeActivity(activityId) {
    const body = { activityId: activityId, enrollementId: ticketInfo.enrollementId };
    const subscribe = await activityApi.registerToActivity(token, body);
    
    if (subscribe) setReload(reload + 1);
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
            <DaysButton variant="contained" onClick={() => selectDay(day)}>
              <strong>{day}</strong>
            </DaysButton>
          ))
          : null}
      </SelectDayDiv>
      {selectedDay ? (
        <Container>
          <Activities place={'Auditório Principal'} filteredActivities={filterByDay} userActivities={userActivities} asyncFunc={handleSubscribeActivity}/>
          <Activities place={'Auditório Lateral'} filteredActivities={filterByDay} userActivities={userActivities} asyncFunc={handleSubscribeActivity}/>
          <Activities place={'Sala de Workshop'} filteredActivities={filterByDay} userActivities={userActivities} asyncFunc={handleSubscribeActivity}/>
        </Container>
      ) 
        : null}
    </>
  );
}

function Activities(props) {
  const { place, filteredActivities, userActivities, asyncFunc } = props;

  const activities = filteredActivities.filter((activity) => {
    return activity.location === place;
  });
  
  return (
    <ActivitiesDiv>
      <StyledTypography>{place}</StyledTypography>
      <ActivitiesContainer>
        {activities.map((activity) => (
          <ActivityBox 
            key={activity.id}
            disabled={activity.vacancy <= 0 ? true : false}
            isDateSelected={userActivities.some(e => e.activityId === activity.id) ? true : false}
          >
            <BoxDiv>
              <PaperTypography1><strong>{activity.title}</strong></PaperTypography1>
              <PaperTypography1>{activity.startsAt}:00 - {activity.endsAt}:00</PaperTypography1>
            </BoxDiv>
            <SeparationDiv/>
            <BoxDiv2>
              {userActivities.some(e => e.activityId === activity.id) ? (
                <>
                  <IoIosCheckmarkCircleOutline size={30} color={'#66CC66'}/>
                  <h1>Inscrito</h1>
                </>
              ) : activity.vacancy <= 0 ? (
                <>
                  <IoIosCloseCircleOutline color='#CC6666' size={30}/>
                  <p>Esgotado</p>
                </>
              ) : (
                <>
                  <IoIosLogIn color='#66CC66' size={30} onClick={() => asyncFunc(activity.id)}/>
                  <h1>{activity.vacancy} vagas</h1>
                </>
              )}
            </BoxDiv2>
          </ActivityBox>
        ))}
      </ActivitiesContainer>
    </ActivitiesDiv>
  );
}

const DaysButton = styled(Button)`
  background-color: #e0e0e0;
`;

const SelectDayDiv = styled.div`
    display: flex;
    gap: 10px;
`;

const ActivitiesDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const ActivitiesContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 292px;
    height: 400px;
    border: 1px solid #d7d7d7;
`;

const ActivityBox = styled(Box)`
    display: flex;
    height: 79px;
    padding: 10px;
    margin: 7px;
    border-radius: 5px;
    background-color: ${({ isDateSelected }) => (isDateSelected ? '#D0FFDB' : '#f1f1f1')};
`;

const SeparationDiv = styled.div`
    width: 0px;
    height: 60px;
    border: 1px solid #CFCFCF;
    border: 1px solid #CFCFCF;
`;

const BoxDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 190px;
    align-items: flex-start;
`;

const BoxDiv2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 15px;

    p {
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 11px;
        color: #CC6666;
    }

    h1 {
        font-style: normal;
        font-weight: 400;
        font-size: 9px;
        line-height: 11px;
        color: #66CC66;
    }
`;
