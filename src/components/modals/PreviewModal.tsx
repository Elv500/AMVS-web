import React from 'react';
import { Modal, Box, Typography, Button, Stack } from '@mui/material';

interface PreviewModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    fileName: string | null | undefined; // Permitir undefined
}  

const PreviewModal: React.FC<PreviewModalProps> = ({ open, onClose, title, description, fileName }) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="preview-modal">
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
        }}
      >
        <Typography variant="h6" mb={2}>
          Vista Previa de Noticia
        </Typography>
        <Typography><strong>Título:</strong> {title}</Typography>
        <Typography><strong>Descripción:</strong> {description}</Typography>
        {fileName && (
          <Typography><strong>Archivo:</strong> {fileName}</Typography>
        )}
        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Cerrar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default PreviewModal;