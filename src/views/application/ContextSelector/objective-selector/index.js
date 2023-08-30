import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from 'store';
import { setObjectiveSelector } from 'store/slices/objective-selector';
import { useEffect, useState } from "react";
import { getObjectivesForSelector } from "store/slices/objective";
import useAuth from 'hooks/useAuth';


export default function ObjectiveSelector(){
    const dispatch = useDispatch();

    const { contextSelectorObjectives } = useSelector((state) => state.objective);
    const { selectedObjective } = useSelector((state) => state.objectiveselector);
    const [rows, setRows] = useState([]);
    const [value, setValue] = useState('')
    const { user } = useAuth();


    useEffect(() => {
        dispatch(getObjectivesForSelector(user.accessToken));
      }, []);

    useEffect(() => {
        setRows(contextSelectorObjectives);
    }, [contextSelectorObjectives]);


    return(
        
        <div> 
            {rows && (
            <TextField
                id="assetselector"
                select
                onChange={(e) => { setValue(e.target.value); dispatch(setObjectiveSelector(e.target.value, user.accessToken))}}
                fullWidth
               defaultValue={selectedObjective? selectedObjective : '0'}
                
            >
                <MenuItem key={'0'} value={'0'}>
                        All Objectives
                    </MenuItem>
                {rows.map((parent) => (
                    <MenuItem key={parent.id} value={parent.id}>
                        {parent.name} - {parent.code}
                    </MenuItem>
                ))}
            </TextField>)}
        </div>
    )

}