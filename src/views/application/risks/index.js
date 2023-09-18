import PropTypes from 'prop-types';
import * as React from 'react';

import useAuth from 'hooks/useAuth';
// material-ui
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
    Fab, Switch, Button
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { openSnackbar } from 'store/slices/snackbar';
// project imports
import Chip from 'ui-component/extended/Chip';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';

//import CreateForm from '../createform'
import Details from './details'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { deleteRisk, getRisks, getRiskById } from 'store/slices/risk';


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
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// table header options
const headCells = [
    { id: 'name', label: 'Risk Name', minWidth: 170 },

    {
        id: 'description',
        label: 'Description',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'assets',
        label: 'Assets',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'controls',
        label: 'Controls',
        numeric: true,
        align: 'center',
        format: (value) => typeof value === 'number' && value.toFixed(2)
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

const RiskTable = () => {
    const theme = useTheme();
    
    const dispatch = useDispatch();
    const delay = ms => new Promise(
        resolve => setTimeout(resolve, ms)
    );
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [search, setSearch] = React.useState('');
    const [divisionSelector, setDivisionSelector] = React.useState('');
    const { selectedDivision } = useSelector((state) => state.divisionselector);
    const { selectedAsset } = useSelector((state) => state.assetselector);
    const { selectedRisk } = useSelector((state) => state.riskselector);
    const { selectedObjective } = useSelector((state) => state.objectiveselector);
    const { user } = useAuth();
    const [orgTableData, setOrgTableData] = React.useState([]);
    const { risks } = useSelector((state) => state.risk);

    const [open, setOpen] = React.useState(false);
    const [resetForm, setResetForm] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [expandedRow, setExpandedRow] = React.useState([]);
    const [openDetails, setOpenDetails] = React.useState(false);
    const [identifier, setIdentifier] = React.useState({});
    const [activeTab, setActiveTab] = React.useState(0);

    const handleClickOpenDialog = () => {
        setOpen(true);
        setResetForm(false);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        setResetForm(true);
        dispatch(getRisks(selectedDivision, selectedAsset, selectedRisk, selectedObjective, user.accessToken));
    };

    
    // Getting the token

    React.useEffect(() => {

        dispatch(getRisks(selectedDivision, selectedAsset, selectedRisk, selectedObjective , user.accessToken));
    }, [dispatch]);

    React.useEffect(() => {
        setOrgTableData(risks);
    }, [risks]);

    React.useEffect(() => {
        setDivisionSelector(selectedDivision);
        dispatch(getRisks(selectedDivision, selectedAsset, selectedRisk, selectedObjective,user.accessToken));
    }, [selectedDivision, selectedAsset, selectedRisk, selectedObjective]);

    React.useEffect(() => {
        dispatch(getRisks(selectedDivision, selectedAsset, selectedRisk, selectedObjective ,user.accessToken));
    }, [divisionSelector]);

    const handleDelete = async (selected) => {
        for (var selectedid of selected) {
            dispatch(deleteRisk(selectedid, user.accessToken));
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
        dispatch(getRisks(selectedDivision, selectedAsset, selectedRisk, selectedObjective ,user.accessToken));
        setSelected([])
    };

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = orgTableData.filter((row) => {
                let matches = true;

                const properties = ['name', 'description', 'id'];
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
            setOrgTableData(newRows);
        } else {
            setOrgTableData(risks);
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
                const newSelectedId = orgTableData.map((n) => n.id);
                setSelected(newSelectedId);
            }
            return;
        }
        setSelected([]);
    };

    const handleOpenEditDialog = (event, id) => {
        setIdentifier({id: id})
        setOpenDetails(true)
    }

    const handleCloseEditDialog = () => {
        setOpenEdit(false);
        dispatch(getRisks(selectedDivision, selectedAsset, selectedRisk, user.accessToken));
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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orgTableData.length) : 0;

    
    return (!openDetails && (
        <MainCard title="Risks" content={false}>{ !checked &&
            (<>
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
                            placeholder="Search Control Implementations"
                            value={search}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        
                        { /*
                        <CreateForm open={open} handleCloseDialog={handleCloseDialog} resetForm={resetForm} setResetForm={setResetForm} />
                        */}
                    </Grid>
                </Grid>
            </CardContent>

            
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                        theme={theme}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={orgTableData.length}
                        selected={selected}
                        handleDelete={handleDelete}
                    />
                    <TableBody>
                        {stableSort(orgTableData, getComparator(order, orderBy))
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
                                                {''}
                                                {row.name}{' '}
                                            <Typography variant="subtitle2" sx={{ color: '#808080' }}> Organisation: {row.organame} </Typography>
                                            <Typography variant="subtitle2" sx={{ color: '#808080' }}> Asset: {row.assetname} </Typography>
                                            </Typography>
                                            
                                        </TableCell>
                                        <TableCell align="center">{row.description.slice(0,300)}...</TableCell>
                                        <TableCell align="center"><Chip label="0" /></TableCell>
                                        <TableCell align="center"><Chip label="0" /></TableCell>

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
                

            </TableContainer>

            
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={orgTableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /></>)
                            }
            
        </MainCard>) ||
        openDetails && (
            <Details activeTab={activeTab} identifier={identifier} setOpenDetails={setOpenDetails}/>
        )
    );
};

export default RiskTable;
