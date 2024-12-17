import React, { useState } from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Box,
  Heading,
  Textarea,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from '@chakra-ui/react';

interface DataItem {
  selectedPackage: string | null;
  textValue: string | null;
}

const Favorite: React.FC = () => {
  const [storedData, setStoredData] = useState<DataItem[]>([]);
  const [selectedPackageToDelete, setSelectedPackageToDelete] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<DataItem | null>(null);
  const [editedTextValue, setEditedTextValue] = useState<string>('');
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteModalOpen, onClose: onDeleteModalClose } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const navigate = useNavigate();

  const handleOpenDeleteModal = (packageName: string | null) => {
    setSelectedPackageToDelete(packageName);
    onDeleteModalOpen();
  };

  const handleOpenEditModal = (item: DataItem) => {
    setSelectedPackage(item);
    setEditedTextValue(item.textValue || '');
    onEditModalOpen();
  };

  const handleEditPackage = () => {
    if (selectedPackage) {
      const updatedData = storedData.map(item =>
        item.selectedPackage === selectedPackage.selectedPackage
          ? { ...item, textValue: editedTextValue }
          : item
      );
      setStoredData(updatedData);
      localStorage.setItem('data', JSON.stringify(updatedData));
      onEditModalClose();
    }
  };

  const handleDeletePackage = () => {
    if (selectedPackageToDelete) {
      const updatedData = storedData.filter(item => item.selectedPackage !== selectedPackageToDelete);
      setStoredData(updatedData);
      localStorage.setItem('data', JSON.stringify(updatedData));
      onDeleteModalClose();
    }
  };

  React.useEffect(() => {
    const storedDataString = localStorage.getItem('data');
    if (storedDataString) {
      setStoredData(JSON.parse(storedDataString));
    }
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6} px={6}>
        <Heading as="h1" fontSize="2xl" color="teal.500">
          Favorite Packages
        </Heading>
        <Button
          colorScheme="teal"
          size="md"
          onClick={() => navigate("/add")}
        >
          Add Favorite
        </Button>
      </Box>

      <Box maxW="90%" mx="auto" boxShadow="md" borderRadius="lg" p={6} bg="gray.50">
        {storedData.length > 0 ? (
          <Table variant="simple" colorScheme="teal">
            <Thead>
              <Tr>
                <Th fontSize="md" textAlign="left">Package Name</Th>
                <Th fontSize="md" textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {storedData.map((item, index) => (
                <Tr key={index} _hover={{ bg: "gray.100" }}>
                  <Td>{item.selectedPackage}</Td>
                  <Td display="flex" justifyContent="space-around">
                    <FaEye
                      title="View"
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedPackageToDelete(item.selectedPackage);
                        onViewModalOpen();
                      }}
                    />
                    <FaEdit
                      title="Edit"
                      className="cursor-pointer"
                      onClick={() => handleOpenEditModal(item)}
                    />
                    <FaTrash
                      title="Delete"
                      className="cursor-pointer"
                      onClick={() => handleOpenDeleteModal(item.selectedPackage)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text fontSize="lg" textAlign="center" color="gray.500">
            No favorite packages yet. Click "Add Favorite" to get started!
          </Text>
        )}
      </Box>

      {/* View Modal */}
      <Modal isOpen={isViewModalOpen} onClose={onViewModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Package Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold">Package Name:</Text>
            <Text mb={4}>{selectedPackageToDelete}</Text>
            <Text fontWeight="bold">Reason:</Text>
            <Text>{storedData.find(item => item.selectedPackage === selectedPackageToDelete)?.textValue}</Text>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Package</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              value={editedTextValue}
              onChange={(e) => setEditedTextValue(e.target.value)}
              placeholder="Why do you like this package?"
              size="sm"
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onEditModalClose}>
              Cancel
            </Button>
            <Button colorScheme="teal" onClick={handleEditPackage}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={onDeleteModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this package?
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onDeleteModalClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDeletePackage}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Favorite;
