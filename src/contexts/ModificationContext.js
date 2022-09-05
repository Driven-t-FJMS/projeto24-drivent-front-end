import { createContext, useState } from 'react';

const ModificationContext = createContext();
export default ModificationContext;

export function ModificationProvider({ children }) {
  const [modificate, setModificate] = useState(false);
  return (
    <ModificationContext.Provider value={{ modificate, setModificate }}>
      {children}
    </ModificationContext.Provider>
  );
}
