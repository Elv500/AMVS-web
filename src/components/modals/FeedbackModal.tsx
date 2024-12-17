import React from 'react';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
  message: string;
  type: 'success' | 'error';
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ open, onClose, message, type }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="feedback-modal">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" mb={3} color={type === 'success' ? 'green' : 'red'}>
          {type === 'success' ? '¡Éxito!' : 'Error'}
        </Typography>
        <Typography mb={3}>{message}</Typography>
        <Stack direction="row" justifyContent="center">
          <Button variant="contained" onClick={onClose} color={type === 'success' ? 'primary' : 'error'}>
            Aceptar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default FeedbackModal;