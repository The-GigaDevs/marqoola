import { useState } from 'react';
// material-ui
import { Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { CSVExport } from './TableExports';
import TableDataGrid, { rows as Data, columns } from './GridTable';

// table data
function createData(name, score, riskReductionCurrent, riskReductionPotential, implementantionCost, roi, tests, frameworks) {
    return { name, score, riskReductionCurrent, riskReductionPotential, implementantionCost, roi,tests, frameworks };
}

const rows = [
    createData('Policies for information security', '68%', 'A$ 50,798.26', 'A$ 34,542.81', 'A$ 20,000.00', 'A$ 34,542.81', 10, [{name:'ISO27001', color:'error.light'}]),
    createData('Information security roles and responsibilities', '18%', 'A$ 152,394.45', 'A$ 27,431.81', 'A$ 80,000.00', 'A$ 67,394.77', 26, [{name:'SOC 2 2027', color:'error.light'}]),
    createData('Segregation of duties', '19%', 'A$ 101,596.77', 'A$ 19,303.14', 'A$ 88,000.00', 'A$ 13,596.51', 30, [{name:'ISO27001', color:'error.light'}, {name:'SOC 2 2027', color:'primary.main'}, {name:'+2'}]),
];

export const header = [
    { label: 'Risk Controls (15)', key: 1 },
    { label: 'Score', key: 2 },
    { label: 'Risk Reduction Current (A$)', key: 3 },
    { label: 'Implementantion Cost (A$)', key: 4 },
    { label: 'ROI (A$)', key: 5 },
    { label: 'Outstanding Tests', key: 6 }
];
// ==============================|| TABLE - BASIC ||============================== //

export default function RiskDashboardControlTable() {
    const theme = useTheme();
    const red = theme.palette.error.main;
    const headers = [];
    columns.map((item) => headers.push({ label: item.headerName, key: item.field }));

    const [selectedValue, setSelectedValue] = useState([]);
    const handlerClick = (data) => {
        setSelectedValue(data);
    };

    const NewValue = selectedValue.length > 0 ? selectedValue : Data;

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <MainCard
                    content={false}
                    
                    secondary={
                        <Stack direction="row" spacing={2} alignItems="center">
                            <CSVExport data={rows} filename="basic-table.csv" header={header} />
                            <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                        </Stack>
                    }
                >
                    {/* table */}
                    <TableContainer>
                        <Table sx={{ minWidth: 350 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ pl: 3 }}>Risk Controls (15)</TableCell>
                                    <TableCell align="right">Score</TableCell>
                                    <TableCell align="right">Risk Reduction Current&nbsp;(A$)</TableCell>
                                    <TableCell align="right">Risk Reduction Potential&nbsp;(A$)</TableCell>
                                    <TableCell align="right">Implementantion Cost&nbsp;(A$)</TableCell>
                                    <TableCell align="right">ROI&nbsp;(A$)</TableCell>
                                    <TableCell align="right">Outstanding Tests</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow hover key={row.name}>
                                        <TableCell sx={{ pl: 3 }} component="th" scope="row">
                                            <Grid container direction='column'>
                                                <Grid item>
                                                    {row.name}
                                                </Grid>
                                                <Grid item>
                                                    <Grid container direction="row" spacing={1}>
                                                        {row.frameworks.map((framework) => (
                                                            <Grid item>
                                                                <Chip label={framework.name} sx={{backgroundColor: framework.color}} />
                                                            </Grid>
                                                        ))}
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            
                                            
                                            
                                        </TableCell>
                                        <TableCell align="right">{row.score}</TableCell>
                                        <TableCell align="right">{row.riskReductionCurrent}</TableCell>
                                        <TableCell align="right">{row.riskReductionPotential}</TableCell>
                                        <TableCell align="right">{row.implementantionCost}</TableCell>
                                        <TableCell align="right">{row.roi}</TableCell>
                                        <TableCell align="right"><Button variant="outlined" sx={{
                                        borderColor: 'error.main',
                                        color: 'error.main'
                                    }}>
                                    {row.tests}
                                </Button></TableCell>
                                
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>
            </Grid>
        </Grid>
    );
}
