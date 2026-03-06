import { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
} from '@mui/material';
import { Search, VpnKey } from '@mui/icons-material';
import { TextSearch } from './search/TextSearch';
import { AddressSearch } from './search/AddressSearch';

interface SearchFormProps {
  onSearchText: (text: string) => void;
  onSearchTitle: (text: string) => void;
  onViewAddress: (address: string) => void;
  showSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void;
}

export const SearchForm = ({ onSearchText, onSearchTitle, onViewAddress, showSnackbar }: SearchFormProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} centered>
          <Tab icon={<Search />} iconPosition="start" label="Search Text" />
          <Tab icon={<VpnKey />} iconPosition="start" label="View by Address" />
        </Tabs>
        <Box sx={{ p: 3 }}>
          {activeTab === 0 && (
            <TextSearch onSearchText={onSearchText} onSearchTitle={onSearchTitle} />
          )}
          {activeTab === 1 && (
            <AddressSearch onViewAddress={onViewAddress} showSnackbar={showSnackbar} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
