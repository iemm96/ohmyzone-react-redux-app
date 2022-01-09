import React from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@mui/material"; 
import { motion } from "framer-motion";
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "./../assets/logo.svg";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { useTheme } from '@mui/material/styles';

const transition = {
    duration: 1,
    ease: [.2, .01, -0.05, 0.9]
}

const Header = () => {
    const navigation = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
          navigation('/');
          setAnchorEl(null);
      };

    return(
        <motion.div
            initial={{
                y:-50,
            }}
            animate={{
                y:0,
                transition
            }}
        >
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
                                delay: 1
                            }
                        }}
                        style={{
                            height: 40,
                        }}
                        alt="logo"
                        src={Logo}
                    />
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
                                <MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
                            </Menu>
                        </div>
                </Toolbar>
            </AppBar>
        </motion.div>
    );
}

export default Header;