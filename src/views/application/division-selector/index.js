import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from 'store';
import { setDivisionSelector } from 'store/slices/division-selector';
import { useEffect, useState } from "react";
import { getOrganisations } from "store/slices/organisation";
import useAuth from 'hooks/useAuth';


export default function DivisionSelector(){
    const dispatch = useDispatch();

    const { organisations } = useSelector((state) => state.organisation);
    const { selectedDivision } = useSelector((state) => state.divisionselector);
    const [rows, setRows] = useState([]);
    const [value, setValue] = useState('')
    const { user } = useAuth();


    useEffect(() => {
        dispatch(getOrganisations());
      }, []);

    useEffect(() => {
        setRows(organisations);
    }, [organisations]);

    return(
        
        <div> 
            {rows && (
            <TextField
                id="divisionselector"
                select
                onChange={(e) => { setValue(e.target.value); dispatch(setDivisionSelector(e.target.value))}}
                fullWidth
               defaultValue={selectedDivision? selectedDivision : '0'}
                
            >
                <MenuItem key={'0'} value={'0'}>
                        All Divisions
                    </MenuItem>
                {rows.map((parent) => (
                    <MenuItem key={parent.id} value={parent.id}>
                        {parent.name}
                    </MenuItem>
                ))}
            </TextField>)}
        </div>
    )

}