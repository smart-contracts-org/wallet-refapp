import React from 'react';
import Typography from '@mui/material/Typography';
import { Prompt } from '../Prompts/Prompt';

export const UserPrompt: React.FC = () => {
  return (
    <Prompt>
      <Typography variant='body2' color="text.primary">
        You have not issued any assets. To issue assets, you must first create the Asset Account that will hold the asset.
        Click the below "Create Asset Account" to get started.
        </Typography>
    </Prompt>
  );
}
