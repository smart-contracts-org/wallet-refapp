import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { CreateAccountForm } from '../CreateAccountForm/CreateAccountForm';
import { isMobile } from '../../platform/platform';
import { Card, CardContent, Paper } from '@mui/material';


const steps = ['Create Asset Account', 'Issue Assets'];

export const CreateAssetAccountSteps: React.FC = () => {

  const isStepFailed = (step: number) => {
    return false;
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const [completed, setCompleted] = React.useState<{ [k: number]: boolean }>({});


  const handleNext = () => {
    const newActiveStep = activeStep + 1;
    setActiveStep(newActiveStep);
  };


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

        <Card>
          <CardContent>
            <CreateAccountForm />
          </CardContent>
        </Card>


      </Paper>
    </Box>
  );
}
