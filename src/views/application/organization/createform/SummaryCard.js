import React from 'react';
import { styled } from '@mui/system';
import { Table, Box, Divider, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StyledLightPurpleTableCell = styled(TableCell)({
  color: 'white',
  backgroundColor: '#E6E6FA',
  border: '1px solid black',
  height: '20px'
});

const StyledDarkPurpleTableCell = styled(TableCell)({
  color: 'white',
  backgroundColor: '#B57EDC',
  fontWeight: 'bold',
  border: '1px solid black',
  textAlign: 'center'
});

const StyledLightBlueTableCell = styled(TableCell)({
  color: 'white',
  backgroundColor: '#446CCF',
  fontWeight: 'bold',
  border: '1px solid black',
  textAlign: 'center'
});

const StyledDarkBlueTableCell = styled(TableCell)({
  color: 'white',
  backgroundColor: '#324AB2',
  fontWeight: 'bold',
  border: '1px solid black',
  textAlign: 'center'
});



const CenteredCellWithSeparator = ({ value1, value2 }) => {
  return (

        <Box display="flex" alignItems="center" justifyContent="center"  style={{color: '#808080'}}>
          {value1}
          <Divider orientation="vertical" style={{ borderColor: '#808080' }} flexItem sx={{ mx: 1, borderRightWidth: 3 , height: '50px' }} />
          {value2}
</Box>          

  );
};

const SummaryCard = () => {
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledDarkPurpleTableCell style={{color: 'white'}}>Lower</StyledDarkPurpleTableCell>
            <StyledDarkPurpleTableCell style={{color: 'white'}}>Tolerance</StyledDarkPurpleTableCell>
            <StyledDarkBlueTableCell>Upper</StyledDarkBlueTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow key='1'>
              <StyledLightPurpleTableCell>
                <CenteredCellWithSeparator value1={'$0'} value2={'$250,000'}/>
              </StyledLightPurpleTableCell>
              <StyledLightPurpleTableCell>
                <CenteredCellWithSeparator value1={'$252,000'} value2={'$1,550,000'}/>
              </StyledLightPurpleTableCell>
              <StyledLightBlueTableCell>
                 &lt; $1,550,000
              </StyledLightBlueTableCell>
            </TableRow>
      
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SummaryCard;
