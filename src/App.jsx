import './App.css';
import PaginaInicial from './PaginaInicial.jsx';
import AdicionarProduto from "./AdicionarProduto";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Editar from "./Editar";
import { useParams } from "react-router-dom";

function EditarWrapper() {
  const { id } = useParams();
  return <Editar id={id} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaInicial />} />
        <Route path="/editar/:id" element={<EditarWrapper />} />
        <Route path="/adicionar" element={<AdicionarProduto />} />
      </Routes>
    </BrowserRouter>
  );
}

      