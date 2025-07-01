import { useState } from 'react'
import './App.css'
import ContainerProdutos from './components/ContainerProdutos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ContainerProdutos />
    </>
  )
}

export default App
