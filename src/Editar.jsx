import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Adicione esta linha

export default function Editar({ id, onEditSuccess }) {
  const [produto, setProduto] = useState({ nome: "", preco: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch(`http://localhost:3000/produtos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduto({ nome: data.nome, preco: data.preco });
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

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:3000/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Produto atualizado com sucesso!");
        navigate("/"); // Volta para a tela inicial
        if (onEditSuccess) onEditSuccess();
      });
  }

  if (loading) return <div>Carregando...</div>;

  return (
    <div>
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
            type="number"
            step="0.01"
            value={produto.preco}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}