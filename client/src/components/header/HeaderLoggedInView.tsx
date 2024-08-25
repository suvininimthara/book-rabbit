import { Button, Navbar } from "react-bootstrap";
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
            <Navbar.Text className="me-2">
                Signed in as: {user.username}
            </Navbar.Text>
            <Button onClick={logout} className="btn-outline-teal">Log out</Button>
        </>
    );
}

export default HeaderLoggedInView;