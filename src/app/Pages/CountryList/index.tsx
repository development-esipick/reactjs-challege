import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useCountryContext } from '../../context/country-context'
import FormHelperText from '@mui/material/FormHelperText';

import CountryCard from './countryCard'
import CircularProgress from '@mui/material/CircularProgress';
// import ScrollTop from '../../Components/ScrollToTop';
import FilterByRegion from '../../Components/Filter'


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    boxShadow: `0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);`

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '40ch',

        },
    },
}));
const CountriesListPage = () => {
    const [searchTerm, setSearchTerm] = useState('')

    const { countiresList, handleSearch, isLoading, error } = useCountryContext();
    const handleSearchCountry = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setSearchTerm(event.target.value)
    }
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            handleSearch(searchTerm)
        }, 600)

        return () => clearTimeout(delayDebounceFn)
    }, [searchTerm])
    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            <Grid container spacing={4}>
                <Grid sm={5}>

                    <Search >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search for a country..."
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={handleSearchCountry}

                        />
                    </Search>
                </Grid>
                <Grid md={7} display={"flex"} justifyContent="end">
                    <Search>
                        <FilterByRegion />
                    </Search>
                </Grid>
                <Grid>
                    <FormHelperText error color='danger'>{error}</FormHelperText>
                </Grid>
            </Grid>
            <Grid container spacing={6} sx={{ mt: 6 }} >
                {countiresList && countiresList.length > 0 && !isLoading ? countiresList.map((ele, i) => {
                    return (
                        <Grid key={i} xs={12} sm={4} md={3}>
                            <CountryCard image={ele.flags?.png} name={ele.name?.common} capital={ele.capital} population={ele.population}
                                region={ele.region} />
                        </Grid>
                    )
                }) : !isLoading ? <h2>{error}</h2> : <Grid display={"flex"} justifyContent={"center"} md={12}><CircularProgress color="success" /></Grid>}
            </Grid>

        </Container>
    )
}

export default CountriesListPage