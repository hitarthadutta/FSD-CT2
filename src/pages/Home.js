import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Stack,
  AppBar,
  Toolbar,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 87, 34, .3)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  textAlign: 'center',
  background: 'rgba(33, 33, 33, 0.95)',
  borderRadius: theme.spacing(3),
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255, 152, 0, 0.18)',
  color: '#fff',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(2),
  fontSize: '1.1rem',
  textTransform: 'none',
  margin: theme.spacing(1),
  minWidth: 220,
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(255, 87, 34, 0.3)',
  },
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      color: '#fff'
    }}>
      <StyledAppBar position="static">
        <Toolbar>
          <GroupIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            iTeam Management
          </Typography>
        </Toolbar>
      </StyledAppBar>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <StyledPaper elevation={3}>
          <GradientText variant="h1" component="h1" gutterBottom sx={{ mb: 4, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
            iTeam
          </GradientText>
          
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              mb: 6, 
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Welcome to the iTeam Management Portal
          </Typography>

          <Box sx={{ mt: 6 }}>
            <Paper 
              elevation={2} 
              sx={{ 
                p: 4, 
                background: 'rgba(255, 152, 0, 0.05)',
                borderRadius: 3,
                border: '1px solid rgba(255, 152, 0, 0.1)'
              }}
            >
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  mb: 4,
                  color: '#FF9800',
                  fontWeight: 600
                }}
              >
                Manage Your Team
              </Typography>
              
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3} 
                justifyContent="center"
              >
                <StyledButton
                  variant="contained"
                  onClick={() => navigate('/add')}
                  startIcon={<AddIcon />}
                  sx={{
                    background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
                    color: '#fff',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #F4511E 30%, #FB8C00 90%)',
                    }
                  }}
                >
                  Add Member
                </StyledButton>
                
                <StyledButton
                  variant="outlined"
                  onClick={() => navigate('/view')}
                  startIcon={<VisibilityIcon />}
                  sx={{
                    borderColor: '#FF9800',
                    color: '#FF9800',
                    borderWidth: 2,
                    '&:hover': {
                      borderWidth: 2,
                      borderColor: '#FF5722',
                      color: '#FF5722',
                      background: 'rgba(255, 152, 0, 0.04)',
                    }
                  }}
                >
                  View Members
                </StyledButton>
              </Stack>
            </Paper>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
}

export default Home; 