import React from 'react';
import PropTypes from 'prop-types';
import axios from 'utils/axios';
// material-ui
import { Button, Step, Stepper, StepLabel, Stack, Typography , Dialog} from '@mui/material';

// project imports
import BasicInformation from './BasicInformation';
import DivisionDetails from './DivisionDetails';
import Review from './Review';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import IndustryInformation from './IndustryInformation';
import RiskTolerance from './RiskTolerance';


// step options
const steps = ['Basic information', 'Division details', 'Industry information', 'Risk tolerance', 'Review'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, resetFormData, handleResetData, basicInformationData, setBasicInformationData, divisionDetailsData, setDivisionDetailsData, industryInformationData, setIndustryInformationData, riskToleranceData, setRiskToleranceData, parentData, currencies, industries, subindustries) => {
    switch (step) {
        case 0:
            return (
                <BasicInformation
                    handleNext={handleNext}
                    setErrorIndex={setErrorIndex}
                    resetFormData={resetFormData}
                    handleResetData={handleResetData}
                    basicInformationData={basicInformationData}
                    setBasicInformationData={setBasicInformationData}
                    parentData={parentData}
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
                    riskToleranceData={riskToleranceData}
                    setRiskToleranceData={setRiskToleranceData}
                    parentData={parentData}
                />
            );
            case 4:
                return (
                    <Review
                        basicInformationData={basicInformationData}
                        divisionDetailsData={divisionDetailsData}
                        industryInformationData={industryInformationData}
                        riskToleranceData={riskToleranceData}
                    />
                );
        default:
            throw new Error('Unknown step');
    }
};

// ==============================|| FORMS WIZARD - BASIC ||============================== //

const ValidationWizard = ({ open, handleCloseDialog, resetForm, setResetForm, parentData, currencies, industries , subindustries}) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [basicInformationData, setBasicInformationData] = React.useState({});
    const [divisionDetailsData, setDivisionDetailsData] = React.useState({});
    const [industryInformationData, setIndustryInformationData] = React.useState({});
    const [riskToleranceData, setRiskToleranceData] = React.useState({});
    const [errorIndex, setErrorIndex] = React.useState(null);
    
    const [resetFormData, setResetFormData] = React.useState(false);

    

    const handleResetData = () => {
        setResetFormData(resetForm)
        setActiveStep(0);
    }
    

    const handleNext = () => {
        setActiveStep(activeStep + 1);
        setErrorIndex(null);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    React.useEffect(() => {
        if (open == false)
        {
            setActiveStep(0);
            setBasicInformationData({});
            setDivisionDetailsData({});
            setIndustryInformationData({});
            setRiskToleranceData({});
        }
    }, [open]);
    
    
    const handleSaveOrganisation = async () => {
        
        try {
            
            const response =  await axios.post('/objects/organisations', {name: basicInformationData.name,
            annualrevenue: {number:parseInt(divisionDetailsData.revenue),currency:divisionDetailsData.currency}, 
            parentid: basicInformationData.parent,
            data: {
                description: basicInformationData.description,
                title: basicInformationData.name,
                numemployees: parseInt(divisionDetailsData.numEmployees),
                industry: industryInformationData.industry,
                subindustry: industryInformationData.subIndustry,
                numcustomers: industryInformationData.numCustomers,
                sliderdata: riskToleranceData.sliderData,
                riskclassification: riskToleranceData.riskClassification
            }},{
                headers: {
                  // Overwrite Axios's automatically set Content-Type
                  'Content-Type': 'application/json'
                }
              }).then(handleCloseDialog);
            console.log(response)
        } catch (error) {
            console.log('Could not save org:', error)
            handleCloseDialog();
        }
    
}

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
                            resetFormData, handleResetData,
                            basicInformationData, setBasicInformationData,
                            divisionDetailsData, setDivisionDetailsData,
                            industryInformationData, setIndustryInformationData,
                            riskToleranceData, setRiskToleranceData,
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
                                    <Button variant="contained" onClick={activeStep === steps.length -1 ? handleSaveOrganisation : handleNext} sx={{ my: 3, ml: 1 }}>
                                        {activeStep === steps.length -1 ? 'Create' : 'Next'}
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
