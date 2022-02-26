import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { CreateAccountForm } from '../CreateAccountForm/CreateAccountForm';
import { isMobile } from '../../platform/platform';
import { Card, CardContent, Paper } from '@mui/material';
import { IssueAirdropPopupContent } from '../IssueAirdropPopupContent/IssueAirdropPopupContent';

const steps = ['Create Asset Account', 'Mint Assets'];

export const CreateAssetAccountSteps: React.FC = () => {
  const isStepFailed = (step: number) => {
    return false;
  };
  const [step, setStep] = React.useState<number>(0);

  const handleOnNext = (step: number) => {
    setStep(step)
  }

  return (
    <Box sx={{ maxWidth: '600px' }}>
      <Stepper alternativeLabel={isMobile()} activeStep={step} sx={{ paddingTop: 2, paddingBottom: 2 }}>
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
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Paper>

        {step === 0 && (<Card>
          <CardContent>
            <CreateAccountForm handleClose={() => { }} handleSubmit={() => handleOnNext(1)} />
          </CardContent>
        </Card>)
        }

        {step === 1 && (
          <>
           
            <IssueAirdropPopupContent ticker={'ETH'} handleClose={() => { }} /></>)}
      </Paper>
    </Box>
  );
}
