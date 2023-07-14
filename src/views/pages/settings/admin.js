import PropTypes from 'prop-types';

import {React, useEffect, useState, Fragment } from 'react';
import axios from 'utils/axios';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,    Tooltip,    Fab, } from '@mui/material';

// project imports
import AddIcon from '@mui/icons-material/AddTwoTone';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
// import { CSVExport } from './TableExports';
// import { header } from './TableBasic';

import EnumAdd from './EnumAdd';

// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useDispatch, useSelector } from 'store';
import { getEnums,getEnumData,addEnum } from 'store/slices/enumerations';
import { values } from 'lodash';
import DeleteIcon from '@mui/icons-material/Delete';



function Row({ row }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
   // const { enumlist } = useSelector((state) => state.enumlist);
    //const dispatch = useDispatch();
   // const {enumData}= useSelector((state) => state.enumData);

    axios.get('/manager/enums/'+row.name)
    .then(resp => {

        row.history = resp.data;
    // history = resp.data
      //setSubmitionCompleted(true);
      //resetForm();

     // dispatch(getEnums());

      //handleCloseDialog();
      //alert(resp.data);
      
    });


    const handleClickDelete = () => {
//alert("delete = " + row.name);
axios.delete('/manager/enums/'+row.name+"/delete")
.then(resp => {

    alert("deleted = " + row.name);
    dispatch(getEnums());
// history = resp.data
  //setSubmitionCompleted(true);
  //resetForm();

 // dispatch(getEnums());

  //handleCloseDialog();
  //alert(resp.data);
  
});
        //setOpen(true);
    };
    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell sx={{ pl: 3 }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>

                <TableCell align="left" sx={{ pr: 3 }}>
                    {row.tablename}
                </TableCell>

                <TableCell align="right" sx={{ pr: 3 }}>
                <Tooltip title="Delete Enumeration">
                            <Fab
                                color="red"
                                size="small"
                                 onClick={handleClickDelete}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <DeleteIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                        
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Label</TableCell>
                                                    <TableCell>Value</TableCell>
                           
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {(row.history)?.map((historyRow) => (
                                                    <TableRow hover key={historyRow.id}>
                                                        <TableCell component="th" scope="row">
                                                            {historyRow.label}
                                                        </TableCell>
                                                        <TableCell>{historyRow.value}</TableCell>
                  


                                                    </TableRow>
                                                    
                                                ))}
                                            </TableBody>
                                        </Table>
                             
                                </TableContainer>
                            </Box>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

// table data
Row.propTypes = {
    row: PropTypes.object
};
export default function TableCollapsible() {
    const dispatch = useDispatch();
    const { enumlist } = useSelector((state) => state.enumlist);
    // useEffect(() => {
    //     dispatch(getEnums());
    // }, [dispatch]);
    const newRow = [];
    enumlist.forEach((element) => {

        //dispatch(getEnumData(row.name))
        //alert(element.name);
         newRow.push({
             ...element,
             history: getEnumData(enumlist.name)
         });
     });
        useEffect(() => {

    }, [dispatch]);
 


    const [open, setOpen] = useState(false);
    const handleClickOpenDialog = () => {


        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };
    return (
        <MainCard
            content={false}
            title="Enumeration Lists"
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    
                

                    <Tooltip title="Add Enumeration">
                            <Fab
                                color="primary"
                                size="small"
                                 onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <EnumAdd open={open} handleCloseDialog={handleCloseDialog} />
                </Stack>
            }
        >
            {/* table */}
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }} />
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Table Name</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {newRow.map((row) => (
                            <Row key={row.id} row={row}  />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
}
