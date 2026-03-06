import { useState } from 'react';
import {
  Typography,
  Box,
  Paper,
  IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { SnackbarAlert } from '../SnackbarAlert';

interface FullAddressProps {
  address: string;
}

export const FullAddress = ({ address }: FullAddressProps) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error' | 'warning' | 'info'>('info');

  const handleClick = () => {
    navigator.clipboard.writeText(address).then(() => {
      setSnackbarMessage('Address copied to clipboard!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" display="block" sx={{ color: 'text.secondary', mb: 1 }}>
          Full Address (for sharing)
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Paper component="code" elevation={0} sx={{ p: 1, bgcolor: 'background.paper', border: '1px solid', borderColor: 'divider', display: 'block', wordBreak: 'break-all', whiteSpace: 'pre-wrap', flexGrow: 1 }}>
            {address}
          </Paper>
          <IconButton onClick={handleClick} aria-label="Copy address">
            <ContentCopyIcon />
          </IconButton>
        </Box>
      </Box>
      <SnackbarAlert
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </>
  );
};
