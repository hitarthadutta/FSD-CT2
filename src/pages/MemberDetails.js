import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  AppBar,
  Toolbar,
  CircularProgress,
  Avatar,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from '@mui/icons-material/Email';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import InterestsIcon from '@mui/icons-material/Interests';
import FlagIcon from '@mui/icons-material/Flag';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FF5722 30%, #FF9800 90%)',
  boxShadow: '0 3px 5px 2px rgba(255, 87, 34, .3)',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(33, 33, 33, 0.95)',
  color: '#fff',
  borderRadius: theme.spacing(3),
  border: '1px solid rgba(255, 152, 0, 0.18)',
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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 200,
  height: 200,
  border: '4px solid rgba(255, 152, 0, 0.3)',
  boxShadow: '0 0 20px rgba(255, 87, 34, 0.3)',
  '& img': {
    objectFit: 'contain',
  },
}));

const InfoSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(255, 152, 0, 0.05)',
  borderRadius: theme.spacing(2),
  border: '1px solid rgba(255, 152, 0, 0.1)',
  marginBottom: theme.spacing(3),
}));

function MemberDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchMemberDetails();
  }, [id]);

  const fetchMemberDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/members/${id}`);
      setMember(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching member details:', error);
      setLoading(false);
    }
  };

  const getDefaultImage = (name) => {
    // Generate a colorful placeholder with initials if no image is available
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF9800&color=fff&size=200`;
  };

  const handleDeleteClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      navigate('/view');
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Error deleting member. Please try again.');
    }
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress sx={{ color: '#FF9800' }} />
      </Box>
    );
  }

  if (!member) {
    return (
      <Box sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff'
      }}>
        <Typography variant="h5">Member not found</Typography>
      </Box>
    );
  }

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
            onClick={() => navigate('/view')}
            sx={{ mr: 2 }}
          >
            Back to Members
          </StyledButton>
          <StyledButton
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
            sx={{
              background: 'linear-gradient(45deg, #f44336 30%, #ff5252 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
              },
            }}
          >
            Delete Member
          </StyledButton>
        </Toolbar>
      </StyledAppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <StyledPaper elevation={3}>
          <Grid container spacing={4}>
            {/* Profile Section */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 200,
                  height: 200,
                  margin: '0 auto',
                  '&:hover': {
                    '& .zoom-overlay': {
                      opacity: 1,
                    },
                  },
                }}
              >
                <StyledAvatar
                  src={member.imagePath ? `http://localhost:5000/${member.imagePath}` : getDefaultImage(member.name)}
                  alt={member.name}
                  imgProps={{
                    onError: (e) => {
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = getDefaultImage(member.name);
                    },
                  }}
                />
                {member.imagePath && (
                  <Box
                    className="zoom-overlay"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255, 152, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      cursor: 'pointer',
                      borderRadius: '50%',
                    }}
                    onClick={() => window.open(`http://localhost:5000/${member.imagePath}`, '_blank')}
                  >
                    <Typography variant="body2" sx={{ color: '#fff' }}>
                      Click to zoom
                    </Typography>
                  </Box>
                )}
              </Box>
              <GradientText variant="h4" sx={{ mt: 3, mb: 1 }}>
                {member.name}
              </GradientText>
              <Typography variant="subtitle1" sx={{ color: 'rgba(255, 255, 255, 0.7)', mb: 2 }}>
                {member.rollNumber}
              </Typography>
              <Divider sx={{ my: 2, borderColor: 'rgba(255, 152, 0, 0.2)' }} />
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                <EmailIcon sx={{ color: '#FF9800' }} />
                <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                  {member.email || 'No email provided'}
                </Typography>
              </Box>
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={8}>
              <InfoSection>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon sx={{ color: '#FF9800', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#FF9800' }}>
                    Academic Information
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Year: {member.year}
                </Typography>
                <Typography variant="body1">
                  Degree: {member.degree}
                </Typography>
              </InfoSection>

              <InfoSection>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ color: '#FF9800', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#FF9800' }}>
                    Project Details
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {member.aboutProject || 'No project details provided'}
                </Typography>
              </InfoSection>

              <InfoSection>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmojiEventsIcon sx={{ color: '#FF9800', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#FF9800' }}>
                    Certificates
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {member.certificate || 'No certificates provided'}
                </Typography>
              </InfoSection>

              <InfoSection>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <WorkIcon sx={{ color: '#FF9800', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#FF9800' }}>
                    Internships
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {member.internship || 'No internship details provided'}
                </Typography>
              </InfoSection>

              <InfoSection>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InterestsIcon sx={{ color: '#FF9800', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#FF9800' }}>
                    Hobbies
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {member.hobbies || 'No hobbies provided'}
                </Typography>
              </InfoSection>

              <InfoSection>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FlagIcon sx={{ color: '#FF9800', mr: 1 }} />
                  <Typography variant="h6" sx={{ color: '#FF9800' }}>
                    Career Goals
                  </Typography>
                </Box>
                <Typography variant="body1">
                  {member.aboutAim || 'No career goals provided'}
                </Typography>
              </InfoSection>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: {
            backgroundColor: '#333',
            color: '#fff',
          },
        }}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Are you sure you want to delete this member? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#FF9800' }}>
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            sx={{ 
              color: '#fff',
              background: 'linear-gradient(45deg, #f44336 30%, #ff5252 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #d32f2f 30%, #f44336 90%)',
              },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MemberDetails; 