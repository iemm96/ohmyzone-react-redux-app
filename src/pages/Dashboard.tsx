import { useEffect, useState } from "react";
import Header from "../components/Header";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import { CardActionArea, Container, Grid } from "@mui/material";
import Pallette from 'react-palette';
import { ColorPaletteImage } from "../components/ColorPaletteImage";

const pixabay_api_key = '25105059-4d7ff3f9a607aabea05e93997';
const pixabay_url = 'https://pixabay.com/api/?key=25105059-4d7ff3f9a607aabea05e93997&q=sunset&image_type=photo';

const path = 'https://pixabay.com/get/gcd9b3477c942fc3f3a24256459854e79272a801d30280d59e60ac52323ced0e139e2951708fb1c33a7f584f52c7de78662a307a8684d284eb2ec194477da124a_640.jpg';
type mediaCardTypes = {
    url:string,
    alt:string,
    index:number
}

const Dashboard = () => {
    const [pixabayResults, setPixabayResults] = useState([])

    useEffect(() => {
        retrievePixabayImages();
        getProminentColor('https://pixabay.com/get/gcd9b3477c942fc3f3a24256459854e79272a801d30280d59e60ac52323ced0e139e2951708fb1c33a7f584f52c7de78662a307a8684d284eb2ec194477da124a_640.jpg');
    }, []);

    const retrievePixabayImages = async () => {
        const result = await axios.get(pixabay_url)
        if(result) {
            setPixabayResults(result.data.hits)
        }
    }

    const getProminentColor = async (path:string) => {
    }

    const mediaCard = ({url,alt,index}:mediaCardTypes) => {
        return(
            <Card sx={{ maxWidth: 345, borderRadius: 4 }} key={index}>
                <CardActionArea onClick={() => console.log('click')}>
                    <CardMedia
                        component="img"
                        height="140"
                        image={url}
                        alt={alt}
                    />
                    <ColorPaletteImage src={url}/>    
                </CardActionArea>
            </Card>
        )
    }

    return(
        <>
            <Header/>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    {pixabayResults.map((value:any,index) => {
                        return(
                            <Grid item sm={12} md={4}>
                                {mediaCard({url:value.webformatURL,alt:'alt',index})}
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
            
        </>
    )
}

export default Dashboard;