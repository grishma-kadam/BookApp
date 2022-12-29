import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem';
import {Link } from 'react-router-dom'
import { AuthContext } from '../store/authContext'
import { useContext } from 'react'
import useLogout from '../hooks/useLogout';


function Header() {

  const {user}=useContext(AuthContext)
  const {logout}=useLogout()

  const [anchorElNav, setAnchorElNav] =useState();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const onlogout=async()=>{
await logout()
  }
  
  return (
    <AppBar position="sticky" style={{width:"100%",boxSizing:"border-box",margin:0,padding:0}}>
      <Container maxWidth="xl"  >
        <Toolbar disableGutters >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
         
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          
            {user &&
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <Link to="/add" style={{color:"#080906",textDecoration:'none'}}>
                <MenuItem  onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Add</Typography>
                </MenuItem>
                </Link>
                <MenuItem  onClick={handleCloseNavMenu}>
                <Link to="/" style={{color:"#080906",textDecoration:'none'}}><Typography textAlign="center">Show All</Typography></Link>
                </MenuItem>
                <MenuItem  >
                <Link onClick={onlogout} style={{color:"#080906",textDecoration:'none'}} >Log Out</Link>
                </MenuItem>
                
              
            </Menu>
}
{
  !user &&    <Menu
  id="menu-appbar"
  anchorEl={anchorElNav}
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'left',
  }}
  keepMounted
  transformOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }}
  open={Boolean(anchorElNav)}
  onClose={handleCloseNavMenu}
  sx={{
    display: { xs: 'block', md: 'none' },
  }}
>
  <Link to="/user/login">
    <MenuItem  onClick={handleCloseNavMenu}>
      <Typography textAlign="center">Log In</Typography>
    </MenuItem>
    </Link>
    <MenuItem  onClick={handleCloseNavMenu}>
    <Link to="/user/signup"><Typography textAlign="center">Sign Up</Typography></Link>
    </MenuItem>
  
</Menu>
}
          </Box>
          <Box sx={{padding:2}}>
       
         
        
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
          {user && <><Link to="/add" style={{textDecoration:"none"}}>
              <Button
               
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                ADD
              </Button>
              </Link>
              <Link to="/" style={{textDecoration:"none"}}>
              <Button
               
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Show All
              </Button>
              </Link>
              <Button onClick={onlogout}>
              <Link style={{textDecoration:'none',color:"#fff",padding:"0px 0px 0px 20px"}}>Log Out</Link>
              </Button>

              </>
}
{
  !user && <><Link to="/user/signup" style={{textDecoration:"none"}}>
  <Button
   
    onClick={handleCloseNavMenu}
    sx={{ my: 2, color: 'white', display: 'block' }}
  >
    Sign Up
  </Button>
  </Link>
  <Link to="/user/login" style={{textDecoration:"none"}}>
  <Button
   
    onClick={handleCloseNavMenu}
    sx={{ my: 2, color: 'white', display: 'block' }}
  >
    Log In
  </Button>
  </Link>
  </>
}

          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;