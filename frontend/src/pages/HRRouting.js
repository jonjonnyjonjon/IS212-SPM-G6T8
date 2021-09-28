import 'bootstrap/dist/css/bootstrap.min.css'
import UserNavbar from "../components/UserNavbar"
import { Link, Route, Switch, useRouteMatch, useLocation } from "react-router-dom"
import { Nav } from 'react-bootstrap'
import HRHome from "./HRHome"
import HRCourses from './HRCourses'
import HRCreateCourse from './HRCreateCourse'

// This is the homepage for HR.
// For any subsequent pages you are creating, create them in pages folder (e.g. HRCourses.js, HRPendingEnrolment.js)
// Take note of naming convention, it is camel case, but the first word's first letter is also capitalized, i.e. MyName, not myName

// Any components that you may think is reuseable, create them inside the components folder.
// For import routes, make sure to state your current folder i.e. "./xxx/xxx" instead of "/xxx/xxx".


const HRRouting = () => {
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
                <Route exact path={`${path}/courses`} component={HRCourses} />
                <Route path={`${path}/courses/createCourse`} component={HRCreateCourse} />

                <Route path={`${path}/engineers`}>
                    <h1>Engineers page</h1>
                </Route>
            </Switch>

            {location.pathname === "/hr" ? <HRHome /> : null }
        </div>
    )
}

export default HRRouting