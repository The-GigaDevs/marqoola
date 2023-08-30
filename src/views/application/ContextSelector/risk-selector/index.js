import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from 'store';
import { setRiskSelector } from 'store/slices/risk-selector';
import { useEffect, useState } from "react";
import { getRisksForSelector } from "store/slices/risk";
import useAuth from 'hooks/useAuth';


export default function RiskSelector(){
    const dispatch = useDispatch();

    const { contextSelectorRisks } = useSelector((state) => state.risk);
    const { selectedRisk } = useSelector((state) => state.riskselector);
    const [rows, setRows] = useState([]);
    const [value, setValue] = useState('')
    const { user } = useAuth();


    useEffect(() => {
        dispatch(getRisksForSelector(user.accessToken));
      }, []);

    useEffect(() => {
        setRows(contextSelectorRisks);
    }, [contextSelectorRisks]);


    return(
        
        <div> 
            {rows && (
            <TextField
                id="riskselector"
                select
                onChange={(e) => { setValue(e.target.value); dispatch(setRiskSelector(e.target.value, user.accessToken))}}
                fullWidth
               defaultValue={selectedRisk? selectedRisk : '0'}
                
            >
                <MenuItem key={'0'} value={'0'}>
                        All Risks
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