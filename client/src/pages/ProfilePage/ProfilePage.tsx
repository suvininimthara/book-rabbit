import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Image } from 'react-bootstrap';
import { User } from '../../models/userModel';
import * as UsersApi from '../../network/users_api';
import ProfileModal from '../../components/ProfileModal'; // Adjust the import path as needed
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await UsersApi.getUserProfile();
                console.log('User profile:', response);
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
        <Container className="profile-container">
            {user && (
              <>
                <Card className="profile-card">
                <Card.Body>
                    <Card.Title className="profile-card-title text-center d-block mt-3">User Profile</Card.Title>
                    <Card.Text>
     
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Name</Form.Label>
                                        
                                            <Form.Control 
                                                type="text" 
                                                value={`${user.firstName || ''} ${user.lastName || ''}`} 
                                                readOnly
                                            />
           
                                    </Form.Group>
                                    
                                    <Form.Group  className="mt-3">
                                        <Form.Label >Phone number</Form.Label>
                                           <Form.Control 
                                                type="text" 
                                                value={user.phoneNumber || ''} 
                                                readOnly
                                            />
                                 
                                    </Form.Group>
                                    <Form.Group  className="mt-3">
                                        <Form.Label >Birth Day</Form.Label>
                                       
                                            <Form.Control 
                                                type="text" 
                                                value={user.birthday || ''} 
                                                readOnly
                                            />
                                       
                                    </Form.Group>
                                    <Form.Group  className="mt-3">
                                        <Form.Label >Personal address</Form.Label>
                                        
                                            <Form.Control 
                                                type="text" 
                                                value={user.address || ''} 
                                                readOnly
                                            />
                                       
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label column xs={12}>Favorite book</Form.Label>
                                             <Form.Control 
                                                type="text" 
                                                value={user.favoriteBook || ''} 
                                                readOnly
                                            />
                                     
                                    </Form.Group>
                                    <Form.Group className="mt-3">
                                        <Form.Label >Favorite genres</Form.Label>
                                       
                                            <Form.Control 
                                                type="text" 
                                                value={(user.favoriteGenres || []).join(', ')} 
                                                readOnly
                                            />
                                       
                                    </Form.Group>      
                            </Form>
                        
                   
                            </Card.Text>
                            
                            <Button onClick={handleShowModal} variant="outline-primary">Edit Profile</Button>
                            <Button variant="outline-success" style={{ marginLeft: '10px' }}>Wishlist</Button>
                        
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
