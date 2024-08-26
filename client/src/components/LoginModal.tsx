import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { User } from "../models/userModel";
import { LoginCredentials } from "../network/users_api";
import * as UsersApi from "../network/users_api";
import { Alert, Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import { UnauthorizedError } from "../errors/http_errors";

interface LoginModalProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
  onSignUpClick: () => void; // Added this prop
}

const LoginModal: React.FC<LoginModalProps> = ({ onDismiss, onLoginSuccessful, onSignUpClick }) => {
  const [errorText, setErrorText] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginCredentials>();

  async function onSubmit(credentials: LoginCredentials) {
    try {
      const user = await UsersApi.login(credentials);
      onLoginSuccessful(user);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        setErrorText(error.message);
      } else {
        alert(error);
      }
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss} centered>
      <Modal.Header closeButton>
        <div>
        <p><img src="/logo.png" alt="logo" className="logo" style={{ height: '40px', marginRight: '10px', alignContent:'center' }}/></p>
        <Modal.Title className="ext-center">Login</Modal.Title></div>
      </Modal.Header>
      <Modal.Body>
        {errorText &&
          <Alert variant="danger">
            {errorText}
          </Alert>
        }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            label="Username"
            type="text"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="varient"
          >
            Login
          </Button>
        </Form>
        <div className="text-center mt-3">
          <p>Don't have an account?</p>
            <Button onClick={onSignUpClick}>Sign up</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
