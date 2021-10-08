import { 
    Container,
    ButtonGroup,
    ButtonToolbar,
    Button
} from "react-bootstrap"


function ButtonNavbar() {
    return (
        <ButtonToolbar>
            <Button className="me-3" size="sm" variant="outline-dark">All</Button>
            <Button className="me-3" size="sm" variant="outline-dark">Ongoing</Button>
            <Button className="me-3" size="sm" variant="outline-dark">Pending</Button>
            <Button className="me-3" size="sm" variant="outline-dark">Completed</Button>
        </ButtonToolbar>
    )
}

export default ButtonNavbar