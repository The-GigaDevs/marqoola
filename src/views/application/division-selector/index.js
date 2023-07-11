import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from 'store';
import { setDivisionSelector } from 'store/slices/division-selector';
import { useEffect, useState } from "react";
import { getOrganisations } from "store/slices/organisation";


export default function DivisionSelector(){
    const dispatch = useDispatch();

    const { organisations } = useSelector((state) => state.organisation);
    const [rows, setRows] = useState([]);


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
                onChange={(e) => {dispatch(setDivisionSelector(e.target.value))}}
                
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