import React from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Drawer, useMediaQuery, Typography, Avatar } from '@mui/material'; 
import { motion } from "framer-motion";
import Logo from "./../assets/logo.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/auth";
import { ArrowDropDown, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from 'react';
import StyledButton from '../styled/StyledButton';
import ZonePhonePreview from './ZonePhonePreview';
import Box from '@mui/material/Box';
import StyledSwitch from "../styled/StyledSwitch";
import { updateZone } from '../actions/zones';
import { orange } from "@mui/material/colors";
import { updateRecord } from '../actions/updateRecord';

const Header = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { zone, ui, auth } = useSelector( (state:any) => state )
    const [ anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [ openDrawer, setOpenDrawer ] = useState<boolean>( false );
    const mediaQuery = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
          
          setAnchorEl(null);
      };

      const handleLogout = () => {
          dispatch( logout() );
          navigate('/');
      }

      const handleChangeZoneStatus = async (e:any) => {

        await updateRecord('zones', {
            currentStatus: e.target.checked ? "isPublished" : "isCompleted",
        }, zone.uid);
        dispatch( updateZone({
            ...zone,
            currentStatus: e.target.checked ? "isPublished" : "isCompleted"
        }) );

      }
    return(
        <>
            <AppBar 
                position="fixed"
                sx={{
                    backgroundColor: theme.palette.primary.main
                }}
            >
                <Toolbar sx={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <Link to="/dashboard">
                        <motion.img
                            initial={{
                                opacity: 0,
                                x: -10,
                            }}
                            animate={{
                                x:0,
                                opacity: 1,
                                transition: {
                                    delay: 0.5
                                }
                            }}
                            style={{
                                height: 40,
                            }}
                            alt="logo"
                            src={Logo}
                        />
                    </Link>
                    {
                        (mediaQuery && ui?.showPreviewButton) && (
                            <StyledButton
                                sx={{
                                    borderRadius: 10
                                }}
                                startIcon={ !openDrawer ? <Visibility/> : <VisibilityOff/> }
                                color="secondary"
                                variant="contained"
                                onClick={ () => setOpenDrawer( !openDrawer ) }
                                size="small"
                            >
                                Vista previa
                            </StyledButton>
                        )
                    }
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{
                                p:0
                            }}
                        >
                            <>
                                {
                                    auth.img ? 
                                    <Avatar
                                        sx={{
                                            height: 30,
                                            width: 30
                                        }}
                                        src={ auth.img }
                                    /> : (
                                        <AccountCircle />
                                    )
                                }
                                <ArrowDropDown/>
                            </>
                            
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate('/profile');
                            }}>Mi perfil</MenuItem>
                            <MenuItem onClick={() => {
                                handleClose();
                                navigate('/subscription');
                            }}>Mi subscripción</MenuItem>
                            <MenuItem 
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
                {
                ui.showPublishZoneBar && (
                    <Box
                        sx={{ 
                            width: '100%',
                            background: zone.currentStatus === "isPublished" ? theme.palette.secondary.dark : orange[800],
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center', 
                        }}
                        
                    >
                        {
                            auth?.hasVerifiedEmail ? (
                                <>
                                    <Typography
                                        sx={{
                                            ml: 1
                                        }}
                                        variant="caption"
                                    >
                                        { zone.currentStatus === "isPublished" ?  'Tu Zone está publicado' : 'Tu Zone está invisible' }
                                    </Typography>
                                    <StyledSwitch
                                        sx={{
                                            mr: 1
                                        }}
                                        disabled={ !auth?.hasVerifiedEmail }
                                        defaultChecked={  zone.currentStatus === "isPublished" }
                                        onChange={ handleChangeZoneStatus }
                                    />
                                </>
                            ) : (
                                <Typography
                                    sx={{
                                        ml: 1
                                    }}
                                    variant="caption"
                                >
                                    Debes confirmar tu correo antes de poder publicar tu Zone
                                </Typography>
                            )
                        }
                        
                    </Box>
                    
                )
            }
            </AppBar>
            

            {
                zone && 
                (
                    <Drawer
                        anchor="top"
                        open={ openDrawer }
                        sx={{
                            zIndex: 100
                        }}
                        PaperProps={{
                            sx:{
                                pt: 10,
                                pb: 5,
                                justifyContent: 'center',
                                display: 'flex',
                                flexDirection: 'row'
                            }
                        }}
                    >
                        <ZonePhonePreview
                            relative
                        />
                    </Drawer>
                )
            }
            
        </>

    );
}

export default Header;