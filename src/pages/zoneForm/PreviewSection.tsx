

import { styled } from '@mui/material/styles';
import ZoneComponent from '../../components/ZoneComponent';

interface StyledDivComponentProps {
    relative: boolean | undefined;
  }

const PreviewSection = ({ relative }:{ relative?:boolean }) => {

    const StyledPhoneDiv =  styled('div', {
        shouldForwardProp: (prop) => prop !== "position"
      })<StyledDivComponentProps>(({ relative }) => ({
        width: 320,
        height: 520,
        border: '40px solid #ddd',
        borderWidth: '55px 7px',
        borderRadius: 40,
        marginLeft: relative ? undefined : '20%',
        transform: relative ? 'none': 'translate(-50%, 0)',
        position: relative ? 'relative' : 'fixed',
        overflowY: 'scroll',
        transition: 'all 0.5s ease',    
        boxShadow: '0px 3px 0 #BBB, 0px 4px 0 #BBB, 0px 5px 0 #BBB, 0px 7px 0 #BBB, 0px 10px 20px #666'
    }));

    return (
        <>
            <StyledPhoneDiv
                relative={ relative }
            >
                <ZoneComponent/>
            </StyledPhoneDiv>
        </>
    );
};

export default PreviewSection;



