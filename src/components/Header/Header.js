import React, { useContext } from 'react';
import { Navbar, Nav, Form } from 'react-bootstrap';
import logo from '../../images/game.png';
import './Header.css';
import man from '../../images/man.png';
import { useHistory } from 'react-router';
import { UserContext } from '../../App';
//Badge
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge);

const Header = () => {
    const history = useHistory()
    const [authentication, setAuthentication, cartItems, setCartItems] = useContext(UserContext);
    return (
        <div className="custom-nav">
            <Navbar bg="dark" variant="dark">
                <img src={logo} alt="" />
                <Navbar.Brand>PLAYMART</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link onClick={() => { history.push('/home') }}>Home</Nav.Link>
                    <Nav.Link onClick={() => { history.push('/orders') }}>Orders</Nav.Link>
                    <Nav.Link onClick={() => { history.push('/admin') }}>Admin</Nav.Link>
                    <Nav.Link onClick={() => { history.push('/deals') }}>Deals</Nav.Link>
                </Nav>

                {/* Badge */}
                <div className="mr-3">
                    <IconButton onClick={() => history.push('/cart')} aria-label="cart">
                        <StyledBadge badgeContent={cartItems.length} color="secondary">
                            <ShoppingCartIcon style={{ color: 'white', fontSize: '28px' }} />
                        </StyledBadge>
                    </IconButton>
                </div>

                {/* Login/User */}
                <Form inline>
                    {
                        authentication.loggedIn
                            ? <Nav className="login-div mr-auto">
                                <div className="avatar-background-loggedIN"><img src={authentication.photoUrl} alt="" /></div>
                                <Nav.Link onClick={() => { history.push('/profile') }}>{authentication.displayName}</Nav.Link>
                            </Nav>

                            : <Nav className="login-div mr-auto">
                                <div className="avatar-background"><img src={man} alt="" /></div>
                                <Nav.Link onClick={() => { history.push('/login') }}>Login</Nav.Link>
                            </Nav>
                    }
                </Form>
            </Navbar>
        </div>
    );
};

export default Header;