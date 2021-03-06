import { Nav } from 'react-bootstrap'

import { Link, Route, Switch, useRouteMatch, useLocation, withRouter } from "react-router-dom"
import UserNavbar from "../../components/UserNavbar"
import EngineerTakeQuiz from './EngineerTakeQuiz'
import EngineerHome from './EngineerHome'
import EngineerBrowseCourse from "./EngineerBrowseCourse"
import EngineerViewCourse from "./EngineerViewCourse"
import EngineerTakeClass from "./EngineerTakeClass"

const EngineerRouting = () => {
    const { url, path } = useRouteMatch()
    const location = useLocation()

    const NavbarOptions = (
        <Nav className="me-auto">
            <Nav.Link as={Link} to={`${url}/home`}>
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
                <Route path={`${path}/home`} component={EngineerHome} />
                <Route exact path={`${path}/browseCourses`} component={EngineerBrowseCourse} />
                <Route exact path={`${path}/browseCourses/viewCourse/:courseID/:classID`} component={withRouter(EngineerViewCourse)} />
                <Route exact path={`${path}/course/:courseID/:classID/chapter:chapterID/quiz`} component={EngineerTakeQuiz} />
                <Route exact path={`${path}/course/:courseID/:classID`} component={EngineerTakeClass} />
            </Switch>

            {location.pathname === "/engineer" ? <EngineerHome /> : null }
        </div>
    )
}

export default EngineerRouting