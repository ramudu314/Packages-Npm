import React, { useState } from 'react';
import styled from 'styled-components';
import { SearchResultItem } from '../../constant';
import TextArea from '../../utils/TextArea';
import Button from '../../utils/SytleButton'; // Adjust the path based on your project structure
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button as ChakraButton } from '@chakra-ui/react';

interface PackageListProps {
  searchResults: SearchResultItem[];
}

interface DataItem {
  selectedPackage: string;
  textValue: string;
}

const ScrollableWrapper = styled.div`
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: #f8fafc; /* Light background for better visibility */
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.875rem; /* Smaller font size for error messages */
`;

const PackageList: React.FC<PackageListProps> = ({ searchResults }) => {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [textValue, setTextValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
  };

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
    setErrorMessage(''); // Clear error message when a new package is selected
  };

  const handleData = () => {
    if (!selectedPackage) {
      setErrorMessage('Please select a package.');
      return;
    }

    const newObj: DataItem = {
      selectedPackage,
      textValue,
    };

    const storedDataString = localStorage.getItem('data');

    let storedData: DataItem[] = [];
    if (storedDataString) {
      storedData = JSON.parse(storedDataString);
    }

    const exists = storedData.some((item) => item.selectedPackage === selectedPackage);
    if (exists) {
      setErrorMessage('This package is already present in favorites.');
      return;
    }

    storedData.push(newObj);
    localStorage.setItem('data', JSON.stringify(storedData));

    // Open the modal with success message
    setModalMessage('Package added to favorites');
    setIsModalOpen(true);

    // Clear the form
    setSelectedPackage(null);
    setTextValue('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-3/4 m-auto mt-10 p-6  rounded-md ">
      <h2 className="text-xl font-bold mb-5 text-gray-700">Search Results</h2>
      {searchResults && (
        <ScrollableWrapper>
          <ul className="space-y-3">
            {searchResults.map((result, index) => (
              <li key={index} className="flex items-center text-gray-600 hover:text-gray-800">
                <input
                  className="mr-3 accent-blue-500"
                  type="radio"
                  name="packageSelection"
                  value={result.package.name}
                  checked={selectedPackage === result.package.name}
                  onChange={() => handleSelectPackage(result.package.name)}
                />
                {result.package.name}
              </li>
            ))}
          </ul>
        </ScrollableWrapper>
      )}

      <TextArea
        label="Why is this your favorite?"
        rows={4}
        placeholder="Type your reason here..."
        value={textValue}
        onChange={handleTextAreaChange}
        
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <div className="mt-4">
        <ChakraButton onClick={handleData} colorScheme="teal">
          Submit
        </ChakraButton>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modalMessage}
          </ModalBody>
          <ModalFooter>
            <ChakraButton onClick={closeModal} variant="outline" mr={3}>
              Close
            </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PackageList;