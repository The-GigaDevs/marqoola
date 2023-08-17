// material-ui
import { useTheme } from '@mui/material/styles';
import useAuth from 'hooks/useAuth';
import { useEffect, useState } from 'react';
import {
    Grid,
    Stack,
    Typography,
    Card, CardContent, TextField, MenuItem, Button
} from '@mui/material';

import { useFormik } from 'formik';
import * as yup from 'yup';


// project imports

import AnimateButton from 'ui-component/extended/AnimateButton';
import SubCard from 'ui-component/cards/SubCard';
import Chip from 'ui-component/extended/Chip';
import { gridSpacing } from 'store/constant';
import ReactApexChart from 'react-apexcharts';

import { useDispatch, useSelector } from 'store';
import useConfig from 'hooks/useConfig';

import { getAssetTypes } from 'store/slices/assettype';
import { getOrganisations } from 'store/slices/organisation';
import { getAssets, updateAsset } from 'store/slices/asset';


const Details = (controlData) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const { selectedAsset } = useSelector((state) => state.asset);
    const { assettypes } = useSelector((state) => state.assettype);
    const { assets } = useSelector((state) => state.asset);
    const { organisations } = useSelector((state) => state.organisation);
    const [controlMetrics, setControlMetrics] = useState([]);
    const { metrics } = useSelector((state) => state.organisation);
    const [series, setSeries] = useState([]);
    const [options, setOptions] = useState({});

    useEffect(() => {
        if (selectedAsset.metrics){
            for(let i = 0; i < selectedAsset.metrics.length; i++){
                let obj = selectedAsset.metrics[i];
                values.push(obj.value)
                xaxis.push(new Date(Date.parse(obj.eventdate)).toLocaleDateString("en-US"))
        
            }
            
            setSeries([{
                name: 'Implementation Cost',
                data: values
            }])
            setOptions({chart: {
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                categories: xaxis
            }})
        }
        dispatch(getAssetTypes(user.accessToken));
        dispatch(getOrganisations(user.accessToken));
        dispatch(getAssets(user.accessToken));
    }, []);

    useEffect(() => {
        
    }, [selectedAsset]);


    useEffect(() => {
        setControlMetrics(metrics);
        
    }, [metrics]);
    
    

    const { primary } = theme.palette.text;
    const darkLight = theme.palette.dark.light;
    const grey200 = theme.palette.grey[200];
    const secondary = theme.palette.secondary.main;
    let values = [];
    let xaxis = [];
    const { navType } = useConfig();
    

    useEffect(() => {
        setOptions((prevState) => ({
            ...prevState,

        }));
    }, [navType, primary, darkLight, grey200, secondary]);
    
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedAsset.name,
            parent: selectedAsset.parentid,
            description: selectedAsset.data && selectedAsset.data.description,
            assettype: selectedAsset.assettypeid,
        },
        onSubmit: (values, helpers) => {
            handleSaveAsset();
        }
    });

    const handleSaveAsset = async () => {
        const data = {
            name: formik.values.name,
            parent: formik.values.parent,
            orgaId: 'a5e8bdf5-8cf1-424f-ae50-9354c2d870e8',
            data: {
                description: formik.values.description,
            },
            assettype: formik.values.assettype,
        }
        dispatch(updateAsset(selectedAsset.id, data, user.accessToken));
    }

    return selectedAsset && series &&  (
        <form onSubmit={formik.handleSubmit} id="asset-details">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <SubCard title={<><Typography variant="h1" color={secondary}> {selectedAsset.name}</Typography> 
                        
                        </>}
                        >
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={8}>        
                                <div id="chart">
                                    <ReactApexChart options={options} series={series} type="area" height={550} />
                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <Stack direction="column" spacing={1}>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h3">{selectedAsset.controlvalueformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color={secondary}>
                                                            Asset Value
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h3">{selectedAsset.intrinsicassetvalueformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color={secondary}>
                                                            Intrinsic Asset Value
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h3">{selectedAsset.implementationcostformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color={secondary}>
                                                            Business Continuity
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid item >
                                        <Card sx={{ border: `1px solid ${theme.palette.secondary.main}`}}>  
                                            <CardContent>
                                                <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h3">{selectedAsset.totalassetvalueformated}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="subtitle1" color={secondary}>
                                                            Total Asset Value
                                                        </Typography>
                                                    </Grid>
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    
                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                            <Stack direction="column" spacing={3} >
                                                    <Grid item>
                                                        <TextField
                                                            id="name"
                                                            name="name"
                                                            label="Name"
                                                            value={formik.values.name || selectedAsset.name}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.name && Boolean(formik.errors.name)}
                                                            helperText={formik.touched.name && formik.errors.name}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                        <TextField
                                                            id="description"
                                                            name="description"
                                                            label="Description"
                                                            value={formik.values.description || selectedAsset.data && selectedAsset.data.description}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.description && Boolean(formik.errors.description)}
                                                            helperText={formik.touched.description && formik.errors.description}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item>
                                                    <TextField
                                                            id="assettype"
                                                            name="assettype"
                                                            label="Asset Type"
                                                            value={formik.values.assettype || selectedAsset.assettype}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.assettype && Boolean(formik.errors.assettype)}
                                                            helperText={formik.touched.assettype && formik.errors.assettype}
                                                            fullWidth
                                                            select
                                                        >
                                                            {
                                                                assettypes && assettypes.map((parent) => (
                                                                    <MenuItem key={parent.id} value={parent.id}>
                                                                        {parent.label}
                                                                    </MenuItem>
                                                                ))}
                                                        </TextField>
                                                    </Grid>
                                                    <Grid item>
                                            <TextField
                                                id="owner"
                                                name="owner"
                                                label="Owner Name"
                                                value={formik.values.owner || selectedAsset.owner}
                                                onChange={formik.handleChange}
                                                error={formik.touched.owner && Boolean(formik.errors.owner)}
                                                helperText={formik.touched.owner && formik.errors.owner}
                                                fullWidth
                                            />
                                        </Grid>  
                                                </Stack>
                            </Grid>
                            <Grid item xs={6}>
                                <Stack direction="column" spacing={3} >
                                        
                                        <Grid item>
                                            <TextField
                                                id="parent"
                                                name="parent"
                                                label="Parent"
                                                value={formik.values.parent || selectedAsset.parentid}
                                                onChange={formik.handleChange}
                                                error={formik.touched.parent && Boolean(formik.errors.parent)}
                                                helperText={formik.touched.parent && formik.errors.parent}
                                                fullWidth
                                                select
                                            >
                                                {
                                                    assets && assets.map((parent) => (
                                                        <MenuItem key={parent.id} value={parent.id}>
                                                            {parent.name}
                                                        </MenuItem>
                                                    ))}
                                            </TextField>
                                        </Grid>  
                                    </Stack>                                  
                            </Grid>
                        </Grid>
                        
                    </SubCard>
                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <AnimateButton>
                                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={handleSaveAsset} >
                                    Save
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Grid>
                </Grid>
                
            </Grid>
        </form>
    );
};

export default Details;
