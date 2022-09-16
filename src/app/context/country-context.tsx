import React, { createContext, useContext, useEffect, useState } from 'react'
import { CountryType, OwnProps, RegionEnum } from '../utils/types';
import { apiInstance } from '../api';


const CountryContext = createContext<CountryContextType>({
    countiresList: [], country: {}, isLoading: true, handleCountryListData() { },
    handleRegionFilter() { }, handleSearch() { }, setCountryData() { }, getCountryByName() { }, getCountryByCode() { }
});



export const CountryContextProvider: React.FC<OwnProps> = (props: OwnProps) => {

    const [countiresList, setCountriesList] = useState<CountryType[]>([])
    const [country, setCountry] = useState<CountryType>({})
    const [isLoading, setLoading] = useState<boolean>(true)

    const handleCountryListData = async () => {
        const response = await apiInstance.get('/all');
        if (response.data) {
            setLoading(false)
            setCountriesList(response.data)
        }
    }
    const setCountryData = (country: CountryType) => {
        setCountry(country)
    }
    const handleRegionFilter = async (value: any) => {
        setLoading(true)
        if (value === "All") {
            handleCountryListData()
            return
        } else {

            const response = await apiInstance.get(`/region/${value}`);
            if (response.data) {
                setLoading(false)
                setCountriesList(response.data)
            }
        }
    }
    const handleSearch = async (term: string) => {
        setLoading(true)
        if (term) {
            const response = await apiInstance.get(`/name/${term}`);
            if (response.data) {
                setLoading(false)
                setCountriesList(response.data)
            }
        } else if (!term) {
            handleCountryListData()
        }
    }
    const getCountryByName = async (name: string) => {
        const response = await apiInstance.get(`/name/${name}`);
        if (response.data) {

            setCountry(response.data[0])
        }
    }
    const getCountryByCode = async (code: string) => {
        const response = await apiInstance.get(`https://restcountries.com/v3.1/alpha/${code}`)
        if (response.data) {
            setCountry(response.data[0])
        }
    }

    const value: CountryContextType = {
        countiresList,
        handleCountryListData,
        country,
        handleRegionFilter,
        handleSearch,
        isLoading,
        setCountryData,
        getCountryByName,
        getCountryByCode

    }
    return <CountryContext.Provider value={value}>{props.children}</CountryContext.Provider>
}

export function useCountryContext() {
    return useContext(CountryContext)
}

interface CountryContextType {
    countiresList: CountryType[];
    country: CountryType;
    isLoading: boolean;
    handleCountryListData: () => void;
    handleRegionFilter: (value: any) => void;
    handleSearch: (value: any) => void;
    setCountryData: (value: CountryType) => void;
    getCountryByName: (value: any) => void;
    getCountryByCode: (value: any) => void;
}