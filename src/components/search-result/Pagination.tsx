import {
  Typography,
  Box,
  Grid,
  Button,
} from '@mui/material';
import { TOTAL_PAGES } from '../../lib/constants';

interface PaginationProps {
  address: string;
  onNavigatePage: (direction: 'prev' | 'next') => void;
}

export const Pagination = ({ address, onNavigatePage }: PaginationProps) => {
  const addressParts = address.split(':');

  if (addressParts.length !== 5) {
    return null;
  }

  return (
    <>
      <Box sx={{ my: 2, textAlign: 'center' }}>
        <Typography variant="h6">
          Page {addressParts[4]} of {TOTAL_PAGES}
        </Typography>
      </Box>
      <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
        <Grid size={{xs: 5}}>
          <Button fullWidth variant="outlined" onClick={() => onNavigatePage('prev')}>
            &larr; Previous
          </Button>
        </Grid>
        <Grid size={{xs: 5}}>
          <Button fullWidth variant="outlined" onClick={() => onNavigatePage('next')}>
            Next  &rarr;
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
