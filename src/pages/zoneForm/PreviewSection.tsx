import withTheme from "../../components/WithTheme";
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from "framer-motion";

const StyledPhoneDiv =  styled('div')(() => ({
    width: 320,
    height: 520,
    border: '40px solid #ddd',
    borderWidth: '55px 7px',
    borderRadius: 40,
    margin: '20px auto',
    overflow: 'hidden',
    transition: 'all 0.5s ease',    
    boxShadow: '0px 3px 0 #BBB, 0px 4px 0 #BBB, 0px 5px 0 #BBB, 0px 7px 0 #BBB, 0px 10px 20px #666'
}));

const StyledIframe = styled('iframe')(() => ({
    border: 0,
    width: '100%',
    height: 650
}));

const PreviewSection = () => {
  return (
      <>
        <Grid sx={{ mb: 3 }} container>
            <Grid xs={ 12 } item>
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                        //transform: 'rotateX(0deg) rotateY(-10deg) rotateZ(0deg)'
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        //transform: 'rotateX(0deg) rotateY(0deg) rotateZ(0deg)',
                        transition: { delay: 0.5, duration: 2, ease: [0.6, .01, -0.05, 0.9] }
                    }}
                >
                    <StyledPhoneDiv>
                        <StyledIframe src="https://ohmy.zone/nucleodev"/>
                    </StyledPhoneDiv>
                </motion.div>
            </Grid>
        </Grid>
      </>
  );
};

export default withTheme( PreviewSection );



