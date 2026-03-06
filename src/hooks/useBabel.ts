import { useState } from 'react';
import { getPage, getTitle, search, searchTitle } from '../lib/babel';
import { TOTAL_PAGES } from '../lib/constants';

export const useBabel = (showSnackbar: (message: string, severity: 'success' | 'error' | 'warning' | 'info') => void) => {
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text: string) => {
    if (!text.trim()) return;
    setSearchTerm(text);
    const addr = search(text);
    setAddress(addr);
    setPageContent(getPage(addr));
    setTitle(getTitle(addr));
  };

  const handleViewAddress = (addr: string) => {
    if (!addr.trim()) {
      showSnackbar('Address cannot be empty.', 'warning');
      return;
    }
    setAddress(addr);
    setPageContent(getPage(addr));
    setTitle(getTitle(addr));
  };

  const handleSearchTitle = (text: string) => {
    if (!text.trim()) return;
    setSearchTerm(text);
    const addr = searchTitle(text) + ':1';
    setAddress(addr);
    setPageContent(getPage(addr));
    setTitle(getTitle(addr));
  };

  const navigatePage = (direction: 'prev' | 'next') => {
    const parts = address.split(':');
    if (parts.length < 5) {
      showSnackbar('Invalid address format for navigation.', 'error');
      return;
    }
    
    let currentPage = parseInt(parts[4]);
    
    if (isNaN(currentPage) || currentPage < 1) {
      showSnackbar('Invalid page number for navigation.', 'error');
      return;
    }

    if (direction === 'next') {
      currentPage = currentPage >= TOTAL_PAGES ? 1 : currentPage + 1;
    } else {
      currentPage = currentPage <= 1 ? TOTAL_PAGES : currentPage - 1;
    }
    
    const newAddress = `${parts[0]}:${parts[1]}:${parts[2]}:${parts[3]}:${currentPage}`;
    setAddress(newAddress);
    setPageContent(getPage(newAddress));
    setTitle(getTitle(newAddress));
  };

  return {
    address,
    title,
    pageContent,
    searchTerm,
    handleSearch,
    handleSearchTitle,
    handleViewAddress,
    navigatePage,
  };
};
