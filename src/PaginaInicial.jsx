import Produtos from "./Produtos.jsx";
import { useNavigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import "./PaginaInicial.css";

export default function PaginaInicial ()  {
  const navigate = useNavigate();

 return (
    <div>
      <h2>Produtos disponíveis:</h2>
      <Home />
    </div>
  );
}