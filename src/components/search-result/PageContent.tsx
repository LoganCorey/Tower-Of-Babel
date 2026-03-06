import { useMemo } from 'react';
import {
  Paper,
} from '@mui/material';

interface PageContentProps {
  pageContent: string;
  searchTerm: string;
}

export const PageContent = ({ pageContent, searchTerm }: PageContentProps) => {
  const highlightedContent = useMemo(() => {
    if (!searchTerm) {
      return pageContent;
    }
    const parts = pageContent.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <mark key={index}>{part}</mark>
      ) : (
        part
      )
    );
  }, [pageContent, searchTerm]);

  return (
    <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider', whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontFamily: 'monospace', lineHeight: '1.6', maxHeight: '900px', overflowY: 'scroll' }}>
      {highlightedContent}
    </Paper>
  );
};
