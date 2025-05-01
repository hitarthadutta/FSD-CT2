import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
  AppBar,
  Toolbar,
  CircularProgress,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import axios from 'axios';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 87, 34, .3)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'rgba(33, 33, 33, 0.95)',
  color: '#fff',
  border: '1px solid rgba(255, 152, 0, 0.18)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 20px rgba(255, 87, 34, 0.3)',
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundSize: 'contain',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderBottom: '1px solid rgba(255, 152, 0, 0.18)',
}));

const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(45deg, #F4511E 30%, #FB8C00 90%)',
  },
}));

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/members');
      setMembers(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching members:', error);
      setLoading(false);
    }
  };

  const handleMemberClick = (memberId) => {
    navigate(`/member/${memberId}`);
  };

  const getDefaultImage = (name) => {
    // Generate a colorful placeholder with initials if no image is available
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF9800&color=fff&size=200`;
  };

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
          <StyledButton
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </StyledButton>
        </Toolbar>
      </StyledAppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            background: 'rgba(33, 33, 33, 0.95)',
            borderRadius: 3,
            border: '1px solid rgba(255, 152, 0, 0.18)',
            mb: 4
          }}
        >
          <GradientText variant="h4" component="h1" gutterBottom align="center">
            Meet Our Amazing Team
          </GradientText>
        </Paper>

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
            <CircularProgress sx={{ color: '#FF9800' }} />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {members.map((member) => (
              <Grid item key={member._id} xs={12} sm={6} md={4}>
                <StyledCard onClick={() => handleMemberClick(member._id)}>
                  <StyledCardMedia
                    component="img"
                    image={member.imagePath ? `http://localhost:5000/${member.imagePath}` : getDefaultImage(member.name)}
                    alt={member.name}
                    onError={(e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = getDefaultImage(member.name);
                    }}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ color: '#FF9800' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Roll No: {member.rollNumber}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Year: {member.year}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      Degree: {member.degree}
                    </Typography>
                  </CardContent>
                </StyledCard>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}

export default ViewMembers; 