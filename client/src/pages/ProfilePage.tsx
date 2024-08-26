import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Link, useParams, NavLink } from 'react-router-dom';
import { User } from '../models/userModel';
import * as UsersApi from '../network/users_api';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await UsersApi.getUserById(userId!);
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUser();
  }, [userId]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="profile-page">
      <Card className="profile-header">
        <Card.Body>
          <div className="profile-picture">
            {/* Placeholder for profile picture */}
            <img src="/path-to-default-avatar.png" alt="Profile" />
          </div>
          <h2>{user.username}</h2>
          <NavLink to={`/edit-profile/${user._id}`} className="btn btn-outline-primary">Edit Profile</NavLink>
        </Card.Body>
      </Card>
      <Card className="profile-info">
        <Card.Body>
          <h3>Profile Information</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Favorite Genres:</strong> {user.favoriteGenres.join(', ') || 'None'}</p>
          <p><strong>Rated Books:</strong> {user.ratedBooks.length ? user.ratedBooks.map(ratedBook => (
            <span key={ratedBook.bookId}>{ratedBook.bookId} ({ratedBook.rating}), </span>
          )) : 'None'}</p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProfilePage;
