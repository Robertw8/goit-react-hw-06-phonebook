import React from "react";
import {
  UpdateFormWrapper,
  StyledUpdateForm,
  StyledFormItem,
  StyledInput,
  StyledSubmitButton,
  CloseButton,
} from "./UpdateForm.styled";
import { CloseOutlined } from "@ant-design/icons";
import { Toaster } from "react-hot-toast";

import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import { useContacts } from "../../hooks/useContacts";
import { successToast, errorToast } from "../../utils/toast";

export const UpdateForm = ({ contactId, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { contacts, isLoading } = useContacts();

  const handleSubmit = async ({ newName, newNumber }) => {
    try {
      const isDuplicate = contacts.find(
        contact =>
          contact.name.toLowerCase() === newName.toLowerCase() ||
          contact.number === newNumber
      );

      if (isDuplicate) {
        errorToast("This contact already exists");
        return;
      }

      await dispatch(
        updateContact({ contactId, name: newName, number: newNumber })
      );

      successToast("Contact updated!");
    } catch (error) {
      errorToast(
        "Field 'name' must only include letters and field 'phone' only numbers"
      );
    }
  };

  return (
    <>
      <UpdateFormWrapper isOpen={isOpen}>
        <CloseButton htmlType="button" type="text" onClick={onClose}>
          <CloseOutlined />
        </CloseButton>
        <StyledUpdateForm onFinish={handleSubmit}>
          <StyledFormItem name="newName">
            <StyledInput
              placeholder="Enter new name..."
              autoComplete="password"
            />
          </StyledFormItem>
          <StyledFormItem name="newNumber">
            <StyledInput
              placeholder="Enter new phone number..."
              autoComplete="password"
            />
          </StyledFormItem>
          <StyledSubmitButton htmlType="submit" loading={isLoading}>
            Update
          </StyledSubmitButton>
        </StyledUpdateForm>
      </UpdateFormWrapper>
      <Toaster />
    </>
  );
};
