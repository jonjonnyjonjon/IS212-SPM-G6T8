import UserNavbar from "../../components/UserNavbar"
import {Route, Switch, useRouteMatch, useLocation} from "react-router-dom"
import { Nav } from 'react-bootstrap'
import TrainerHome from './TrainerHome'
import TrainerCreateQuiz from './TrainerCreateQuiz'
import TrainerManageCourse from './TrainerManageCourse'

const TrainerRouting = () => {
    const { path } = useRouteMatch()
    const location = useLocation()

    const NavbarOptions = (
        <Nav className="me-auto"></Nav>
    )

    return (
        <div>
            <UserNavbar options={NavbarOptions}/>
            <Switch>
                <Route exact path={`${path}/:courseID/:classID/`} component={TrainerManageCourse} />
                <Route path={`${path}/:courseID/:classID/chapter:chapterID/quiz`} component={TrainerCreateQuiz} />
            </Switch>
            {location.pathname === "/trainer" ? <TrainerHome /> : null }
        </div>
    )
}

export default TrainerRouting