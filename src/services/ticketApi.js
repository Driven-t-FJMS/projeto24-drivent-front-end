import api from './api';

async function saveTicket(token, ticket) {
  const response = await api.post('/ticket', ticket, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function getTicket(token, body) {
  const response = await api.patch('/ticket/', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
}

async function payTicket(token, eventId, enrollementId) {
  const response = await api.put(
    '/ticket/',
    { enrollementId, eventId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
}

const ticketApi = {
  saveTicket,
  getTicket,
  payTicket,
};

export default ticketApi;
