import { Container, Box } from '@mui/material';
import { Header } from './components/Header';
import { SearchForm } from './components/SearchForm';
import { SearchResult } from './components/SearchResult';
import { useBabel } from './hooks/useBabel';
import { useState } from 'react';
import { SnackbarAlert } from './components/SnackbarAlert';


function App() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const {
    address,
    title,
    pageContent,
    searchTerm,
    handleSearch,
    handleSearchTitle,
    handleViewAddress,
    navigatePage,
  } = useBabel(showSnackbar);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', p: 4 }}>
      <Container maxWidth="md">
        <Header />
        <SearchForm
          onSearchText={handleSearch}
          onSearchTitle={handleSearchTitle}
          onViewAddress={handleViewAddress}
          showSnackbar={showSnackbar}
        />
        <SearchResult
          address={address}
          title={title}
          pageContent={pageContent}
          searchTerm={searchTerm}
          onNavigatePage={navigatePage}
        />
      </Container>
      <SnackbarAlert
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </Box>
  );
}

export default App;
