import api from './api';

async function getActivities(token, id) {
  const response = await api.get(`/activity/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function registerToActivity(token, body) {
  const response = await api.post('/activity/register', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

async function getUserActivities(token, body) {
  const response = await api.post('/activity', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

const activityApi = {
  getActivities,
  registerToActivity,
  getUserActivities,
};

export default activityApi;
