import React, { useEffect } from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";

import AppLayout from './app/Layout/index';
import CountriesListPage from './app/Pages/CountryList';
import CountryDetailPage from './app/Pages/Country'

import { useCountryContext } from './app/context/country-context'

function App() {
  const { handleCountryListData } = useCountryContext();

  useEffect(() => {
    handleCountryListData?.()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              <CountriesListPage />
            </AppLayout>
          }
        ></Route>
        <Route
          path="/country-detail"
          element={
            <AppLayout>
              <CountryDetailPage />
            </AppLayout>
          }
        ></Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>

    </div>
  );
}

export default App;
