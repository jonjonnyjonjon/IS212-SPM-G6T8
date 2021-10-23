import 'bootstrap/dist/css/bootstrap.min.css'
import UserNavbar from "../../components/UserNavbar"
import { Link, Route, Switch, useRouteMatch, useLocation} from "react-router-dom"
import { Nav } from 'react-bootstrap'
import TrainerViewResult from './TrainerViewResult'
import TrainerHome from './TrainerHome'
import TrainerCreateQuiz from './TrainerCreateQuiz'
import TrainerManageCourse from './TrainerManageCourse'

// This is the homepage for Trainer.
// For any subsequent pages you are creating, create them in pages folder (e.g. HRCourses.js, HRPendingEnrolment.js)
// Take note of naming convention, it is camel case, but the first word's first letter is also capitalized, i.e. MyName, not myName

// Any components that you may think is reuseable, create them inside the components folder.
// For import routes, make sure to state your current folder i.e. "./xxx/xxx" instead of "/xxx/xxx".


const TrainerRouting = () => {
    const { url, path } = useRouteMatch()
    const location = useLocation()

    const NavbarOptions = (
        <Nav className="me-auto">
            {/* 
            <Nav.Link as={Link} to={`${url}/results`}>
                Results
            </Nav.Link> */}
        </Nav>
    )

    return (
        <div>
            <UserNavbar options={NavbarOptions}/>

            <Switch>
                <Route exact path={`${path}/:courseID/:classID/`} component={TrainerManageCourse} />
                <Route exact path={`${path}/:courseID/:classID/results`} component={TrainerViewResult} />
                <Route path={`${path}/quiz`} component={TrainerCreateQuiz} />
            </Switch>

            {location.pathname === "/trainer" ? <TrainerHome /> : null }
        </div>
    )
}

export default TrainerRouting