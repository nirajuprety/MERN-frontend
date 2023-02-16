import Button from 'common/Button';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from 'store/context/UserContext';

function Logout() {
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser({});
        navigate('/login');
    }

    return (
        <Button
            label="Logout"
            type="button"
            color="danger"
            handler={handleLogout}
        />
    );
}

export default Logout