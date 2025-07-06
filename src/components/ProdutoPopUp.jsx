import * as React from 'react';
import { Modal, Box, Typography, CardMedia } from '@mui/material';

export default function ProdutoPopUp({ open, onClose, produto }) {
  if (!produto) return null;
  const { nome, preco, categoria, imagem, descricao } = produto;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 350, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 24, p: 3
      }}>
        <Typography variant="h6" color="primary" gutterBottom>{nome}</Typography>
        <CardMedia component="img" height="180" image={imagem} alt={nome} sx={{ objectFit: 'contain', mb: 2 }} />
        <Typography variant="body2" color="primary" sx={{ mb: 1 }}><strong>Categoria:</strong> {categoria}</Typography>
        <Typography variant="body2" color="primary" sx={{ mb: 1 }}><strong>Preço:</strong> {preco}</Typography>
        <Typography variant="body2"color="primary"><strong>Descrição:</strong> {descricao}</Typography>
      </Box>
    </Modal>
  );
}
