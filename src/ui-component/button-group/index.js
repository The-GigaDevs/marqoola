import { useState } from "react";
import { Button, ButtonGroup } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { purple, grey } from '@mui/material/colors'

export const ButtonGroupCustom = () => {
    const redTheme = createTheme({ palette: { primary: grey, secondary: purple } })
    
    
    const [value, setValue] = useState("a");
  
    const handleChange = (_event, newAlignment) => {
      setValue(newAlignment);
    };

    const [selectedBtn, setSelectedBtn] = useState(-1);

    return (
      <div>
        <ThemeProvider theme={redTheme}>
      <ButtonGroup disableElevation variant="contained" color="primary" >
      
        <Button  variant='outlined' color={selectedBtn === 1 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(1)}>Averse</Button>
        
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  variant='outlined' color={selectedBtn === 2 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(2)}>Minimalist</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  variant='outlined' color={selectedBtn === 3 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(3)}>Cautious</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  variant='outlined' color={selectedBtn === 4 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(4)}>Open</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button  variant='outlined' color={selectedBtn === 5 ? "secondary" : "primary"} onClick={()=>setSelectedBtn(5)}>Hungry</Button>
      </ButtonGroup>
      </ThemeProvider>
    </div>
    );
  };