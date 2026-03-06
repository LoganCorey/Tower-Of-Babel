import {
  Typography,
  Grid,
  Paper,
} from '@mui/material';

interface LocationDetailsProps {
  address: string;
}

export const LocationDetails = ({ address }: LocationDetailsProps) => {
  const addressParts = address.split(':');

  if (addressParts.length < 5) {
    return null;
  }

  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', mb: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
        Location in the Library
      </Typography>
      <Grid container spacing={2} textAlign="center">
        <Grid size={{xs: 5, sm:3}}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>Wall</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{addressParts[1]}</Typography>
          </Paper>
        </Grid>
        <Grid size={{xs: 5, sm:3}}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>Shelf</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{addressParts[2]}</Typography>
          </Paper>
        </Grid>
        <Grid size={{xs: 5, sm:3}}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>Volume</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{addressParts[3]}</Typography>
          </Paper>
        </Grid>
        <Grid size={{xs: 5, sm:3}}>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography variant="caption" display="block" sx={{ color: 'text.secondary' }}>Page</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{addressParts[4]}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};
