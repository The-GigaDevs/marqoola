import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Collapse, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { CSVExport } from './TableExports';
import { header } from './TableBasic';

// assets
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// table data
function createData(name, lossType, threat, asset, numcontrols, price) {
    return {
        name,
        lossType,
        threat,
        asset,
        numcontrols,
        price,
        history: [
            { controlId: '5.1', label: 'Policies for information security', totaltests: 13, successfulltests: 11, color: 'green' },
            { controlId: '5.2', label: 'Information security roles and responsibilities', totaltests: 5, successfulltests: 5, color: 'green' },
            { controlId: '5.3', label: 'Segregation of duties', totaltests: 11, successfulltests: 4, color: 'red'},
            { controlId: '5.4', label: 'Management responsibilities', totaltests: 13, successfulltests: 11 , color: 'green'},
            { controlId: '5.9', label: 'Inventory of information and other associated assets', totaltests: 20, successfulltests: 16, color: 'orange' },
        ]
    };
}

function Row({ row }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

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
                <TableCell align="right">
                    <div>{row.lossType}</div>
                </TableCell>
                <TableCell align="right">{row.threat}</TableCell>
                <TableCell align="right">{row.asset}</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                    {row.numcontrols}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {open && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <SubCard
                                        sx={{ bgcolor: theme.palette.mode === 'dark' ? 'dark.800' : 'grey.50', mb: 2 }}
                                        title="History"
                                        content={false}
                                        secondary={
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <CSVExport
                                                    data={row.history?.map((historyRow) => historyRow)}
                                                    filename="collapse-table.csv"
                                                    header={header}
                                                />
                                            </Stack>
                                        }
                                    >
                                        <Table size="small" aria-label="purchases">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>Control</TableCell>
                                                    <TableCell align="right">Tests</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {row.history?.map((historyRow) => (
                                                    <TableRow hover key={historyRow.controlId}>
                                                        <TableCell component="th" scope="row">
                                                            {historyRow.controlId}
                                                        </TableCell>
                                                        <TableCell>{historyRow.label}</TableCell>
                                                        <TableCell align="right" style={{padding: 5 + 'px', borderRadius: 5 +'px', backgroundColor: 'rgba(0, 128, 0, 0.05)', color:`${historyRow.color}` }}>
                                                            {historyRow.successfulltests} / {historyRow.totaltests}
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </SubCard>
                                </TableContainer>
                            </Box>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};

const rows = [
    createData('Data Breach - Malicious Internal', 'Fines and judgments (F/J)', 'Modify', 'Software', 18, 3.99),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5)
];

// ==============================|| TABLE - COLLAPSIBLE ||============================== //

export default function TableCollapsible() {
    const newRow = [];
    rows.forEach((element) => {
        newRow.push({
            ...element,
            history: null
        });
    });
    return (
        <MainCard
            content={false}
            title="Collapsible Table"
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    <CSVExport data={newRow} filename="basic-table.csv" header={header} />
                    <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                </Stack>
            }
        >
            {/* table */}
            <TableContainer>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }} />
                            <TableCell>Risk</TableCell>
                            <TableCell align="right">Loss Type</TableCell>
                            <TableCell align="right">Threat</TableCell>
                            <TableCell align="right">Asset</TableCell>
                            <TableCell sx={{ pr: 3 }} align="right">
                                # Controls
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
    );
}
