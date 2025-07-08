import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles'
import theme from '../utils/theme.js'
import PesquisaProduto from '../components/PesquisaProduto'
import ContainerProdutos from '../components/ContainerProdutos'
import '../utils/home.css'
import produtos from '../services/produtos.json';

export default function Home() { 
    const [produtos, setProdutos] = useState([]);
    const [produtosFiltrados, setProdutosFiltrados] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/produtos")
            .then(res => res.json())
            .then(data => {
                setProdutos(data);
                setProdutosFiltrados(data);
            });
    }, []);

    function parsePreco(preco) {
        if (typeof preco === "string") {
            return parseFloat(preco.replace('R$', '').replace('.', '').replace(',', '.').trim());
        }
        return preco;
    }

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