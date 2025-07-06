import Produtos from "./Produtos.jsx";
import { useNavigate } from "react-router-dom";

export default function PaginaInicial ()  {
  const navigate = useNavigate();

 return (
    <div>
      <h1>Bem-vindo à nossa loja!</h1>
      <h2>Produtos disponíveis:</h2>
      <Produtos />
      <button
        type="button"
        style={{ marginTop: "20px", color: "white" }}
        onClick={() => navigate("/adicionar")}
      >
        Adicionar Produto
      </button>
    </div>
  );
}