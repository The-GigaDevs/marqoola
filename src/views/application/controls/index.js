import PropTypes from 'prop-types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
    Fab, Collapse, Tab, Button
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { openSnackbar } from 'store/slices/snackbar';
// project imports
import Chip from 'ui-component/extended/Chip';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import { useDispatch, useSelector } from 'store';
import { getControls, getControlsForTemplate, deleteControl } from 'store/slices/control';
import { getControlTemplates, deleteControlTemplate } from 'store/slices/controltemplate';

import ControlDetails from './ControlDetails';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
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
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
/*
"templateid": null,
        "templatename": null,
        "assetid": "c19c3a4a-fcff-4e2d-8346-5c61f0a90635",
        "assetname": "asset 5",
        "objectiveid": null,
        "objectivename": null,
        "riskid": null,
        "riskname": null,
        "squidid": "5587f38f-971f-477b-ac34-c92bfc8b13b4",
        "squidname": "CIS_AWS_1_1",
        "orgaid": null,
        "organame": null,
        "implementationcost": null,
        "implementationcostformated": "",
        "controlvalue": null,
        "controlvalueformated": "",
        "istemplate": false,
*/
// table header options
const headCells = [
    { id: 'name', label: 'Template Name', minWidth: 170 },
    {
        id: 'totalrisk',
        label: 'Total % of Risk',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'currentriskreduction',
        label: 'Current Risk Reduction',
        numeric: false,
        align: 'center',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'potentialriskreduction',
        label: 'Potential Risk Reduction',
        align: 'center',
        numeric: false,
        
    },
    {
        id: 'implementationcost',
        label: 'Current Implementation Cost',
        align: 'center',
        numeric: true,
        
    },
    {
        id: 'potentialcost',
        label: 'Potential Implementation Cost',
        numeric: true,
        align: 'center',
        format: (value) => typeof value === 'number' && value.toFixed(2)
    },
    {
        id: 'currentroi',
        label: 'Current ROI',
        numeric: true,
        align: 'center',
        format: (value) => typeof value === 'number' && value.toFixed(2)
    },
    {
        id: 'potentialcost',
        label: 'Potential ROI',
        numeric: true,
        align: 'center',
        format: (value) => typeof value === 'number' && value.toFixed(2)
    }
];

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
                <TableCell sx={{ pl: 3 }} />
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

const ControlTable = () => {
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
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [search, setSearch] = React.useState('');
    const [rows, setRows] = React.useState([]);
    const { customers } = useSelector((state) => state.customer);
    const [divisionSelector, setDivisionSelector] = React.useState('');
    const { selectedDivision } = useSelector((state) => state.divisionselector);
    const { selectedAsset } = useSelector((state) => state.assetselector);
    const { selectedRisk } = useSelector((state) => state.riskselector);
    const { user } = useAuth();
    const [assetTableData, setAssetTableData] = React.useState([]);
    const { controltemplates } = useSelector((state) => state.controltemplate);

    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [expandRow, setExpandRow] = React.useState(false);
    const [expandedRow, setExpandedRow] = React.useState([]);

    const handleClickOpenDialog = () => {
        setOpen(true);
    };
    
    // Getting the token

    React.useEffect(() => {

        dispatch(getControlTemplates(divisionSelector, user.accessToken));
    }, [dispatch]);

    React.useEffect(() => {
        setAssetTableData(controltemplates);
    }, [controltemplates]);

    React.useEffect(() => {
        setDivisionSelector(selectedDivision);

    }, [selectedDivision]);

    React.useEffect(() => {
        dispatch(getControls(divisionSelector, selectedAsset, selectedRisk, user.accessToken));
    }, [divisionSelector]);

    const handleDelete = async (selected) => {
        for (var selectedid of selected) {
            dispatch(deleteControl(selectedid));
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
        dispatch(getControls(divisionSelector, selectedAsset, selectedRisk, user.accessToken));
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
        navigate('/control', { state: { id: id } });
    }
    
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

    const handleExpandRow = (event, id) => {
        setExpandRow(!expandRow);
        setExpandedRow(id);
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;
    const isExpanded = (name) => expandedRow.indexOf(name) !== -1;

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - assetTableData.length) : 0;

    function ExpandedRow({ templateid }) {
        const [controlTableData, setControlTableData] = React.useState([]);
        const { controls } = useSelector((state) => state.control);
        React.useEffect(() => {

            dispatch(getControlsForTemplate(templateid, user.accessToken));
        }, [dispatch]);
        
        React.useEffect(() => {
            setControlTableData(controls);
        }, [controls]);
        return (
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                    <Collapse in={expandRow} timeout="auto" unmountOnExit>
                        {expandRow && (
                            <Box sx={{ margin: 1 }}>
                                <TableContainer>
                                    <MainCard
                                        
                                        
                                        content={true}

                                    >
                                        <Table size="small" aria-label="dgfgd">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Control</TableCell>
                                                    <TableCell>Control Category</TableCell>
                                                    <TableCell>Organisation</TableCell>
                                                    <TableCell>Risk</TableCell>
                                                    <TableCell>Concept</TableCell>
                                                    <TableCell>Implementation</TableCell>
                                                    <TableCell>Control Value</TableCell>
                                                    <TableCell>Vulnerability</TableCell>
                                                    <TableCell>Last Tested</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                            {controls.map((controlRow) => (<>
                                                    <TableRow hover key={controlRow.id}>
                                                        <TableCell component="th" scope="row" 
                                            onClick={(event) => { if (selected.length === 0) handleOpenEditDialog(event, controlRow.id) }}>
                                                            {controlRow.name}
                                                            <Typography variant="caption"> Asset: {controlRow.assetname} </Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            {controlRow.controlcategoryname}
                                                        </TableCell>
                                                        <TableCell>
                                                            {controlRow.organame}
                                                        </TableCell>
                                                        <TableCell>
                                                            {controlRow.riskname}
                                                        </TableCell>
                                                        <TableCell>
                                                            {controlRow.securityconceptname}
                                                        </TableCell>
                                                        <TableCell>
                                                            {controlRow.implementationcostformated}
                                                        </TableCell>
                                                        <TableCell>
                                                            {controlRow.controlvalueformated}
                                                        </TableCell>
                                                        <TableCell>
                                                            {controlRow.vulnerability}
                                                        </TableCell>
                                                        <TableCell>
                                                            {controlRow.lasttested? controlRow.lasttested: "Never"}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Button variant='contained' color="secondary">Run Test</Button>
                                                        </TableCell>
                                                    </TableRow>
                                                    
                                                    </>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </MainCard>
                                </TableContainer>
                            </Box>
                        )}
                    </Collapse>
                </TableCell>
            </TableRow>
        )
    }

    return (
        <MainCard title="Control Templates" content={false}>
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
                        </Tooltip>{
                       // <AssetCreateForm open={open} parentData={assetTableData} handleCloseDialog={handleCloseDialog} />
                     }
                    </Grid>
                </Grid>
            </CardContent>

            {/* table */}
            <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                        {stableSort(assetTableData, getComparator(order, orderBy))
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
                                        <TableCell sx={{ pl: 3 }}>
                                            <IconButton aria-label="expand row" size="small" onClick={(event) => { handleExpandRow(event, row.id) }}>
                                                {expandRow ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                            </IconButton>
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
                                                {row.name} - {row.title}
                                            </Typography>
                                            
                                        </TableCell>
                                        <TableCell>{row.totalriskpercentage ? row.totalriskpercentage : 0}%</TableCell>
                                        <TableCell align="center">{row.currentriskreduction ? row.currentriskreductionformatted : '0'}</TableCell>
                                        <TableCell align="center">{row.potentialriskreduction ? row.potentialriskreductionformatted : '0'}</TableCell> 
                                        <TableCell align="center">
                                            {row.implementationcost? row.implementationcostformated : '0'}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.potentialimplementationcost? row.potentialimplementationcostformated : '0'}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.currentroi? row.currentroiformatted  : '0'}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.potentialroi? row.potentialroiformatted  : '0'}
                                        </TableCell>

                                    </TableRow>
                                    {isRowExpanded && (
                                        <ExpandedRow templateid={row.id}  />
                                    )}
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
                {
                
                //<AssetEditForm open={openEdit} parentData={assetTableData} handleCloseDialog={handleCloseEditDialog} assetid={currentAsset} />
                }
                </TableContainer>

            {/* table pagination */}
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={assetTableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </MainCard>
    );
};

export default ControlTable;
