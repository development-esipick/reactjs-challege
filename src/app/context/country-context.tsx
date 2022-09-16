import React, { createContext, useContext, useEffect, useState } from 'react'
import { CountryType, OwnProps, RegionEnum } from '../utils/types';
import { apiInstance } from '../api';
import { AxiosError } from 'axios';


const CountryContext = createContext<CountryContextType>({
    countiresList: [], country: {}, isLoading: true, error: '', handleCountryListData() { },
    handleRegionFilter() { }, handleSearch() { }, clearCountryList() { }, getCountryByName() { }, getCountryByCode() { }
});



export const CountryContextProvider: React.FC<OwnProps> = (props: OwnProps) => {

    const [countiresList, setCountriesList] = useState<CountryType[]>([])
    const [country, setCountry] = useState<CountryType>({})
    const [isLoading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    const handleCountryListData = async () => {
        const response = await apiInstance.get('/all');
        if (response.data) {
            setLoading(false)
            setCountriesList(response.data)
        }
    }
    const clearCountryList = () => {
        setCountriesList([])
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
            try {
                const response = await apiInstance.get(`/name/${term}`);
                console.log(response)
                setLoading(false)
                setCountriesList(response.data)
            } catch (error) {
                const err = error as AxiosError
                if (err.response?.status == 404) {
                    setError(err.response?.statusText + '! ' + 'No Country Found with this Name')
                    setLoading(false)
                }
                setTimeout(() => {
                    setError('')
                }, 3000)
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
        clearCountryList,
        getCountryByName,
        getCountryByCode,
        error

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
    error: string;
    handleCountryListData: () => void;
    handleRegionFilter: (value: any) => void;
    handleSearch: (value: any) => void;
    clearCountryList: () => void;
    getCountryByName: (value: any) => void;
    getCountryByCode: (value: any) => void;
}