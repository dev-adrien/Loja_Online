import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdicionarProduto.css";

export default function AdicionarProduto() {
  // fixando o state de cada campo
  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    categoria: "",
    descricao: "",
    quantidade: "",
    imagem: "",
  });
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  // fixando o state de cada campo
  function handleChange(e) {
    const { name, value } = e.target;
    setProduto((prev) => ({
      ...prev,
      [name]: value,
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
    if (!produto.imagem.trim()) return "URL da imagem é obrigatória.";
    return "";
  }

  function formatarPreco(valor) {
    if (typeof valor === "number") valor = valor.toString();
    valor = valor.replace(/[^\d.,]/g, '');
    valor = valor.replace(/\./g, '').replace(',', '.');
    const numero = parseFloat(valor);
    if (isNaN(numero)) return '';
    return "R$ " + numero.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // validação
  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setMensagem("");
    const erroValidacao = validar();
    if (erroValidacao) {
      setErro(erroValidacao);
      return;
    }

    try {
      const res = await fetch("https://6876f363dba809d901ed7edc.mockapi.io/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: produto.nome,
          preco: formatarPreco(produto.preco),
          categoria: produto.categoria,
          descricao: produto.descricao,
          imagem: produto.imagem,
          estoque: parseInt(produto.quantidade, 10),
        }),
      });
      if (!res.ok) throw new Error("Erro ao cadastrar produto.");
      await res.json();
      setMensagem("Produto cadastrado com sucesso!");
      //resetando o formulário
      setProduto({
        nome: "",
        preco: "",
        categoria: "",
        descricao: "",
        quantidade: "",
        imagem: "",
      });
      setTimeout(() => {
        navigate("/");
        window.location.reload(); // força recarregar os produtos
      }, 1500);
    } catch (err) {
      setErro(err.message);
    }
  }

  return (
    <div className="adicionar-produto-container">
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
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
            step="0.01"
            value={produto.preco}
            onChange={handleChange}
            min={0.01}
            placeholder="Ex: 19.99"
            required
          />
        </div>
        {/* Categoria */}
        <div>
          <label>Categoria*: </label>
          <select
            name="categoria"
            value={produto.categoria}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="Eletrônicos">Eletrônicos</option>
            <option value="Roupas">Roupas</option>
            <option value="Livros">Livros</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Brinquedos">Brinquedos</option>
            <option value="Papelaria">Papelaria</option>
            <option value="Diversos">Diversos</option>
            <option value="Moveis">Moveis</option>
            <option value="Ferramentas">Ferramentas</option>
            <option value="Beleza">Beleza</option>
            <option value="Esportes">Esportes</option>
            <option value="Eletrodomestico">Eletrodomestico</option>
          </select>
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
        {/* URL da imagem */}
        <div>
          <label>URL da imagem*: </label>
          <input
            name="imagem"
            type="text"
            value={produto.imagem}
            onChange={handleChange}
            placeholder="Cole a URL da imagem ou caminho local"
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