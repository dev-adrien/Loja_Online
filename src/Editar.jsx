import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Editar.css";

export default function Editar({ id, onEditSuccess }) {
  const [produto, setProduto] = useState({ 
    nome: "", 
    preco: "", 
    categoria: "", 
    imagem: "", 
    estoque: "", 
    descricao: "" 
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`http://localhost:3000/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduto({
          nome: data.nome || "",
          preco: data.preco || "",
          categoria: data.categoria || "",
          imagem: data.imagem || "",
          estoque: data.estoque || "",
          descricao: data.descricao || ""
        });
        setLoading(false);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function formatarPreco(valor) {
      if (typeof valor === 'number') valor = valor.toString()
      valor = valor.replace(/[^\d.,]/g, '')
      valor = valor.replace(/\./g, '').replace(',', '.')
      const numero = parseFloat(valor)
      if (isNaN(numero)) return ''
      return (
          'R$ ' +
          numero.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
          })
      )
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: produto.nome,
        preco: formatarPreco(produto.preco),
        categoria: produto.categoria,
        imagem: produto.imagem,
        estoque: parseInt(produto.estoque),
        descricao: produto.descricao,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Produto atualizado com sucesso!");
        navigate("/"); // Volta para a tela inicial
        window.location.reload(); // Força o recarregamento da página
        if (onEditSuccess) onEditSuccess();
      })
      .catch((error) => {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar o produto.");
      });
  }  

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="editar-produto-container">
      <h2>Editar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome: </label>
          <input
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preço: </label>
          <input
            name="preco"            
            step="0.01"
            value={produto.preco}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Categoria: </label>
          <input
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>URL da Imagem: </label>
          <input
            name="imagem"
            type="url"
            value={produto.imagem}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Estoque: </label>
          <input
            name="estoque"
            type="number"
            value={produto.estoque}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Descrição: </label>
          <textarea
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            rows="4"
            cols="50"
          />
        </div>
        <div className="botoes-container">
          <button type="submit" className="btn-salvar">Salvar</button>
          <button
            type="button"
            className="btn-excluir"
            onClick={() => {
              if (window.confirm("Tem certeza que deseja excluir este produto?")) {
                fetch(`http://localhost:3000/produtos/${id}`, {
                  method: "DELETE",
                })
                  .then((res) => {
                    if (res.ok) {
                      alert("Produto excluído com sucesso!");
                      navigate("/");
                      window.location.reload(); // Força o recarregamento da página
                      if (onEditSuccess) onEditSuccess();
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
          >
            Excluir
          </button>
        </div>
      </form>
    </div>
  );
}