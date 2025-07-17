import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActionArea, CardActions } from '@mui/material';
import ProdutoPopUp from './ProdutoPopUp';
import { useNavigate } from 'react-router-dom';
import { getProdutoUrl } from '../config/api.js';

export default function Produto({ id, nome, preco, categoria, imagem, estoque, descricao }) {
  const [open, setOpen] = React.useState(false);
  const produto = { id, nome, preco, categoria, imagem, estoque, descricao };
  const navigate = useNavigate();

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
          <Button size="small" sx={{ color: '#015FCA' }} onClick={() => navigate(`/editar/${produto.id}`)}>Editar</Button>
          <Button size="small" color="secondary" 
            onClick={() => {
              if (window.confirm("Tem certeza que deseja excluir este produto?")) {
                fetch(getProdutoUrl(id), {
                  method: "DELETE",
                })
                  .then((res) => {
                    if (res.ok) {
                      alert("Produto excluído com sucesso!");
                      navigate("/");
                      window.location.reload();
                    } else {
                      alert("Erro ao excluir o produto.");
                    }
                  })
                  .catch((error) => {
                    console.error("Erro ao excluir produto:", error);
                    alert("Erro ao excluir o produto.");
                  });
              }
            }}
          >EXCLUIR</Button>
        </CardActions>
      </Card>
      <ProdutoPopUp open={open} onClose={() => setOpen(false)} produto={produto} />
    </>
  );
}
