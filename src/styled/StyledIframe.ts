import { styled } from '@mui/material/styles';
export const StyledIframe = styled('iframe')(() => ({
    width: 320,
    height: 520,
    border: '40px solid #ddd',
    borderWidth: '55px 7px',
    borderRadius: 40,
    position:  'relative',
    overflowY: 'scroll',
    transition: 'all 0.5s ease',    
    boxShadow: '0px 3px 0 #BBB, 0px 4px 0 #BBB, 0px 5px 0 #BBB, 0px 7px 0 #BBB, 0px 10px 20px #666'
}))