

import { styled } from '@mui/material/styles';


import { useSelector } from 'react-redux';
import ZoneComponent from '../../components/ZoneComponent';


const StyledPhoneDiv =  styled('div')(() => ({
    width: 320,
    height: 520,
    border: '40px solid #ddd',
    borderWidth: '55px 7px',
    borderRadius: 40,
    margin: '20px auto',
    position: 'relative',
    overflowY: 'scroll',
    transition: 'all 0.5s ease',    
    boxShadow: '0px 3px 0 #BBB, 0px 4px 0 #BBB, 0px 5px 0 #BBB, 0px 7px 0 #BBB, 0px 10px 20px #666'
}));

const StyledIframe = styled('iframe')(() => ({
    border: 0,
    width: '100%',
    height: 650
}));

const PreviewSection = () => {
    const { zone } = useSelector((state:any) => state );
    return (
        <>
            <StyledPhoneDiv>
                {/*<StyledIframe src={`http://localhost:3000/zones/preview/${ zone.uid }`}/>*/}
                <ZoneComponent/>
            </StyledPhoneDiv>
        </>
    );
};

export default PreviewSection;



