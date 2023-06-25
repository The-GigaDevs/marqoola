import PropTypes from 'prop-types';
import { forwardRef, useEffect, useRef, useState } from 'react';
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

const OrganizationAdd = ({ open, handleCloseDialog }) => {
    const theme = useTheme();
    

    const handleSaveOrganisation = async () => {
        
            try {
                
                const response =  await axios.post('/objects/organisations', {name: name,
                parentid: 1,
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
    // handle category change dropdown
    const [currency, setCurrency] = useState('2');
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
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
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
            {open && (
                <>
                    <DialogTitle>Create Organisation</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                            <Grid item xs={12}>
                                <TextField id="outlined-basic1" onChange={(event) => {setName(event.target.value)}} fullWidth label="Enter Organisation Name" defaultValue="Organisation name" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="outlined-basic2"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    label="Enter a description"
                                    defaultValue="Some meaningful description of the division"
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
                                    onChange={handleSelectChange}
                                    helperText="Please select Parent"
                                >
                                    {categories.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant="contained" onClick={handleSaveOrganisation}>Create</Button>
                        </AnimateButton>
                        <Button variant="text" color="error" onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    );
};

OrganizationAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func
};

export default OrganizationAdd;
