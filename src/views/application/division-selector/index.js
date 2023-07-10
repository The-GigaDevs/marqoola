import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from 'store';
import { getOrganisations } from 'store/slices/organisation';
import { useEffect, useState } from "react";

import { createState } from 'state-pool';

const divisionSelectorState = createState('');

export default function DivisionSelector(){
    const dispatch = useDispatch();

    const [divisiolSelector, setDivisionSelector] = divisionSelectorState.useState();

    const { organisations } = useSelector((state) => state.organisation);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        dispatch(getOrganisations());
    }, [dispatch]);

    useEffect(() => {
        setRows(organisations);
    }, [organisations]);

    return(
        
        <div> 
            {rows && (
            <TextField
                id="divisionselector"
                select
                onChange={(e) => {setDivisionSelector(e.target.value)}}
                
                fullWidth
                
            >
                {rows.map((parent) => (
                    <MenuItem key={parent.id} value={parent.id}>
                        {parent.name}
                    </MenuItem>
                ))}
            </TextField>)}
        </div>
    )

}