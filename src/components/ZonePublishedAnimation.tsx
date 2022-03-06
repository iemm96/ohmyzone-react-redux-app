import { useEffect, useState } from 'react';
import { fetchRecord } from '../actions/fetchRecord';
import { motion } from 'framer-motion';
import { transition } from '../constants/transitions';
import Box from '@mui/material/Box';
import { startConfettiInner, stopConfettiInner } from '../helpers/confetti';
import Typography from '@mui/material/Typography';


const ZonePublishedAnimation = ({ zoneUrl }:{ zoneUrl:string }) => {
    const [ imageData, setImageData ] = useState<string | null>( null );

    const letter = {
        initial: {
        y: 400,
        },
        animate: {
        y: 0,
        transition: {
            ...transition,
            duration: 1,
        }
        }
    }

    const firstName = {
        initial: {
          y: 0
        },
        animate: {
          y: 0,
          transition: {
            delayChildren: .6,
            staggerChildren: .04,
            staggerDirection: -1,
          }
        }
      }
      
      const lastName = {
        initial: {
          y: 0
        },
        animate: {
          y: 0,
          transition: {
            delayChildren: .6,
            staggerChildren: .04,
            staggerDirection: 1,
          }
        }
      }

    useEffect(() => {
        getScreenshot();
        return () => {
        //    stopConfettiInner();
        }
    },[  ]);

    const getScreenshot = async () => {
        startConfettiInner(400, 200);
        //stopConfettiInner();
        const image:any = await fetchRecord( 'zones/screenshot', encodeURIComponent( zoneUrl ));

        if(image) {
            setImageData( image.b64 )
        }
    }

    return(
        <>
            <Box 
                sx={{ 
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center', 
                    width: '100%', 
                    height: 200, 
                    backgroundColor: 'white',
                    overflow: 'hidden',
                    borderRadius: '8px 8px 0 0'
                }}
            >
                <canvas id="confetti-canvas" style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute'
                }}/>
                { imageData && (
                    <>
                        <motion.img
                            initial={{ 
                                opacity: 0,
                                height: 600,
                                transform: 'rotateY(-400deg)',
                                y: 50
                            }}
                            animate={{
                                opacity: 1,
                                y: 5,
                                height: 200,
                                transform: 'rotateY(0)',
                                left: 20,
                                transition: { ...transition }
                            }}
                            alt="capture"
                            src={`data:image/jpeg;base64,${imageData}`}
                            style={{
                                height: 120,
                                position: 'absolute',
                                zIndex: 0,
                                border: '6px solid #111',
                                borderRadius: 8
                            }}
                        />
                        <motion.div
                            initial={{
                                y: 10,
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    ...transition,
                                    delay: 0.5
                                }
                            }}
                            style={{
                                width: '50%',
                                position: 'absolute',
                                right: 30,
                                alignSelf: 'center'
                            }}
                        >
                            <Typography
                                variant="h5"
                                color="primary"
                            >
                                ¡Tu Zone ha sido publicado!
                            </Typography>
                        </motion.div>
                    </>
                )}
            </Box>
         
        </>
    )
}

export default ZonePublishedAnimation;