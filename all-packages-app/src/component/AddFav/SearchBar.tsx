import React, { useState, useEffect } from 'react';
import { Input, Box, Text, Spinner, Alert, AlertIcon, VStack } from '@chakra-ui/react';
import useDebounce from "../../utils/Debounce"; 
import useApi from '../../utils/ApiLink';  
import { SearchApiResponse, SearchResultItem } from '../../constant';

interface SearchBarProps {
  onSearch: (results: SearchResultItem[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 1000);

  const apiUrl = `https://api.npms.io/v2/search?q=${debouncedQuery}`;
  const { data, loading, error } = useApi<SearchApiResponse>(apiUrl);

  useEffect(() => {
    if (data && data.results) {
      const results: SearchResultItem[] = data.results;
      onSearch(results);
    }
  }, [data, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box width="100%" display="flex" flexDirection="column" alignItems="center" gap="4">
      {/* Input Box */}
      <Box width="100%" maxWidth="500px">
        <p className='text-xl font-bold'>Search for NPM Packages</p>
        <Input
        
          placeholder="Search for NPM Packages"
          value={query}
          onChange={handleInputChange}
          size="lg"
          variant="outline"
          focusBorderColor="blue.400"
        />
      </Box>

      {/* Results Box */}
      <Box width="100%" maxWidth="500px" mt="2">
        {loading && (
          <Box display="flex" alignItems="center" justifyContent="center">
            <Spinner color="blue.400" size="md" />
            <Text ml="2" color="blue.500" fontWeight="medium">
              Loading...
            </Text>
          </Box>
        )}

        {error && (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error.message}
          </Alert>
        )}

          
      </Box>
    </Box>
  );
};

export default SearchBar;
