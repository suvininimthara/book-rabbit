import React, { useState, useEffect } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { User } from '../../models/userModel';
import * as UsersApi from '../../network/users_api';
import ProfileModal from '../../components/ProfileModal'; // Adjust the import path as needed

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await UsersApi.getUserProfile();
                setUser(response);
            } catch (error) {
                console.error(error);
                alert('Failed to load user profile.');
            }
        }

        fetchUser();
    }, []);

    const handleEditProfile = (updatedUser: User) => {
        setUser(updatedUser);
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Container>
            {user && (
                <>
                    <Card className="profile-card">
                        <Card.Body>
                            <Card.Title>{user.username}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
                            <Card.Text>
                                <strong>First Name:</strong> {user.firstName}<br />
                                <strong>Last Name:</strong> {user.lastName}<br />
                                <strong>Birthday:</strong> {user.birthday ? new Date(user.birthday).toLocaleDateString() : 'N/A'}<br />
                                <strong>Phone Number:</strong> {user.phoneNumber}<br />
                                <strong>Address:</strong> {user.address}<br />
                                <strong>Favorite Book:</strong> {user.favoriteBook}<br />
                                <strong>Favorite Genres:</strong> {user.favoriteGenres?.join(', ') ?? ''}
                            </Card.Text>
                            <Button onClick={handleShowModal} variant="outline-primary">Edit Profile</Button>
                            <Button variant="outline-success" style={{ marginLeft: '10px' }}>Add to Wishlist</Button>
                        </Card.Body>
                    </Card>
                    <ProfileModal
                        user={user}
                        show={showModal}
                        onHide={handleCloseModal}
                        onSave={handleEditProfile}
                    />
                </>
            )}
        </Container>
    );
};

export default ProfilePage;
