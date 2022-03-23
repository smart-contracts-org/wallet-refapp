import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { CreateAccountForm } from '../CreateAccountForm/CreateAccountForm';
import { isMobile } from '../../platform/platform';
import { Card, CardContent, Paper } from '@mui/material';
import { CreateAssetAccountSuccess } from '../CreateAssetAccountSuccess/CreateAssetAccountSuccess';


const steps = ['Create Asset Account', 'Issue Assets'];

export const CreateAssetAccountSteps: React.FC = () => {

  const isStepFailed = (step: number) => {
    return false;
  };
  const [displayedStep, setDisplayStep] = React.useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  
  const [completed, setCompleted] = React.useState<{[k: number]: boolean}>({});
  const [isSubmitSuccessful, setSubmitSuccessful] = React.useState(false);


  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const setDisplayandActiveSteps = (display: number, active:number) => {
    setDisplayStep(display);
    setActiveStep(active)
  }

  //TODO: submitting form calling API
  const onSubmitSuccess = () => {
    
    setTimeout(() => {
      setSubmitSuccessful(true);
      setDisplayStep(displayedStep+1)
      handleComplete();
    }, 1000)
   
    

  }

  return (
    <Box sx={{ maxWidth: '600px' }}>
      <Stepper alternativeLabel={isMobile()} activeStep={activeStep} sx={{ paddingTop: 2, paddingBottom: 2 }}>
        {steps.map((label, index) => {
          
          const labelProps: {
            optional?: React.ReactNode;
            error?: boolean;
          } = {};
          if (isStepFailed(index)) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Alert message
              </Typography>
            );
            labelProps.error = true;
          }
            return (
            <Step key={label} completed={completed[index]}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Paper>

        {displayedStep === 0 && !isSubmitSuccessful && (<Card>
          <CardContent>
            <CreateAccountForm onSubmitSuccess={onSubmitSuccess} />
          </CardContent>
        </Card>)
        }
        {
          isSubmitSuccessful && 
          displayedStep === 1 && 
          
          <CreateAssetAccountSuccess 
          onNextClick={() => {setDisplayandActiveSteps(displayedStep+1, activeStep)}} 
          onDoneClick={() => setDisplayandActiveSteps(4,0)} />
        }
      </Paper>
    </Box>
  );
}
