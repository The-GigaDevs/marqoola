import {useState, useEffect} from 'react';

import { useDispatch, useSelector } from 'store';

import { getAssets } from 'store/slices/asset';

// material-ui
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Tooltip, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/AddTwoTone';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { CSVExport } from '../../forms/tables/TableExports';
import { header } from '../../forms/tables/TableBasic';

import AssetCreateForm from './createform'


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


// ==============================|| TABLE - STICKY HEADER ||============================== //

export default function AssetTable() {
    const dispatch = useDispatch();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [divisionSelector, setDivisionSelector] = useState('');
    const { selectedDivision } = useSelector((state) => state.divisionselector);

    const [assetTableData, setAssetTableData] = useState([]);
    const { assets } = useSelector((state) => state.asset);

    const [open, setOpen] = useState(false);
    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setOpen(false);
    };

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
                    <Tooltip title="Create Asset">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                    <CSVExport data={assetTableData} filename="sticky-header-table.csv" header={header} />
                    <SecondaryAction link="https://next.material-ui.com/components/tables/" />
                    <AssetCreateForm open={open} parentData={assetTableData} handleCloseDialog={handleCloseDialog}/>
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
                count={assetTableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
}
