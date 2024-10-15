import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Box,
} from '@chakra-ui/react';

const ConfirmationModal = ({ isOpen, onClose, submittedData, onConfirm }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>登録確認</ModalHeader>
        <ModalBody>
          <Box textAlign="left">
            <Box mb={4}>氏名: {submittedData.fullName}</Box>
            <Box mb={4}>性別: {submittedData.gender}</Box>
            <Box mb={4}>年齢: {submittedData.age}</Box>
            <Box mb={4}>出身: {submittedData.prefecture}</Box>
            <Box mb={4}>自己PR: {submittedData.selfIntro}</Box>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" onClick={onClose} marginRight={4}>
            キャンセル
          </Button>
          <Button colorScheme="green" onClick={onConfirm}>
            登録
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
