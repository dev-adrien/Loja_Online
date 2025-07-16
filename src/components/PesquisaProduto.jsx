import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, ToggleButtonGroup, ToggleButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export default function PesquisaProduto({ onPesquisar }) {
  const [busca, setBusca] = useState('');
  const [criterioOrdenacao, setCriterioOrdenacao] = useState('alfabetica');
  const [ordem, setOrdem] = useState('asc');

  useEffect(() => { onPesquisar({ busca, criterioOrdenacao, ordem }); }, [busca, criterioOrdenacao, ordem]);
  return (
<Box sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
  <TextField label="Buscar produto" variant="outlined" value={busca} onChange={(e) => setBusca(e.target.value)} sx={{ flexGrow: 1 }}/>

  <ToggleButtonGroup value={criterioOrdenacao} exclusive onChange={(e, val) => val && setCriterioOrdenacao(val)}>
    <ToggleButton value="alfabetica">ABC</ToggleButton>
    <ToggleButton value="preco">Preço</ToggleButton>
  </ToggleButtonGroup>
    
  <ToggleButton value="ordem" onClick={() => setOrdem(ordem === 'asc' ? 'desc' : 'asc')}>
    {ordem === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
  </ToggleButton>
</Box>

  );
}
