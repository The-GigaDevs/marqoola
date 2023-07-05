import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { React,forwardRef, useEffect, useRef, useState, Fragment } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'utils/axios';
// material-ui

import { useDispatch, useSelector } from 'store';

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
import {addEnum, getEnums } from 'store/slices/enumerations';
// assets

import CloseIcon from '@mui/icons-material/Close';

// animation
const Transition = forwardRef((props, ref) => <Slide direction="left" ref={ref} {...props} />);

const validationSchema = yup.object({
    name: yup
      .string('Enter your email')

      .required('name is required'),
    tablename: yup
      .string('Enter your password')

      .required('Password is required'),
  });


// ==============================|| ENUMERATION ADD DIALOG ||============================== //

const EnumAdd = ({enumeration, open, handleCloseDialog, onSubmit ,onSave, onCancel}) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const [newenum, setEnum] = useState(enumeration);
    useEffect(() => {
        setEnum(enumeration);
    }, [enumeration]);


    useEffect(() => {
        dispatch(getEnums());
    }, [dispatch]);



    const formik = useFormik({
        initialValues: {
          name: '',
          tablename: '',
        },
        validationSchema: validationSchema,
        onSubmit: async  (values,{ resetForm, setSubmitting }) => {
           
            handleCloseDialog();
            axios
            .post('/manager/enum/new', values, {
 
            })
            .then(resp => {
              //setSubmitionCompleted(true);
              resetForm();

              dispatch(getEnums());

              handleCloseDialog();

              
            });

         //addEnum(JSON.stringify(values, null, 2));
        },
      });
    return (
        <Fragment>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleCloseDialog}
            sx={{
                '&>div:nth-of-type(3)': {
                
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
               <form onSubmit={formik.handleSubmit}>
                    <DialogTitle>Add Enumeration</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={gridSpacing} sx={{ mt: 0.25 }}>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Enter Enumeration Name*"   
                                          id="name"
                                          name="name"
             
                                          value={formik.values.name}
                                          onChange={formik.handleChange}    
                                          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}                              
                                // value={newenum.name}
                                //     onChange={(e) => setEnum({ ...newenum, name: e.target.value })} 
                                    />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField  fullWidth label="Enter Enumeration Table*" defaultValue="" 
                                   id="tablename"
                                   name="tablename"
                                       value={formik.values.tablename}
                                       onChange={formik.handleChange}       
                                       error={formik.touched.tablename && Boolean(formik.errors.tablename)}
          helperText={formik.touched.tablename && formik.errors.tablename}     
                                />
                            </Grid>                        

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <AnimateButton>
                            <Button variant="contained" type="submit">Create</Button>
                        </AnimateButton>
                        <Button variant="text" color="error" onClick={handleCloseDialog}>
                            Close
                        </Button>
                    </DialogActions>
                    </form>
            )}
        </Dialog>
        </Fragment>
    );
  
};



EnumAdd.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    onSave: PropTypes.func
};

export default EnumAdd;
