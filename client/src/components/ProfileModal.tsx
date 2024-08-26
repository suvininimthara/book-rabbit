import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { User } from '../models/userModel';
import * as UsersApi from '../network/users_api';

interface ProfileModalProps {
    user: User;
    show: boolean;
    onHide: () => void;
    onSave: (updatedUser: User) => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, show, onHide, onSave }) => {
    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        birthday: user.birthday || '',
        phoneNumber: user.phoneNumber || '',
        address: user.address || '',
        favoriteBook: user.favoriteBook || '',
        favoriteGenres: user.favoriteGenres?.join(', ') || ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSave = async () => {
        try {
            const updatedUser = {
                ...user,
                ...formData,
                favoriteGenres: formData.favoriteGenres.split(',').map(genre => genre.trim())
            };
            await UsersApi.updateUserProfile(user._id, updatedUser);
            onSave(updatedUser);
            onHide();
        } catch (error) {
            console.error(error);
            alert('Failed to update profile.');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birthday</Form.Label>
                        <Form.Control
                            type="date"
                            name="birthday"
                            value={formData.birthday}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFavoriteBook">
                        <Form.Label>Favorite Book</Form.Label>
                        <Form.Control
                            type="text"
                            name="favoriteBook"
                            value={formData.favoriteBook}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFavoriteGenres">
                        <Form.Label>Favorite Genres</Form.Label>
                        <Form.Control
                            type="text"
                            name="favoriteGenres"
                            value={formData.favoriteGenres}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ProfileModal;
