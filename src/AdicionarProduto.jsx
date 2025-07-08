import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdicionarProduto() {
  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    categoria: "",
    descricao: "",
    quantidade: "",
    foto: null,
  });
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  // fixando o state de cada campo
  function handleChange(e) {
    const { name, value, type, files } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  }

  // campos obrigatórios
  function validar() {
    if (!produto.nome.trim()) return "Nome é obrigatório.";
    if (produto.nome.length > 100) return "Nome muito longo.";
    if (!produto.preco || parseFloat(produto.preco) <= 0) return "Preço deve ser maior que zero.";
    if (!produto.categoria.trim()) return "Categoria é obrigatória.";
    if (!produto.descricao.trim()) return "Descrição é obrigatória.";
    if (produto.descricao.length > 500) return "Descrição muito longa.";
    if (!produto.quantidade || parseInt(produto.quantidade) < 0) return "Quantidade deve ser zero ou maior.";
    if (!produto.foto) return "Foto do produto é obrigatória.";
    return "";
  }

  // validação
  function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setMensagem("");
    const erroValidacao = validar();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    // adicionando dados do formulário
    const formData = new FormData();
    formData.append("nome", produto.nome);
    formData.append("preco", produto.preco);
    formData.append("categoria", produto.categoria);
    formData.append("descricao", produto.descricao);
    formData.append("quantidade", produto.quantidade);
    formData.append("foto", produto.foto);

    // envia ppara o server.json
    fetch("http://localhost:3000/produtos", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao cadastrar produto.");
        return res.json();
      })
      .then(() => {
        setMensagem("Produto cadastrado com sucesso!");
        //resetando o formulário
        setProduto({
          nome: "",
          preco: "",
          categoria: "",
          descricao: "",
          quantidade: "",
          foto: null,
        });
        setTimeout(() => navigate("/"), 1500);
      })
      .catch((err) => setErro(err.message));
  }

  return (
    <div>
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Nome do produto */}
        <div>
          <label>Nome*: </label>
          <input
            name="nome"
            value={produto.nome}
            onChange={handleChange}
            maxLength={100}
            required
          />
        </div>
        {/* Preço */}
        <div>
          <label>Preço*: </label>
          <input
            name="preco"
            type="number"
            step="1"
            value={produto.preco}
            onChange={handleChange}
            min={0.01}
            required
          />
        </div>
        {/* Categoria */}
        <div>
          <label>Categoria*: </label>
          <input
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            required
          />
        </div>
        {/* Descrição */}
        <div>
          <label>Descrição*: </label>
          <textarea
            name="descricao"
            value={produto.descricao}
            onChange={handleChange}
            maxLength={500}
            required
          />
        </div>
        {/* Quantidade */}
        <div>
          <label>Quantidade*: </label>
          <input
            name="quantidade"
            type="number"
            value={produto.quantidade}
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        {/* Foto */}
        <div>
          <label>Foto do produto*: </label>
          <input
            name="foto"
            type="file"
            accept="image/*"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Salvar</button>
        {/* Validação */}
        {erro && <div style={{ color: "red" }}>{erro}</div>}
        {mensagem && <div style={{ color: "green" }}>{mensagem}</div>}
      </form>
    </div>
  );
}