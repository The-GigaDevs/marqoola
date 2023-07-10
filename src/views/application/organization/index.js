import PropTypes from 'prop-types';
import * as React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    CardContent,
    Fab,
    Grid,
    IconButton,
    Tooltip,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// project imports
import OrganizationAdd from './OrganizationAdd';
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import { getOrganisations } from 'store/slices/organisation';
import { getCurrencies } from 'store/slices/currency';

// assets
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterListTwoTone';
import PrintIcon from '@mui/icons-material/PrintTwoTone';
import FileCopyIcon from '@mui/icons-material/FileCopyTwoTone';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/AddTwoTone';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import OrganizationChart from './OrganizationChart';
import CreateForm from './createform'
import { getIndustries, getSubIndustries } from 'store/slices/industry';

const OrganizationList = () => {
    const theme = useTheme();
    const dispatch = useDispatch();

    // show a right sidebar when clicked on new product
    const [open, setOpen] = React.useState(false);
    const [resetForm, setResetForm] = React.useState(false);

    const handleClickOpenDialog = () => {
        setOpen(true);
        setResetForm(false);
    };
    const handleCloseDialog = () => {
        setOpen(false);
        setResetForm(true);
    };

    


    const [rows, setRows] = React.useState([]);
    const [currencyData, setCurrencies] = React.useState([]);
    const [industryData, setIndustries] = React.useState([]);
    const [subIndustryData, setSubIndustries] = React.useState([]);
    const { organisations } = useSelector((state) => state.organisation);
    const { currencies } = useSelector((state) => state.currency);
    const { industries } = useSelector((state) => state.industry);
    const { subindustries } = useSelector((state) => state.subindustry);
    
    React.useEffect(() => {
        dispatch(getOrganisations());
        dispatch(getCurrencies());
        dispatch(getIndustries());
        dispatch(getSubIndustries());
    }, [dispatch]);
    React.useEffect(() => {
        setRows(organisations);
    }, [organisations]);

    React.useEffect(() => {
        setCurrencies(currencies);
    }, [currencies]);

    React.useEffect(() => {
        setIndustries(industries);
    }, [industries]);

    React.useEffect(() => {
        setSubIndustries(subindustries);
    }, [subindustries]);

    React.useEffect(() => {
        dispatch(getOrganisations());
    }, [open]);



    return (
        <MainCard title="Organizations" content={false}>
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={6}>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
                        <Tooltip title="Copy">
                            <IconButton size="large">
                                <FileCopyIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Print">
                            <IconButton size="large">
                                <PrintIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter">
                            <IconButton size="large">
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>

                        {/* product add & dialog */}
                        <Tooltip title="Create Organization">
                            <Fab
                                color="primary"
                                size="small"
                                onClick={handleClickOpenDialog}
                                sx={{ boxShadow: 'none', ml: 1, width: 32, height: 32, minHeight: 32 }}
                            >
                                <AddIcon fontSize="small" />
                            </Fab>
                        </Tooltip>
                        <CreateForm open={open} handleCloseDialog={handleCloseDialog} resetForm={resetForm} setResetForm={setResetForm} parentData={rows} currencies={currencyData} industries={industryData} subindustries={subIndustryData}/>
                    </Grid>
                </Grid>
            </CardContent>

           
            <OrganizationChart rows={rows} open={open} handleCloseDialog={handleCloseDialog} />
        </MainCard>
        
    );
};

export default OrganizationList;
