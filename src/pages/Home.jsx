import React, { useState } from 'react';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import theme from '../utils/theme.js'
import PesquisaProduto from '../components/PesquisaProduto'
import ContainerProdutos from '../components/ContainerProdutos'
import '../utils/home.css'
import produtos from '../services/produtos.json';


function parsePreco(preco) {
  return parseFloat(preco.replace('R$', '').replace('.', '').replace(',', '.').trim());
}

export default function Home() { 

    const [produtosFiltrados, setProdutosFiltrados] = useState(produtos) 

    const Pesquisar = ({ busca, criterioOrdenacao, ordem }) => {
        let filtrados = produtos.filter(produto =>
            produto.nome.toLowerCase().includes(busca.toLowerCase())
        );

        filtrados.sort((a, b) => {
            const valorA = criterioOrdenacao === 'preco' ? parsePreco(a.preco) : a.nome.toLowerCase();
            const valorB = criterioOrdenacao === 'preco' ? parsePreco(b.preco) : b.nome.toLowerCase();
            return ordem === 'asc' ? (valorA > valorB ? 1 : -1) : (valorA < valorB ? 1 : -1);
        });

        setProdutosFiltrados(filtrados);
    };

    
  return (
    <div className="home">
      <ThemeProvider theme={theme}>
        <PesquisaProduto onPesquisar={Pesquisar}/>
        <ContainerProdutos produtos={produtosFiltrados} />
      </ThemeProvider>
    </div>
  )
}