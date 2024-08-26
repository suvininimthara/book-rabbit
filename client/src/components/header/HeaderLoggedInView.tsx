import { Button, NavLink } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { User } from "../../models/userModel";
import * as UsersApi from "../../network/users_api";
import './header.css';

interface HeaderLoggedInViewProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const HeaderLoggedInView = ({ user, onLogoutSuccessful }: HeaderLoggedInViewProps) => {

    async function logout() {
        try {
            await UsersApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <>
            <NavLink className="me-2">
            <FaUserCircle className="profile-icon" style={{ height: '1em',width:'1em', marginRight: '10px' }} />
            </NavLink>
            <Button onClick={logout} className="btn-outline-teal">Log out</Button>
        </>
    );
}

export default HeaderLoggedInView;