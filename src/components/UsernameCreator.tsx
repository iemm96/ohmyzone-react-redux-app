import { Box, TextField, Typography, InputAdornment, useTheme } from '@mui/material';
import { useState, useEffect } from 'react';
import { Controller, Control } from 'react-hook-form';
import { red } from '@mui/material/colors';
type UserNameCreatorType = {
    fullName: string | undefined;
    createdUsername: any;
    setCreatedUsername: any;
    control: Control,
    errors: any,
    setValue: any
}

export const useUsernameCreator = () => {
    const [ createdUsername, setCreatedUsername ] = useState<string | undefined>(undefined);
    
    return {
        createdUsername,
        setCreatedUsername,
    }
}

export const UsernameCreator = ({ fullName, createdUsername, setCreatedUsername, control, errors, setValue }:UserNameCreatorType) => {
    const theme = useTheme();

    useEffect(() => {
        if(createdUsername) {
            setValue( 'username', createdUsername );
        }
    },[createdUsername]);
    
    useEffect(() => {
        if( fullName !== undefined ) {
            const clearedString = clearString(fullName);
            setCreatedUsername( clearedString );
            setValue( 'username', clearedString );
        }
    },[ fullName ]);

    const clearString = ( string:string ) => {
        if(string) {
            let clearedString = string.replace(/ /g,'')
            clearedString = clearedString.normalize("NFD").replace(/[\u0300-\u036f]/g, '');
            clearedString = clearedString.toLowerCase();
            return clearedString.replace(/[^\w._-]|/gi, '');
        }
    }

    return(
        <Box>
            <Controller
                name="username"
                control={ control }
                rules={{
                    required: '¡Asegúrate de elegir un nombre de usuario!'
                }}
                render={ ( { field: { value, onChange } } ) => (
                    <TextField
                        fullWidth
                        onChange={ (e) => {
                            onChange(e);
                            setValue('username', clearString(e.target.value))
                        }}
                        placeholder="tunombre"
                        label="Nombre de usuario"
                        InputProps={{
                            startAdornment: <InputAdornment position="start">ohmy.zone/</InputAdornment>
                        }}
                        value={ value }
                    />
                )}
            />
            { errors.username ? <Typography variant="caption" sx={{ color: red[200] }}>{errors.username.message}</Typography> 
            : <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>Podrás cambiarlo en cualquier momento.</Typography> }
            
        </Box>
        
    );
};
