import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  AppBar,
  Toolbar,
  Grid,
  MenuItem,
  Avatar,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import GroupIcon from '@mui/icons-material/Group';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
  padding: theme.spacing(1.5, 4),
  '&:hover': {
    background: 'linear-gradient(45deg, #F4511E 30%, #FB8C00 90%)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    color: '#fff',
    '& fieldset': {
      borderColor: 'rgba(255, 152, 0, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255, 152, 0, 0.5)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#FF9800',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#FF9800',
  },
  '& .MuiSelect-icon': {
    color: 'rgba(255, 152, 0, 0.5)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 150,
  height: 150,
  border: '3px solid rgba(255, 152, 0, 0.3)',
  boxShadow: '0 0 20px rgba(255, 87, 34, 0.3)',
  margin: '0 auto',
  cursor: 'pointer',
  '&:hover': {
    borderColor: '#FF9800',
  },
}));

function AddMember() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    year: '',
    degree: '',
    email: '',
    aboutProject: '',
    hobbies: '',
    certificate: '',
    internship: '',
    aboutAim: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Append all text fields
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      // Append image if selected
      if (selectedImage) {
        formDataToSend.append('image', selectedImage);
      }

      await axios.post('http://localhost:5000/api/members', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate('/view');
    } catch (error) {
      console.error('Error adding member:', error);
      alert('Error adding team member. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDefaultImage = (name) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF9800&color=fff&size=150`;
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

      <Container maxWidth="md" sx={{ py: 8 }}>
        <StyledPaper elevation={3}>
          <GradientText variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            Add New Team Member
          </GradientText>

          <form onSubmit={handleSubmit}>
            {/* Image Upload Section */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <input
                accept="image/*"
                type="file"
                id="image-upload"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="image-upload">
                <StyledAvatar
                  src={previewUrl || (formData.name ? getDefaultImage(formData.name) : undefined)}
                  alt={formData.name || 'Profile Preview'}
                >
                  {!previewUrl && !formData.name && <PhotoCamera sx={{ fontSize: 40, color: 'rgba(255, 152, 0, 0.5)' }} />}
                </StyledAvatar>
                <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                  Click to upload profile photo
                </Typography>
              </label>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Roll Number"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <StyledTextField
                  fullWidth
                  select
                  label="Year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  required
                  variant="outlined"
                >
                  {['1st Year', '2nd Year', '3rd Year', '4th Year'].map((year) => (
                    <MenuItem key={year} value={year} sx={{ color: '#000' }}>
                      {year}
                    </MenuItem>
                  ))}
                </StyledTextField>
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Degree"
                  name="degree"
                  value={formData.degree}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="About Project"
                  name="aboutProject"
                  value={formData.aboutProject}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Hobbies"
                  name="hobbies"
                  value={formData.hobbies}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Enter your hobbies..."
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Certificates"
                  name="certificate"
                  value={formData.certificate}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="List your certificates..."
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Internships"
                  name="internship"
                  value={formData.internship}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  variant="outlined"
                  placeholder="Describe your internship experience..."
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Career Goals"
                  name="aboutAim"
                  value={formData.aboutAim}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                  placeholder="Share your career goals..."
                />
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <StyledButton
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={<CloudUploadIcon />}
                  >
                    {loading ? 'Adding Member...' : 'Add Member'}
                  </StyledButton>
                </Box>
              </Grid>
            </Grid>
          </form>
        </StyledPaper>
      </Container>
    </Box>
  );
}

export default AddMember; 