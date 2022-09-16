import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useCountryContext } from '../../context/country-context'
import { RegionEnum } from '../../utils/types';

export default function SelectLabels() {
    const [reg, setRegion] = React.useState('');
    const { handleRegionFilter } = useCountryContext();

    const handleChange = (event: SelectChangeEvent) => {
        setRegion(event.target.value);
        handleRegionFilter(event.target.value)
    };
    const names = Object.keys(RegionEnum);
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
            <Select
                value={reg}
                onChange={handleChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem disabled value="">
                    <em>Filter By Region</em>
                </MenuItem>
                <MenuItem value="All">
                    <em>All</em>
                </MenuItem>
                {names.map((name) => (
                    <MenuItem
                        key={name}
                        value={name}
                    >
                        {name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
