import { AppBar, Toolbar, Typography, Box, styled } from '@mui/material';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  color: 'inherit',
  marginBottom: '2rem',
});

export const Header = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontFamily: 'serif', color: 'text.primary' }}>
            The Library of Babel
          </Typography>
          <Typography variant="subtitle1" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            "The library will endure; it is the universe."
          </Typography>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};
