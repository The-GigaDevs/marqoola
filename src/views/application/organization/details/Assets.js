import PropTypes from 'prop-types';
import * as React from 'react';
import useAuth from 'hooks/useAuth';
// material-ui
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    CardContent,
    Checkbox,
    Grid,
    IconButton,
    InputAdornment,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
    Fab, Switch
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { openSnackbar } from 'store/slices/snackbar';
// project imports
import Chip from 'ui-component/extended/Chip';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { useDispatch, useSelector } from 'store';
import { getAssets, deleteAsset } from 'store/slices/asset';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import AssetCreateForm from '../../assets/createform'
import AssetEditForm from '../../assets/editform'

import CreateForm from '../createform'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


// table sort
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

const getComparator = (order, orderBy) =>
    order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);

function stableSort(array, comparator) {
    if (array.length > 0){
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
}

// table header options
const headCells = [
    { id: 'name', label: 'Asset Name', minWidth: 170 },

    {
        id: 'cluster',
        label: 'Cluster',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'assettype',
        label: 'Asset Type',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'owner',
        label: 'Owner',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'assetvalue',
        label: 'Asset Value',
        numeric: true,
        align: 'center',
        format: (value) => typeof value === 'number' && value.toFixed(2)
    },
    {
        id: 'currentrisk',
        align: 'center',
        label: 'Current Risk',
        numeric: false
    }
];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, selected, handleDelete }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" sx={{ pl: 3 }}>
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts'
                        }}
                    />
                </TableCell>
                {numSelected > 0 && (
                    <TableCell padding="none" colSpan={6}>
                        <EnhancedTableToolbar numSelected={selected.length} selection={selected} handleDelete={handleDelete} />
                    </TableCell>
                )}
                
                {numSelected <= 0 &&
                    headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.align}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}

            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    selected: PropTypes.array,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired
};

// ==============================|| TABLE HEADER TOOLBAR ||============================== //

const EnhancedTableToolbar = ({ numSelected, selection, handleDelete }) => (
    <Toolbar
        sx={{
            p: 0,
            pl: 1,
            pr: 1,
            ...(numSelected > 0 && {
                color: (theme) => theme.palette.secondary.main
            })
        }}
    >
        {numSelected > 0 ? (
            <Typography color="inherit" variant="h4">
                {numSelected} Selected
            </Typography>
        ) : (
            <Typography variant="h6" id="tableTitle">
                Nutrition
            </Typography>
        )}
        <Box sx={{ flexGrow: 1 }} />
        {numSelected > 0 && (
            <Tooltip title="Delete">
                <IconButton size="large" >
                    <DeleteIcon fontSize="small" onClick={() => handleDelete(selection)} />
                </IconButton>
            </Tooltip>
        )}
    </Toolbar>
);

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    selection: PropTypes.array.isRequired,
    handleDelete: PropTypes.func.isRequired
};

// ==============================|| ASSET TABLE ||============================== //

const AssetTable = ({selectedOrganisation}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [search, setSearch] = React.useState('');
    const [currentAsset, setCurrentAsset] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const { customers } = useSelector((state) => state.customer);
    const [divisionSelector, setDivisionSelector] = React.useState('');
    const { selectedDivision } = useSelector((state) => state.divisionselector);
    const { user } = useAuth();
    const [assetTableData, setAssetTableData] = React.useState([]);
    const { assets } = useSelector((state) => state.asset);

    const [open, setOpen] = React.useState(false);
    const [resetForm, setResetForm] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [expandRow, setExpandRow] = React.useState(false);
    const [expandedRow, setExpandedRow] = React.useState([]);
    const secondary = theme.palette.secondary.main;

    const handleClickOpenDialog = () => {
        setOpen(true);
        setResetForm(false);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        setResetForm(true);
        dispatch(getAssets(user.accessToken));
    };

    // Getting the token

    React.useEffect(() => {

        dispatch(getAssets(selectedOrganisation.id, user.accessToken));
    }, []);

    React.useEffect(() => {
        setAssetTableData(assets);
    }, [assets]);

    React.useEffect(() => {
        setDivisionSelector(selectedDivision);

    }, [selectedDivision]);

    const handleDelete = async (selected) => {
        for (var selectedid of selected) {
            dispatch(deleteAsset(selectedid, user.accessToken));
        }
        await delay(500);
        dispatch(
            openSnackbar({
                open: true,
                message: 'Item(s) deleted successfully',
                variant: 'alert',
                alert: {
                    color: 'success'
                },
                close: true

            })
        )
        dispatch(getAssets(user.accessToken));
        setSelected([])
    };

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = assetTableData.filter((row) => {
                let matches = true;

                const properties = ['name', 'email', 'location', 'orders'];
                let containsQuery = false;

                properties.forEach((property) => {
                    if (row[property].toString().toLowerCase().includes(newString.toString().toLowerCase())) {
                        containsQuery = true;
                    }
                });

                if (!containsQuery) {
                    matches = false;
                }
                return matches;
            });
            setRows(newRows);
        } else {
            setRows(customers);
        }
    };


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            if (selected.length > 0) {
                setSelected([]);
            } else {
                const newSelectedId = assetTableData.map((n) => n.id);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleOpenEditDialog = (event, id) => {
        navigate('/asset', { state: { id: id } });
    }

    const handleCloseEditDialog = () => {
        setOpenEdit(false);
        dispatch(getAssets("", user.accessToken));
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event?.target.value, 10));
        setPage(0);
    };



    const [checked, setChecked] = React.useState(false);

    const handleSwitch = (event) => {
        setChecked(event.target.checked);

    };

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isExpanded = (name) => expandedRow.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assetTableData.length) : 0;

    
    return (
        <SubCard title={<><Typography variant="h1" color={secondary}> {selectedOrganisation.name}</Typography>

        </>}
        >
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                )
                            }}
                            onChange={handleSearch}
                            placeholder="Search Asset"
                            value={search}
                            size="small"
                        />
                    </Grid>
                    { /*
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
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
                        <CreateForm open={open} handleCloseDialog={handleCloseDialog} resetForm={resetForm} setResetForm={setResetForm} parentData={assetTableData}/>
                    </Grid>
                    */}
                </Grid>
            </CardContent>

            
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        theme={theme}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={assetTableData.length}
                        selected={selected}
                        handleDelete={handleDelete}
                    />
                    <TableBody>
                        {assetTableData.length > 0 && stableSort(assetTableData, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                /** Make sure no display bugs if row isn't an OrderData object */
                                if (typeof row === 'number') return null;
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                const isRowExpanded = isExpanded(row.id);

                                return (<>
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={index}
                                        selected={isItemSelected}
                                    >
                                        <TableCell padding="checkbox" sx={{ pl: 3 }} onClick={(event) => handleClick(event, row.id)}>
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                                inputProps={{
                                                    'aria-labelledby': labelId
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            onClick={(event) => { if (selected.length === 0) handleOpenEditDialog(event, row.id) }}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ color: '#db72ff' }}
                                            >
                                                {' '}
                                                {row.name}{' '}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.assettypename}</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center">{row.totalassetvalue ? row.totalassetvalueformated : '0'}</TableCell>
                                        <TableCell align="center">
                                            {row.grossrisk ? row.grossriskformated : '0'}
                                        </TableCell>
                                        

                                    </TableRow>
                                    
                                </>
                                );
                            })}
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: 53 * emptyRows
                                }}
                            >
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <AssetEditForm open={openEdit} parentData={assetTableData} handleCloseDialog={handleCloseEditDialog} assetid={currentAsset} />
            </TableContainer>

            
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={assetTableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            
            
        </SubCard>
    );
};

export default AssetTable;
