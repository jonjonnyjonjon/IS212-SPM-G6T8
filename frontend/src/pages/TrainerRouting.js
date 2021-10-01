import 'bootstrap/dist/css/bootstrap.min.css'
import UserNavbar from "../components/UserNavbar"
import { Link, Route, Switch, useRouteMatch, useLocation } from "react-router-dom"
import { Nav } from 'react-bootstrap'
import TrainerHome from "./TrainerHome"

const TrainerRouting = () => {
    const { url, path } = useRouteMatch()
    const location = useLocation()

    const NavbarOptions = (
        <Nav className="me-auto">
            {/*  insert navbar links here later  */}
        </Nav>
    )

    return (
        <div>
            <UserNavbar options={NavbarOptions}/>

            <Switch>
                {/* <Route exact path={`${path}/courses`} component={HRCourses} /> */}
                {/* <Route path={`${path}/courses/createCourse`} component={HRCreateCourse} /> */}

                {/* <Route path={`${path}/engineers`}>
                    <h1>Engineers page</h1>
                </Route> */}
            </Switch>

            {location.pathname === "/trainer" ? <TrainerHome /> : null }
        </div>
    )
}

export default TrainerRouting