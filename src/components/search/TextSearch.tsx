import { useState } from 'react';
import {
  Button,
  TextField,
  Box,
  Grid,
} from '@mui/material';
import { Search, Book } from '@mui/icons-material';

interface TextSearchProps {
  onSearchText: (text: string) => void;
  onSearchTitle: (text: string) => void;
}

export const TextSearch = ({ onSearchText, onSearchTitle }: TextSearchProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (!searchText.trim()) return;
    onSearchText(searchText.toLowerCase());
  };

  const handleSearchTitle = () => {
    if (!searchText.trim()) return;
    onSearchTitle(searchText.toLowerCase());
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Search for text in the Library"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Enter any text..."
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Grid container spacing={2}>
        <Grid size={{xs: 12, sm: 6}}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<Search />}
            onClick={handleSearch}
            sx={{ py: 1.5 }}
          >
            Search in Page
          </Button>
        </Grid>
        <Grid size={{xs: 12, sm: 6}}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            startIcon={<Book />}
            onClick={handleSearchTitle}
            sx={{ py: 1.5 }}
          >
            Search as Title
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
