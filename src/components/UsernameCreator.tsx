import { Box, TextField, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';

type UserNameCreatorType = {
    fullName: String | undefined;
    textInputLabel: String;
}

export const UsernameCreator = ({ fullName, textInputLabel }:UserNameCreatorType) => {
    const [createdUsername, setCreatedUsername] = useState<String | undefined>(undefined);
    const theme = useTheme();
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
        <Box
            sx={{
                p: 2,
                backgroundColor: 'white',
                borderRadius: 2,
                border: `1px solid ${ theme.palette.primary.main }`
            }}
        >
            <Typography variant="caption">Identificador de tu Zone:</Typography>
            <TextField
                fullWidth
                value={ createdUsername }
            />
            <Typography variant="caption">ohmy.zone/{ createdUsername }</Typography>
        </Box>
        
    );
};
