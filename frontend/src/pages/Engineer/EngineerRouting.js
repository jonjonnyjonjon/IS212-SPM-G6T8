import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from 'react-bootstrap'

import { Link, Route, Switch, useRouteMatch, useLocation } from "react-router-dom"
import UserNavbar from "../../components/UserNavbar"

import EngineerHome from './EngineerHome'

const EngineerRouting = () => {
    const { url, path } = useRouteMatch()
    const location = useLocation()

    const NavbarOptions = (
        <Nav className="me-auto">
            <Nav.Link as={Link} to={`${url}/courses`}>
                Courses
            </Nav.Link>

            <Nav.Link as={Link} to={`${url}/engineers`}>
                Engineers
            </Nav.Link>
        </Nav>
    )

    return (
        <div>
            <UserNavbar options={NavbarOptions}/>

            <Switch>
                <Route path={`${path}/engineers`}>
                    <h1>Engineers page</h1>
                </Route>
            </Switch>

            {location.pathname === "/engineer" ? <EngineerHome /> : null }
        </div>
    )
}

export default EngineerRouting