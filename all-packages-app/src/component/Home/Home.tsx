import React from 'react';
import { useNavigate } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button as ChakraButton } from '@chakra-ui/react';
import Button from '../../utils/SytleButton';

const Home: React.FC = () => {
  const Navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleClick = () => {
    Navigate('/add');
    setIsModalOpen(true); // Open the modal on button click
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <h1 className="text-xl m-20 text-center">Welcome to Favorite NPM Packages</h1>

      <div className=" flex items-center justify-center align-middle">
        <div className="text-center border-2 border-gray-300 p-20 w-8/12 rounded-lg">
          <p className=" text-xl m-7 text-sm text-gray-600">You don't have any favs yet. Please add.</p>
          <ChakraButton onClick={handleClick} colorScheme="teal">
            Add fav
          </ChakraButton>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Success</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Package added to favorites
          </ModalBody>
          <ModalFooter>
            <ChakraButton onClick={closeModal} colorScheme="blue" variant="outline" mr={3}>
              Close
            </ChakraButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Home;
