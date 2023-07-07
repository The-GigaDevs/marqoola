import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography , Dialog} from '@mui/material';

// project imports
import BasicInformation from './BasicInformation';
import DivisionDetails from './DivisionDetails';
import Review from './Review';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import { getOrganisations } from 'store/slices/organisation';
import { useDispatch, useSelector } from 'store';
import { useEffect, useState } from 'react';
import IndustryInformation from './IndustryInformation';
import RiskTolerance from './RiskTolerance';


// step options
const steps = ['Basic information', 'Division details', 'Industry information', 'Risk tolerance'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, basicInformationData, setBasicInformationData, divisionDetailsData, setDivisionDetailsData, industryInformationData, setIndustryInformationData, parentData, currencies, industries, subindustries) => {
    switch (step) {
        case 0:
            return (
                <BasicInformation
                    handleNext={handleNext}
                    setErrorIndex={setErrorIndex}
                    basicInformationData={basicInformationData}
                    setBasicInformationData={setBasicInformationData}
                />
            );
        case 1:
            return (
                <DivisionDetails
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    divisionDetailsData={divisionDetailsData}
                    setDivisionDetailsData={setDivisionDetailsData}
                    parentData={parentData}
                    currencies={currencies}
                />
            );
        case 2:
            return (
                <IndustryInformation
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    industryInformationData={industryInformationData}
                    setIndustryInformationData={setIndustryInformationData}
                    parentData={parentData}
                    industries={industries}
                    subindustries={subindustries}
                />
            );
        case 3:
            return (
                <RiskTolerance
                    handleNext={handleNext}
                    handleBack={handleBack}
                    setErrorIndex={setErrorIndex}
                    divisionDetailsData={divisionDetailsData}
                    setDivisionDetailsData={setDivisionDetailsData}
                    parentData={parentData}
                />
            );
            case 4:
                return (
                    <Review
                    />
                );
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ValidationWizard = ({ open, handleCloseDialog, parentData, currencies, industries , subindustries}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [basicInformationData, setBasicInformationData] = React.useState({});
    const [divisionDetailsData, setDivisionDetailsData] = React.useState({});
    const [industryInformationData, setIndustryInformationData] = React.useState({});
    const [errorIndex, setErrorIndex] = React.useState(null);
    
    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setErrorIndex(null);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return ( <Dialog
        open={open}
        onClose={handleCloseDialog}
        sx={{
            '&>div:nth-of-type(3)': {
                '&>div': {
                    maxWidth: 800
                }
            }
        }}
    > 
    {open && parentData.length > 0 && (
        <MainCard title="Create Organisational Entity">
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label, index) => {
                    const labelProps = {};

                    if (index === errorIndex) {
                        labelProps.optional = (
                            <Typography variant="caption" color="error">
                                Error
                            </Typography>
                        );

                        labelProps.error = true;
                    }

                    return (
                        <Step key={label}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <Review
                        />
                    </>
                ) : (
                    <>
                        {getStepContent(
                            activeStep,
                            handleNext,
                            handleBack,
                            setErrorIndex,
                            basicInformationData, setBasicInformationData,
                            divisionDetailsData, setDivisionDetailsData,
                            industryInformationData, setIndustryInformationData,
                            parentData,
                            currencies,
                            industries,
                            subindustries
                        )}
                        {activeStep === steps.length -1 && (
                            <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                                {activeStep !== 0 && (
                                    <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                        Back
                                    </Button>
                                )}
                                <AnimateButton>
                                    <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1 }}>
                                        {activeStep === steps.length -1 ? 'Place order' : 'Next'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        )}
                    </>
                )}
            </>
        </MainCard>)}
        </Dialog>
    );
};

ValidationWizard.propTypes = {
    open: PropTypes.bool,
    handleCloseDialog: PropTypes.func,
    parentData: PropTypes.object,
    currencies: PropTypes.object,
    industries: PropTypes.object
};
export default ValidationWizard;
