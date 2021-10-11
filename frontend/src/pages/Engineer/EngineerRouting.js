import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from 'react-bootstrap'

import { Link, Route, Switch, useRouteMatch, useLocation } from "react-router-dom"
import UserNavbar from "../../components/UserNavbar"

import EngineerHome from './EngineerHome'
import EngineerBrowseCourse from "./EngineerBrowseCourse"

const EngineerRouting = () => {
    const { url, path } = useRouteMatch()
    const location = useLocation()

    const NavbarOptions = (
        <Nav className="me-auto">
            <Nav.Link as={Link} to={`${url}/engineer/home`}>
                My Courses
            </Nav.Link>
            <Nav.Link as={Link} to={`${url}/browseCourses`}>
                Browse Courses
            </Nav.Link>

        </Nav>
    )

    return (
        <div>
            <UserNavbar options={NavbarOptions}/>

            <Switch>
                <Route path={`${path}/engineer/home`}>
                    <EngineerHome />
                </Route>
                <Route path={`${path}/browseCourses`}>
                    <EngineerBrowseCourse />
                </Route>
            </Switch>

            {location.pathname === "/engineer" ? <EngineerHome /> : null }
        </div>
    )
}

export default EngineerRouting