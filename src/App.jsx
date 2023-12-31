import React, { createContext, useState, useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import {router} from "./routes";
import {parseData} from "./pages/HomePage/utils";
import {getRequestsData} from "./utils/requests";

// Требования на конкретный state manager не было, поэтому вместо Redux используем простой контекст
export const DataContext = createContext(null);

const App = () => {
  const [parsedData, setParsedData] = useState(null);

  useEffect(() => {
    getRequestsData().then((res) => {
      console.error({res});
      setParsedData(parseData(res));
    }, () => {
      console.error('Ошибка загрузки данных');
    });
  }, []);

  return (
    <div>
      <DataContext.Provider value={parsedData}>
        <RouterProvider router={router} />
      </DataContext.Provider>
    </div>
  );
}

export default App;
