import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { CountryType } from '../../utils/types';
import { useCountryContext } from '../../context/country-context';


type coutryCardType = {
  image?: string;
  name?: string;
  population?: number;
  region?: string;
  capital?: string | string[];
}

export default function MediaCard({ image, name, population, region, capital }: coutryCardType) {

  const { clearCountryList } = useCountryContext();
  const navigate = useNavigate();

  const handleCountryClick = () => {
    // setCountryData(country)
    clearCountryList()
    navigate(`/country-detail?country=${name}`);
  }
  return (
    <Card onClick={handleCountryClick} sx={{ maxWidth: 345, cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={"Country Flags"}
      />
      <CardContent sx={{ textAlign: "left" }}>
        <Typography className="country-name" sx={{ fontWeight: 600, fontSize: 19 }} gutterBottom variant="h1" component="div">
          {name}
        </Typography>
        <Typography sx={{ fontWeight: 500, fontSize: 14 }} variant="body1" color="text.secondary">
          Population :  <span className='span-text'>{population}</span>
        </Typography>
        <Typography sx={{ fontWeight: 500, fontSize: 14 }} variant="body1" color="text.secondary">
          Region :  <span className='span-text'>{region}</span>
        </Typography>
        <Typography sx={{ fontWeight: 500, fontSize: 14 }} variant="body1" color="text.secondary">
          Capital :  <span className='span-text'>{capital && capital.length > 0 ? capital[0] : ""}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}
