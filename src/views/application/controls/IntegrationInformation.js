import PropTypes from 'prop-types';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';

// material-ui
import { styled } from '@mui/material/styles';
import { Button, Dialog, Grid, IconButton, Typography, Stack, Box, ButtonGroup, Tabs, Tab } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { IconChevronLeft, IconChevronRight } from '@tabler/icons';

// assets
import CloseIcon from '@mui/icons-material/Close';
const avatarImage = require.context('assets/images/integrations', true);
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2)
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1)
    }
}));

function TabPanel({ children, value, index, ...other }) {
    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}



const BootstrapDialogTitle = ({ children, onClose, ...other }) => (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (<>
            <IconButton disabled
                aria-label="close"

                sx={{
                    position: 'absolute',
                    right: 35,
                    top: 10,
                    color: (theme) => theme.palette.grey[500],
                    scale: '1.5'
                }}
            >
                <IconChevronLeft />
            </IconButton>
            <IconButton
                aria-label="close"
                variant="outlined"
                sx={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    color: (theme) => theme.palette.grey[500],
                    scale: '1.5'
                }}
            >
                <IconChevronRight />
            </IconButton>
        </>) : null}
    </DialogTitle>
);

BootstrapDialogTitle.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node
};

export default function IntegrationInformation({ setOpen, open }) {
    //const [open, setOpen2] = React.useState(false);
    const [value, setValue] = useState(1);
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} fullWidth maxWidth='md' >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <IconButton onClick={handleClose}>
                        <IconChevronLeft />
                        <Typography variant="h8" sx={{ flexGrow: 1 }}>
                            Back
                        </Typography>
                    </IconButton>


                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Grid container spacing={1} sm={12}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Amazon Web Services
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" gutterBottom>
                                Ensure all S3 buckets employ encryption-at-rest (Automated)
                            </Typography>
                            <br />
                        </Grid>

                        <Grid container xs={12}>
                            <Grid item xs={3}>
                                <Box display="flex" justifyContent="flex-start">
                                    <img src={avatarImage(`./45.AmazonWebServices.png`)} />
                                </Box>
                            </Grid>
                            <Grid item xs={9} >
                                <Box display="flex" justifyContent="flex-end">
                                    <Stack direction="column" >
                                        <Typography variant="h4">
                                            Description:
                                        </Typography>
                                        <Typography variant="h6">
                                            Amazon S3 provides a variety of no or low cost encryption options to protect data at rest
                                        </Typography>
                                        <br />
                                        <Typography variant="h4">
                                            Rationale:
                                        </Typography>
                                        <Typography variant="h6" noWrap={false}>
                                            Encryption data at rest reduces the likelihood that it is unintentionally exposed and <br />can nullify the impact of exposure if the encryption remains unbroken.
                                        </Typography>
                                        <br />
                                        <Typography variant="h4">
                                            Impact:
                                        </Typography>
                                        <Typography variant="h6" noWrap={false}>
                                            Amazon S3 buckets with the default encryption using SSE-KMS cannot be <br />used as destination buckets for Amazon S3 server access logging. Only SSE-S3<br />default encryption is supported for server access log destination buckets.
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                        <br />

                        <Grid item xs={12}>
                            <br />
                            <Box display="flex" justifyContent="center">
                                <Tabs
                                    value={value}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    onChange={handleChange}
                                    variant="scrollable"
                                    aria-label="simple tabs example"
                                    sx={{
                                        '& a': {
                                            minHeight: 'auto',
                                            minWidth: 10,
                                            px: 5,
                                            py: 1.5,
                                            mr: 2.25,
                                            color: theme.palette.grey[600],
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        },
                                        '& a.Mui-selected': {
                                            color: theme.palette.primary.main
                                        },
                                        '& a > svg': {
                                            marginBottom: '0px !important',
                                            marginRight: 1.25
                                        },
                                        mb: 3
                                    }}
                                >
                                    <Tab component={Link} to="#" label="From Integration" {...a11yProps(0)} />
                                    <Tab component={Link} to="#" label="From Console" {...a11yProps(1)} />
                                    <Tab component={Link} to="#" label="From Command Line" {...a11yProps(2)} />

                                </Tabs>


                            </Box>
                            <TabPanel value={value} index={0}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h4">
                                                    From Console
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ol>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Login to AWS Management Console and open the Amazon S3 console using <a href='http://google.com'>https://console.aws.amazon.com/s3/</a>
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Select a bucket
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Click on properties
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Verify that default encryption is enabled, and displays either AES-256, AWS-KMS, SSE-KMS or SSE-S3
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Repeat for all the buckets in your AWS account
                                                        </Typography>
                                                    </li>
                                                </ol>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12}>
                                                <Typography variant="h4">
                                                    From Console
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ol>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Login to AWS Management Console and open the Amazon S3 console using <a href='http://google.com'>https://console.aws.amazon.com/s3/</a>
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Select a bucket
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Click on properties
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Verify that default encryption is enabled, and displays either AES-256, AWS-KMS, SSE-KMS or SSE-S3
                                                        </Typography>
                                                    </li>
                                                    <li>
                                                        <Typography variant="h6">
                                                            Repeat for all the buckets in your AWS account
                                                        </Typography>
                                                    </li>
                                                </ol>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </TabPanel>
                        </Grid>
                    </Grid>

                </DialogContent>

            </BootstrapDialog>
        </div>
    );
}

IntegrationInformation.propTypes = {
    setOpen: PropTypes.func
};