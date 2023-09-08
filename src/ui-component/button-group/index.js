import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple, grey } from '@mui/material/colors'

import { getRiskTolerances } from "store/slices/risktolerance";

export const ButtonGroupCustom = ({buttonGroupData, setButtonGroupData}) => {
    const redTheme = createTheme({ palette: { primary: grey, secondary: purple } })
    
    const [selectedBtn, setSelectedBtn] = useState(0);

    const [selectedId, setSelectedId] = useState("");
  
    useEffect(() => {
      setButtonGroupData(selectedId);
  }, [selectedId]);

      return buttonGroupData && (
      <div>
        
      <ButtonGroup disableElevation variant="contained" color="primary" >
      
        <Button  variant='outlined' color={selectedBtn === 1 ? "secondary" : "primary"} onClick={()=>{setSelectedBtn(1); setSelectedId(buttonGroupData[0].id);}}>Averse</Button>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  variant='outlined' color={selectedBtn === 2 ? "secondary" : "primary"} onClick={()=>{setSelectedBtn(2); setSelectedId(buttonGroupData[1].id);}}>Minimalist</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  variant='outlined' color={selectedBtn === 3 ? "secondary" : "primary"} onClick={()=>{setSelectedBtn(3); setSelectedId(buttonGroupData[2].id);}}>Cautious</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  variant='outlined' color={selectedBtn === 4 ? "secondary" : "primary"} onClick={()=>{setSelectedBtn(4); setSelectedId(buttonGroupData[3].id);}}>Open</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  variant='outlined' color={selectedBtn === 5 ? "secondary" : "primary"} onClick={()=>{setSelectedBtn(5); setSelectedId(buttonGroupData[4].id);}}>Hungry</Button>
      </ButtonGroup>
      
    </div>
    );
  };