import { 
    Navbar,
    Container
} from "react-bootstrap"

import { FaHome } from "react-icons/fa"

function UserNavbar(props) {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand><FaHome/> All-in-one </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                {props.options}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default UserNavbar