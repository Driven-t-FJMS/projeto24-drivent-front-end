import { createContext, useState } from 'react';

const HotelContext = createContext();
export default HotelContext;

export function HotelProvider({ children }) {
  const [isHotelSelected, setHotelSelected] = useState(false);
  return (
    <HotelContext.Provider value={{ isHotelSelected, setHotelSelected }}>
      {children}
    </HotelContext.Provider>
  );
}
