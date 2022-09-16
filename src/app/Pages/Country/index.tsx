import React, { useEffect } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCountryContext } from '../../context/country-context';
import { Typography } from '@mui/material';


function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const CountryPage = () => {

    const { country, getCountryByName, getCountryByCode } = useCountryContext();
    const navigate = useNavigate();
    let query = useQuery();

    const handleBorderClick = (value: string) => {
        getCountryByCode(value)
        navigate(`/country-detail?code=${value}`)
    }
    useEffect(() => {

        if (query.get("country")) {
            getCountryByName(query.get("country"))
        }
    }, [query.get("country")])
    useEffect(() => {

        if (query.get("code")) {
            getCountryByCode(query.get("code"))
        }
    }, [query.get("code")])
    useEffect(() => {
    }, [country])
    return (
        <Container maxWidth="lg" sx={{ mt: 8 }}>
            {country && country ? (<>
                <Grid container spacing={4}>
                    <Button onClick={() => navigate('/')} color='secondary' variant="outlined" startIcon={<KeyboardBackspaceIcon />}>
                        Back
                    </Button>
                </Grid>

                <Grid container spacing={4} sx={{ mt: 6 }} >
                    <Grid md={5}>
                        <CardMedia
                            sx={{ boxShadow: `0px 2px 20px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);` }}
                            component="img"
                            image={country.flags?.png}
                            alt={country.name?.common}
                        />
                    </Grid>
                    <Grid md={1}></Grid>

                    <Grid container md={6}>
                        <Grid md={12}>
                            <Typography sx={{ textAlign: "left", fontWeight: 500 }} variant='h3'>{country.name?.common}</Typography>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <div className="detail-text-div-1">
                                <Typography variant="body1" color="text.secondary">
                                    Native Name :  <span className='span-text'>{country.name?.nativeName && country.name?.nativeName[Object.keys(country.name?.nativeName)[0]].common}</span>
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Population :  <span className='span-text'>{country.population}</span>
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Region :  <span className='span-text'>{country.region}</span>
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Sub Region :  <span className='span-text'>{country.subregion}</span>
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Capital :  <span className='span-text'>{country.capital}</span>
                                </Typography>
                            </div>
                        </Grid>
                        <Grid xs={12} md={6}>
                            <div className="detail-text-div-2">
                                <Typography variant="body1" color="text.secondary">
                                    Top Level Domain:  <span className='span-text'> {country.tld} </span>
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    Currencies :  <span className='span-text'>{country.currencies && country.currencies[Object.keys(country.currencies)[0]].name}</span>
                                </Typography>
                            </div>
                        </Grid>
                        <Grid xs={12} md={3}>
                            <Typography sx={{ fontWeight: 500, fontSize: 14, textAlign: "left" }} variant="body2" color="text.secondary">
                                Border Countries:
                            </Typography>
                        </Grid>
                        <Grid display={"flex"} justifyContent={"start"} flexWrap={"wrap"} xs={12} md={9}>
                            {
                                country.borders && country.borders!.map((ele, i) => {
                                    return (
                                        <Button key={i} sx={{ margin: '5px 10px 0 0' }} onClick={() => handleBorderClick(ele)} variant="contained">{ele} </Button>
                                    )
                                })
                            }


                        </Grid>

                    </Grid>
                </Grid></>) : ("")}

        </Container>
    )
}

export default CountryPage