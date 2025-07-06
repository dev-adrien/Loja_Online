import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from '@mui/material';
import ProdutoPopUp from './ProdutoPopUp';

export default function Produto({ id, nome, preco, categoria, imagem, descricao }) {
  const [open, setOpen] = React.useState(false);
  const produto = { id, nome, preco, categoria, imagem, descricao };

  return (
    <>
      <Card sx={{ maxWidth: 280, width: '100%', boxSizing: 'border-box' }}>
        <CardActionArea onClick={() => setOpen(true)}>
          <CardMedia component="img" height="150" image={imagem} alt={nome} sx={{ objectFit: 'contain' }} />
        </CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5">{nome}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'left' }}>
            {categoria} <br /> {preco}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" sx={{ color: '#015FCA' }}>Editar</Button>
          <Button size="small" color="secondary">DELETAR</Button>
        </CardActions>
      </Card>
      <ProdutoPopUp open={open} onClose={() => setOpen(false)} produto={produto} />
    </>
  );
}
