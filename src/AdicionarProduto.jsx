import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdicionarProduto() {
  const [produto, setProduto] = useState({ nome: "", preco: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:3000/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: produto.nome,
        preco: parseFloat(produto.preco),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Produto adicionado com sucesso!");
        navigate("/");
      });
  }

  return (
    <div>
      <h2>Adicionar Produto</h2>
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