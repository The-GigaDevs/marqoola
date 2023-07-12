import {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'store';

import { getAssets } from 'store/slices/asset';

// material-ui
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { CSVExport } from '../../forms/tables/TableExports';
import { header } from '../../forms/tables/TableBasic';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'parentname', label: 'Parent Name', minWidth: 100 },
    {
        id: 'organisation',
        label: 'Organisation',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'intrinsicassetvalue',
        label: 'Intrinsic Value',
        minWidth: 170,
        
    },
    {
        id: 'indirectassetvalue',
        label: 'Indirect Value',
        minWidth: 170,
        
    },
    {
        id: 'directassetvalue',
        label: 'Direct Value',
        minWidth: 170,
        
    },
    {
        id: 'totalassetvalue',
        label: 'Total Value',
        minWidth: 170,
        align: 'right',
        format: (value) => typeof value === 'number' && value.toFixed(2)
    }
];

// table data
function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767)
];

// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function AssetTable() {
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [divisionSelector, setDivisionSelector] = useState('');
    const { selectedDivision } = useSelector((state) => state.divisionselector);

    const [assetTableData, setAssetTableData] = useState([]);
    const { assets } = useSelector((state) => state.asset);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event?.target?.value);
        setPage(0);
    };

    useEffect(() => {
        dispatch(getAssets());
    }, [dispatch]);

    useEffect(() => {
        setAssetTableData(assets);
    }, [assets]);

    useEffect(() => {
        setDivisionSelector(selectedDivision);
    }, [selectedDivision]);

    return (
        <MainCard
            content={false}
            title="Assets"
            secondary={
                <Stack direction="row" spacing={2} alignItems="center">
                    <CSVExport data={rows} filename="sticky-header-table.csv" header={header} />
                    <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                </Stack>
            }
        >
            {/* table */}
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell sx={{ py: 3 }} key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {assetTableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow sx={{ py: 3 }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map((column) => {
                                    const value = row[column.id];
                                    if (typeof value === 'object'){
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {value && value.number}
                                            </TableCell>
                                        );
                                    }
                                    else{
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    }
                                    
                                })}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
