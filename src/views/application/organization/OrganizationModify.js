import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState,useCallback } from 'react';
import axios from 'utils/axios';
// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
    Button,
    CardMedia,
    Chip,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    Grid,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Slide,
    TextField,
    Typography
} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';

import Product1 from 'assets/images/widget/prod1.jpg';
import Product2 from 'assets/images/widget/prod2.jpg';
import Product3 from 'assets/images/widget/prod3.jpg';
import Product4 from 'assets/images/widget/prod4.jpg';

// styles
const ImageWrapper = styled('div')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '4px',
    cursor: 'pointer',
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: theme.palette.background.default,
    '& > svg': {
        verticalAlign: 'sub',
        marginRight: 6
    }
}));


// product category options
const categories = [
    {
        value: '1',
        label: 'Division 1'
    },
    {
        value: '2',
        label: 'Division 2'
    },
    {
        value: '3',
        label: 'Division 3'
    },
    {
        value: '4',
        label: 'Division 4'
    }
];

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    chip: {
        margin: 2
    }
};

// tags list & style
const tagNames = ['Html', 'Scss', 'Js', 'React', 'Ionic', 'Angular', 'css', 'Php', 'View'];

function getStyles(name, personName, theme) {
    return {
        fontWeight: personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
    };
}

// ==============================|| PRODUCT ADD DIALOG ||============================== //

const OrganizationModify = ({ open, parents, orgId, handleCloseDialog }) => {
    
    const theme = useTheme();

    const closeDialog = async () => {
        
        try {
            console.log(parents)
            const response =  await axios.get('/objects/organisations?limit=1').then(handleCloseDialog);
           
        } catch (error) {
            console.log('Could not save org:', error)
        }
    
}
    
    const handleSaveOrganisation = async () => {
        
            try {
                
                const response =  await axios.post('/objects/organisations/' + orgId.id, {name: name,
                parentid: currency,
                costOfBreach: costOfBreach,
                data: {
                    description: description,
                    title: name 
                }},{
                    headers: {
                      // Overwrite Axios's automatically set Content-Type
                      'Content-Type': 'application/json'
                    }
                  }).then(handleCloseDialog);
                console.log(response)
            } catch (error) {
                console.log('Could not save org:', error)
            }
        
    }

    const [orgData, setOrgData] = useState([]);
    var aaa;

    const getOrgData = useCallback(async () => {
        try {
            const response = await axios.get('/objects/organisations');
            setOrgData(response.data);
            aaa = response.data;
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        getOrgData();
    }, [getOrgData]);

    // handle category change dropdown
    const [costOfBreach, setCostOfBreach] = useState('');
    const [currency, setCurrency] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const handleSelectChange = (event) => {
        setCurrency(event?.target.value);
    };

    
    // set image upload progress
    const [progress, setProgress] = useState(0);
    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
            } else {
                const diff = Math.random() * 10;
                setProgress(progress + diff);
            }
        };
    });

    useEffect(() => {
        setCurrency(orgId.parentid)
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // handle tag select
    const [personName, setPersonName] = useState([]);
    const handleTagSelectChange = (event) => {
        setPersonName(event?.target.value);
    };


    return (
        <Dialog
            open={open && orgData}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                    justifyContent: 'flex-end',
                    '&>div': {
                        m: 0,
                        borderRadius: '0px',
                        maxWidth: 450,
                        maxHeight: '100%'
                    }
                }
            }}
        >
            {open && orgData &&(
                <>
                    <DialogTitle>Update Organisation</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic1" onChange={(event) => {setName(event.target.value)}} fullWidth label="Enter Organisation Name" defaultValue={orgId.name} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic2"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Enter a description"
                                    defaultValue={orgId.data.description}
                                    onChange={(event) => {setDescription(event.target.value)}}
                                />
                                  
                            </Grid>
                            <Grid item xs={12}>
                            
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="Select Parent*"
                                    value={currency}
                                    fullWidth
                                    onChange={(event) => {setCurrency(event.target.value)}}
                                    helperText="Please select Parent"
                                >
                                    {orgData.map((parent) => (
                                        <MenuItem key={parent.id} value={parent.id}>
                                            {parent.name}
                                        </MenuItem>
                                    ))}
                                    
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic1" 
                                        onChange={(event) => {setCostOfBreach(event.target.value)}} 
                                        fullWidth label="Cost of Breach" 
                                        helperText="The total cost of breach for this organisation"
                                        defaultValue={orgId.costofbreach + 1}
                                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                />
                            </Grid>
                            
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant="contained" onClick={handleSaveOrganisation}>Update</Button>
                        </AnimateButton>
                        <Button variant="text" color="error" onClick={closeDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

OrganizationModify.propTypes = {
    open: PropTypes.bool,
    orgId: PropTypes.object,
    handleCloseDialog: PropTypes.func,
    parents: PropTypes.object
};

export default OrganizationModify;
