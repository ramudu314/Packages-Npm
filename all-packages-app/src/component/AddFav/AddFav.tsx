import React, { useState } from 'react';
import SearchBar from './SearchBar';
import PackageList from './Packages';
import { SearchResultItem } from '../../constant';

const AddFavorite: React.FC = () => {
  const [searchResults, setSearchResults] = useState<SearchResultItem[]>([]);


  const handleSearch = (results: SearchResultItem[]) => {
    setSearchResults(results);

  }


  return (
    <div className="text-xl w-full text-gray-900 mb-6 p-4">
      <SearchBar onSearch={handleSearch} />
      <PackageList searchResults={searchResults} />


    </div>




  );
};

export default AddFavorite;