import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav } from 'react-bootstrap'

import { Link, Route, Switch, useRouteMatch, useLocation } from "react-router-dom"
import UserNavbar from "../../components/UserNavbar"
import HRHome from "./HRHome"

import HRCourses from "./HRCourses"
import HRCreateCourse from "./HRCreateCourse"
import HREditCourse from "./HREditCourse"

import HRClasses from "./HRClasses"
import HRCreateClass from "./HRCreateClass"
import HREditClass from "./HREditClass"

import HREnrol from './HREnrol'
import HREnrolClasses from './HREnrolClasses'


const HRRouting = () => {
    const { url, path } = useRouteMatch()
    const location = useLocation()

    const NavbarOptions = (
        <Nav className="me-auto">
            <Nav.Link as={Link} to={`${url}/courses`}>
                Manage Courses
            </Nav.Link>

            <Nav.Link as={Link} to={`${url}/enrolment`}>
                Enrol Engineers
            </Nav.Link>
        </Nav>
    )

    return (
        <div>
            <UserNavbar options={NavbarOptions}/>

            <Switch>
                <Route exact path={`${path}/courses/:courseID/:courseName/edit/:classID`} component={HREditClass} />
                <Route exact path={`${path}/courses/:courseID/:courseName/create`} component={HRCreateClass} />

                <Route path={`${path}/courses/:courseID/:courseName`} component={HRClasses} />
                <Route path={`${path}/courses/create`} component={HRCreateCourse} />
                <Route exact path={`${path}/courses`} component={HRCourses} />

                <Route path={`${path}/courses/editCourse/:courseID`} component={HREditCourse} />

                <Route path={`${path}/enrolment/:courseID/:courseName/:hasPrereq`} component={HREnrolClasses}/>
                <Route path={`${path}/enrolment`} component={HREnrol}/>

            </Switch>

            {location.pathname === "/hr" ? <HRHome /> : null }
        </div>
    )
}

export default HRRouting