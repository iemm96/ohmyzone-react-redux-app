import React from 'react'
import { Container } from '@mui/material';
import UploadFile from '../components/UploadFile';

const Uploader = () => {
    return (
        <>
            <Container>
                <UploadFile accept=".jpg, .jpeg, .png"/>
            </Container>
        </>
    )
}

export default Uploader;