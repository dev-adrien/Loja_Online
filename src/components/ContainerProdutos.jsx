import Produto from "./Produto"
import './../utils/ContainerProdutos.css'

export default function ContainerProdutos(){
    return(
        <div className="containerProdutos">
            <Produto />
            <Produto />
            <Produto />
            <Produto />
            <Produto />
            <Produto />
            <Produto />
            <Produto />
        </div>
    )
}