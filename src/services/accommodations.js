import instance from './api';

export const getHotels = async() => {
  return await instance.get('/accommodations/hotels');
};

export const getRooms = async(hotelName) => {
  return await instance.get(`/accommodations/rooms/${hotelName}`);
};

export const createReservation = async(body, headers) => {
  return await instance.post('/accommodations/reservation', body, headers);
};

export const getReservation = async(headers) => {
  return await instance.get('/accommodations/reservation', headers);
};

export const changeAccommodation = async(body, headers) => {
  return await instance.put('/accommodations/reservation', body, headers);
};
