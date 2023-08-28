import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from 'store';
import { setAssetSelector } from 'store/slices/asset-selector';
import { useEffect, useState } from "react";
import { getAssetClusters } from "store/slices/asset";
import useAuth from 'hooks/useAuth';


export default function DivisionSelector(){
    const dispatch = useDispatch();

    const { assets } = useSelector((state) => state.asset);
    const { selectedDivision } = useSelector((state) => state.divisionselector);
    const { selectedAsset } = useSelector((state) => state.assetselector);
    const [rows, setRows] = useState([]);
    const [value, setValue] = useState('')
    const { user } = useAuth();


    useEffect(() => {
        dispatch(getAssetClusters(selectedDivision, null, user.accessToken));
      }, []);

    useEffect(() => {
        setRows(assets);
    }, [assets]);

    useEffect(() => {
        dispatch(getAssetClusters(selectedDivision, null, user.accessToken));
    }, [selectedDivision]);

    return(
        
        <div> 
            {rows && (
            <TextField
                id="assetselector"
                select
                onChange={(e) => { setValue(e.target.value); dispatch(setAssetSelector(e.target.value, user.accessToken))}}
                fullWidth
               defaultValue={selectedAsset? selectedAsset : '0'}
                
            >
                <MenuItem key={'0'} value={'0'}>
                        All Assets
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