import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react'
import { gridSpacing } from 'store/constant'
import SubCard from 'ui-component/cards/SubCard';
import axios from 'utils/axios';
import DeleteIcon from '@mui/icons-material/Delete';

import { useEffect, useState } from 'react';
import {
    Divider,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Chip,
    TableRow,
    Typography,
    TextField,
    Button, MenuItem, Card, CardHeader, CardContent, TableSortLabel, Toolbar, Tooltip, TablePagination, Fab
} from '@mui/material';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import PersonIcon from '@mui/icons-material/Person';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

// third party
import { FixedSizeList } from 'react-window';

// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';
import { ConfirmationNumberOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import useAuth from 'hooks/useAuth';
import { getIncidents } from 'store/slices/incident';
import { useNavigate } from 'react-router-dom';
import { visuallyHidden } from '@mui/utils';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';


import AddIcon from '@mui/icons-material/AddTwoTone';

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
    { id: 'control', label: 'Control Name', },

    {
        id: 'implementationCost',
        label: 'Implementation Cost ($)',
        numeric: false,
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'net',
        label: 'Net Risk',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'control',
        label: 'Control Value',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'actualRisl',
        label: 'Actual Risk Reduction',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'currentROI',
        label: 'Current ROI',
        numeric: false,
        align: 'center',
        format: (value) => typeof value === 'number' && value.toFixed(2)
    },

];

// ==============================|| TABLE HEADER ||============================== //

function EnhancedTableHead({ onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, selected, handleDelete }) {
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>

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
                <IconButton size="large">
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


function Controls({ selectedIncident }) {

    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [search, setSearch] = React.useState('');
    const [currentAsset, setCurrentAsset] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const { customers } = useSelector((state) => state.customer);
    const [divisionSelector, setDivisionSelector2] = React.useState('');
    const { selectedDivision } = useSelector((state) => state.divisionselector);
    const { selectedAsset } = useSelector((state) => state.assetselector);
    const { selectedRisk } = useSelector((state) => state.riskselector);
    const { selectedObjective } = useSelector((state) => state.objectiveselector);
    const { user } = useAuth();
    const [orgTableData, setOrgTableData] = React.useState([]);
    const { incidents } = useSelector((state) => state.incident);

    const [open, setOpen] = React.useState(false);
    const [resetForm, setResetForm] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [expandRow, setExpandRow] = React.useState(false);
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
        dispatch(getIncidents(selectedDivision, user.accessToken));
    };

    // Getting the token

    React.useEffect(() => {
        dispatch(getIncidents(selectedDivision, user.accessToken));
    }, [dispatch, selectedDivision, user.accessToken]);

    React.useEffect(() => {
        setOrgTableData(incidents);
    }, [incidents]);

    React.useEffect(() => {
        setDivisionSelector2(selectedDivision);
        dispatch(getIncidents(selectedDivision, user.accessToken));
    }, [selectedDivision, selectedAsset, selectedRisk, selectedObjective]);

    React.useEffect(() => {
        dispatch(getIncidents(selectedDivision, user.accessToken));
    }, [divisionSelector]);

    const handleDivisionClick = (event, division) => {
    };

    const handleAssetClick = (event, asset) => {
    };

    const handleRiskClick = (event, risk) => {
    };

    const handleObjectiveClick = (event, objective) => {
    };

    const handleDelete = async (selected) => {

    };

    const handleSearch = (event) => {
        const newString = event?.target.value;
        setSearch(newString || '');

        if (newString) {
            const newRows = orgTableData.filter((row) => {
                let matches = true;

                const properties = ['name'];
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
            setOrgTableData(incidents);
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

    const handleOpenEditDialog = (event, row) => {
    };

    const handleCloseEditDialog = () => {
        setOpenEdit(false);
        dispatch(getIncidents(selectedDivision, user.accessToken));
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
    const secondary = theme.palette.secondary.main;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - orgTableData.length) : 0;
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <SubCard title={
                    <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingLeft: '16px' }}>
                        <Box style={{ display: 'flex', alignItems: 'center', }}>
                            <ConfirmationNumberOutlined style={{ marginRight: '8px' }} />
                            <Typography variant="h2" color={secondary}>
                                {selectedIncident.name || 'Data Over-retention'}
                            </Typography>
                        </Box>
                        <Fab
                            color="primary"
                            size="small"
                            onClick={handleClickOpenDialog}
                            sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                        >
                            <AddIcon fontSize="small" />
                        </Fab>
                    </Box>
                }
                >

                    <Grid container spacing={gridSpacing}>
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

                                            return (
                                                <>
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        aria-checked={isItemSelected}
                                                        tabIndex={-1}
                                                        key={index}
                                                        selected={isItemSelected}
                                                    >

                                                        <TableCell component="th" id={labelId} scope="row" sx={{ cursor: 'pointer' }}>
                                                            <Box style={{ display: 'flex', alignItems: 'center', }}>

                                                                <SportsEsportsOutlinedIcon sx={{marginRight: '1rem'}}/>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    sx={{ color: '#db72ff' }}
                                                                    onClick={(event) => {
                                                                        handleOpenEditDialog(event, row);
                                                                    }}
                                                                >
                                                                    {''}
                                                                    {row.name}{' '}
                                                                </Typography>
                                                           </Box>
                                                        </TableCell>
                                                        <TableCell align="center" > $ 1,123,123  </TableCell>
                                                        <TableCell align="center" >$ 1,234</TableCell>
                                                        <TableCell align="center" >$ 987 </TableCell>
                                                        <TableCell align="center" >$ 3,456  </TableCell>
                                                        <TableCell align="center" >  0.31  </TableCell>

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
                        />
                    </Grid>
                </SubCard>

            </Grid>

        </Grid>
    )
}

export default Controls