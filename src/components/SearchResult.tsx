import {
  Typography,
  Card,
  CardContent,
} from '@mui/material';
import { LocationDetails } from './search-result/LocationDetails';
import { FullAddress } from './search-result/FullAddress';
import { PageContent } from './search-result/PageContent';
import { Pagination } from './search-result/Pagination';

interface SearchResultProps {
  address: string;
  title: string;
  pageContent: string;
  searchTerm: string;
  onNavigatePage: (direction: 'prev' | 'next') => void;
}

export const SearchResult = ({ address, title, pageContent, searchTerm, onNavigatePage }: SearchResultProps) => {
  if (!pageContent) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom sx={{ fontFamily: 'serif', wordWrap: 'break-word' }}>
          {title}
        </Typography>

        <LocationDetails address={address} />
        <FullAddress address={address} />
        <PageContent pageContent={pageContent} searchTerm={searchTerm} />
        <Pagination address={address} onNavigatePage={onNavigatePage} />
      </CardContent>
    </Card>
  );
};
