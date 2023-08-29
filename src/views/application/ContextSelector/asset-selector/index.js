import { TextField, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from 'store';
import { setAssetSelector } from 'store/slices/asset-selector';
import { useEffect, useState } from "react";
import { getAssetsForSelector } from "store/slices/asset";
import useAuth from 'hooks/useAuth';


export default function AssetSelector(){
    const dispatch = useDispatch();

    const { contextSelectorAssets } = useSelector((state) => state.asset);
    const { selectedAsset } = useSelector((state) => state.assetselector);
    const [rows, setRows] = useState([]);
    const [value, setValue] = useState('')
    const { user } = useAuth();


    useEffect(() => {
        dispatch(getAssetsForSelector(user.accessToken));
      }, []);

    useEffect(() => {
        setRows(contextSelectorAssets);
    }, [contextSelectorAssets]);


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