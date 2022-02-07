import { Box, TextField, Typography, InputAdornment } from '@mui/material';
import { useState, useEffect } from 'react';

type UserNameCreatorType = {
    fullName: String | undefined;
    createdUsername: any;
    setCreatedUsername: any; 
}

export const useUsernameCreator = () => {
    const [createdUsername, setCreatedUsername] = useState<String | undefined>(undefined);
    
    return {
        createdUsername,
        setCreatedUsername,
    }
}

export const UsernameCreator = ({ fullName, createdUsername, setCreatedUsername }:UserNameCreatorType) => {
    
    useEffect(() => {
        clearString(fullName);
    },[fullName]);

    const clearString = ( string:any ) => {
        if(string) {
            let clearedString = string.replace(/ /g,'')
            clearedString = clearedString.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
            clearedString = clearedString.toLowerCase();
            setCreatedUsername(clearedString.replace(/[^\w\s]/gi, ''));
        }
    }

    return(
        <Box>
            <TextField
                fullWidth            
                placeholder="tunombre"
                InputProps={{
                    startAdornment: <InputAdornment position="start">ohmy.zone/</InputAdornment>
                }}
                value={ createdUsername }
            />
            <Typography variant="caption" sx={{ opacity: 0.5 }}>Podrás cambiarlo en cualquier momento.</Typography>
        </Box>
        
    );
};
