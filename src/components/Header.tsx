import React from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Drawer } from "@mui/material"; 
import { motion } from "framer-motion";
import Logo from "./../assets/logo.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../actions/auth";
import { Visibility } from "@mui/icons-material";
import PreviewSection from "../pages/zoneForm/PreviewSection";
import { useState } from 'react';

const Header = () => {
    const navigate = useNavigate();
    const { zone } = useSelector( (state:any) => state )
    const [ anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [ openDrawer, setOpenDrawer ] = useState<boolean>( false );
    const theme = useTheme();
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
                    <IconButton
                        onClick={ () => setOpenDrawer( !openDrawer ) }
                    >
                        <Visibility/>
                    </IconButton>
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
                        <AccountCircle />
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
                            <MenuItem onClick={handleClose}>Mi perfil</MenuItem>
                            <MenuItem onClick={handleLogout}>Cerrar Sesión</MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            {
                zone && 
                (
                    <Drawer
                        anchor="top"
                        open={ openDrawer }
                        sx={{
                            zIndex: 100,
                        }}
                    >
                        <PreviewSection/>
                    </Drawer>
                )
            }
            
        </>

    );
}

export default Header;