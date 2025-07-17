import './App.css'
import PaginaInicial from './pages/PaginaInicial.jsx'
import AdicionarProduto from './pages/AdicionarProduto.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Editar from './pages/Editar'
import { useParams } from 'react-router-dom'
import Header from './components/Header.jsx'

function EditarWrapper() {
    const { id } = useParams()
    return <Editar id={id} />
}

export default function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<PaginaInicial />} />
                    <Route path="/editar/:id" element={<EditarWrapper />} />
                    <Route path="/adicionar" element={<AdicionarProduto />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
