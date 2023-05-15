import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getProductById, putProductEdit } from "../../../services/Product/product"
import ContentContainer from "../../../containers/ContentContainer"
import ActionBar from "../../../components/ActionBar/ActionBar.tsx"
import { Box, Grid, TextField } from "@material-ui/core"

const ProductEdit = () => {
    const [productLoaded, setProductLoader] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [available, setAvailable] = useState("")

    useEffect (() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id)
                const productData = response.data
                setName(productData.name)
                setDescription(productData.description)
                setPrice(productData.price)
                setAmount(productData.amount)
                setAvailable(productData.available)
                setProductLoader(true)
            } catch (error) {
                console.log(error)
                setProductLoader(false)
            }
        }

        fetchProduct()
    }, [id])

    if (!productLoaded) {
        return <div className="loading-editing">Loading...</div>
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const product = {
            name,
            description,
            price,
            amount
        };
        try{
            const response = await putProductEdit(id, product)
            console.log(response)
            navigate("/produto")
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
        <h1>Teste</h1>
        <ContentContainer className="main-content-only-table-container">
            {<ActionBar hideSubmit={true} />}
            <Box>
                <form onSubmit={handleSubmit}>
                    <h1>Atualizar produtos</h1>
                    <Grid container spacing={2}>
                        <TextField 
                        id="name"
                        name="name"
                        fullWidth
                        required={true}
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        sx={{ mb: 3 }}
                        />
                    </Grid>
                </form>
            </Box>
        </ContentContainer>
        </>
    )

}

export default ProductEdit;