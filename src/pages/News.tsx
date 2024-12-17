import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
} from '@mui/material';
import { Add, Delete, Visibility } from '@mui/icons-material';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import FeedbackModal from '../components/modals/FeedbackModal';
import UploadModal from '../components/modals/UploadModal';
import newsService from '../services/newsService';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  attachment: string | null;
}

const BASE_URL = 'http://localhost:8000';
const DEFAULT_PDF_IMAGE = '/src/assets/images/cercado.jpg';

const News: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error'>('success');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    try {
      setLoading(true);
      const response = await newsService.getAll();
      setNews(response.data || response);
    } catch {
      setFeedbackMessage('Error al cargar las noticias.');
      setFeedbackType('error');
      setIsFeedbackOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (formData: FormData) => {
    try {
      await newsService.create(formData);
      setFeedbackMessage('Noticia subida correctamente.');
      setFeedbackType('success');
      loadNews();
    } catch {
      setFeedbackMessage('Error al subir la noticia.');
      setFeedbackType('error');
    } finally {
      setIsFeedbackOpen(true);
    }
  };

  const handleDelete = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    setIsConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedNews) return;
    try {
      await newsService.delete(selectedNews.id);
      setFeedbackMessage('Noticia eliminada correctamente.');
      setFeedbackType('success');
      loadNews();
    } catch {
      setFeedbackMessage('Error al eliminar la noticia.');
      setFeedbackType('error');
    } finally {
      setIsConfirmOpen(false);
      setIsFeedbackOpen(true);
    }
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">Noticias</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          color="primary"
          onClick={() => setIsUploadOpen(true)}
        >
          Subir Noticia
        </Button>
      </Box>

      {loading ? (
        <Typography>Cargando noticias...</Typography>
      ) : news.length === 0 ? (
        <Typography>No hay noticias subidas.</Typography>
      ) : (
        <Grid container spacing={3}>
          {news.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                {/* Portada de PDF o Imagen */}
                {item.attachment && item.attachment.endsWith('.pdf') ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={DEFAULT_PDF_IMAGE} // Imagen predeterminada para PDF
                    alt="PDF Thumbnail"
                  />
                ) : (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`${BASE_URL}/${item.attachment.replace(/^\/?/, '')}`}
                    alt={item.title}
                  />
                )}

                <CardContent>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.content}
                  </Typography>
                </CardContent>

                {/* Botones: Ver PDF a la izquierda, Eliminar a la derecha */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={1}
                >
                  {/* Botón Ver PDF (solo si es PDF) */}
                  {item.attachment?.endsWith('.pdf') && (
                    <Button
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() =>
                        setPdfUrl(`${BASE_URL}/${item.attachment.replace(/^\/?/, '')}`)
                      }
                    >
                      Ver PDF
                    </Button>
                  )}
                  {/* Botón Eliminar siempre visible y alineado a la derecha */}
                  <Box flexGrow={1} /> {/* Esto empuja el botón a la derecha */}
                  <IconButton color="error" onClick={() => handleDelete(item)}>
                    <Delete />
                  </IconButton>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <UploadModal open={isUploadOpen} onClose={() => setIsUploadOpen(false)} onSubmit={handleUpload} />
      <ConfirmationModal
        open={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Eliminar Noticia"
        description="¿Está seguro de que desea eliminar esta noticia?"
      />
      <FeedbackModal
        open={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        message={feedbackMessage}
        type={feedbackType}
      />

      {/* PDF Viewer */}
      <Modal open={!!pdfUrl} onClose={() => setPdfUrl(null)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '80%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
          }}
        >
          <iframe
            src={pdfUrl || ''}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="PDF Viewer"
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default News;