import { useState } from 'react';
import {
  Button,
  TextField,
  Box,
} from '@mui/material';
import { Book } from '@mui/icons-material';

interface AddressSearchProps {
  onViewAddress: (address: string) => void;
  showSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

export const AddressSearch = ({ onViewAddress, showSnackbar }: AddressSearchProps) => {
  const [viewAddress, setViewAddress] = useState('');

  const handleViewAddress = () => {
    if (!viewAddress.trim()) {
      showSnackbar('Address cannot be empty.', 'warning');
      return;
    }

    const parts = viewAddress.split(':');
    if (parts.length !== 5) {
      showSnackbar('Invalid address format. Expected HEX:WALL:SHELF:VOLUME:PAGE', 'error');
      return;
    }

    const wall = parseInt(parts[1], 10);
    const shelf = parseInt(parts[2], 10);
    const volume = parseInt(parts[3], 10);
    const page = parseInt(parts[4], 10);

    if (isNaN(wall) || wall < 0 || isNaN(shelf) || shelf < 0 || isNaN(volume) || volume < 0 || isNaN(page) || page < 0) {
      showSnackbar('Invalid wall, shelf, volume, or page selected. Values must be non-negative numbers.', 'error');
      return;
    }

    onViewAddress(viewAddress);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Enter page address (format: HEX:WALL:SHELF:VOLUME:PAGE)"
        value={viewAddress}
        onChange={(e) => setViewAddress(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleViewAddress()}
        placeholder="e.g., ABC123:1:2:15:100"
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button
        fullWidth
        variant="contained"
        color="primary"
        startIcon={<Book />}
        onClick={handleViewAddress}
        sx={{ py: 1.5 }}
      >
        View Page
      </Button>
    </Box>
  );
};
