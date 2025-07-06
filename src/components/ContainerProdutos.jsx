import Produto from "./Produto"
import { Grid, Container } from '@mui/material';

export default function ContainerProdutos({produtos}){
    return(
        <>
        <Container>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                {produtos.map((produto) => ( 
                    <Grid key={produto.id} >
                        <Produto {...produto} />
                    </Grid>
                ))}
            </Grid>
        </Container>
        </>
    )
}