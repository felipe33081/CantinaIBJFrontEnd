import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { getProductById, putProductEdit } from "../../../services/Product/product"
import ContentContainer from "../../../containers/ContentContainer"
import ActionBar from "../../../components/ActionBar/ActionBar.tsx"
import { Box, Button, Grid, InputAdornment, TextField } from "@material-ui/core"
import SaveOutlinedIcon from "@material-ui/icons/SaveOutlined"
import FormattedInputs from "./FormattedInputs"

const ProductEdit = () => {
    const [productLoaded, setProductLoader] = useState(false)
    const navigate = useNavigate()
    const {id} = useParams()
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [amount, setAmount] = useState("")
    const [description, setDescription] = useState("")

    useEffect (() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(id)
                const productData = response.data
                setName(productData.name)
                setDescription(productData.description)
                setPrice(productData.price)
                setAmount(productData.amount)
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
        <ContentContainer className="main-content-only-table-container">
            {<ActionBar hideSubmit={true} />}
            <Box>
                <form onSubmit={handleSubmit}>
                    <h1>Atualizar produtos</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                            id="name"
                            name="name"
                            fullWidth
                            label="Nome"
                            required={true}
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 3 }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                        <FormattedInputs onChange={(e) => setPrice(e.target.value)}/>
                        </Grid>
                        <Grid item xs={12} sm={10}>
                            <TextField 
                            id="description"
                            name="description"
                            fullWidth
                            label="Descrição"
                            variant="outlined"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            sx={{ mb: 3 }}
                            />
                        </Grid>
                    </Grid>
                    <Button className="save-button" type="submit" variant="contained">
                        <SaveOutlinedIcon style={{ color: "fff" }} />
                        Salvar
                    </Button>
                </form>
            </Box>
        </ContentContainer>
        </>
    )

}

export default ProductEdit;