import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button, Stack } from '@mui/material';

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ open, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (file) formData.append('attachment', file);

    onSubmit(formData); // Envía los datos al padre
    setTitle('');
    setContent('');
    setFile(null);
    onClose(); // Cierra el modal
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="upload-modal-title">
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
        <Typography variant="h6" id="upload-modal-title" mb={2}>
          Subir Noticia
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Título"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            multiline
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button variant="outlined" component="label">
            Subir Archivo
            <input type="file" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </Button>
          {file && <Typography>Archivo: {file.name}</Typography>}

          {/* Botones */}
          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Cancelar
            </Button>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Guardar Noticia
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default UploadModal;