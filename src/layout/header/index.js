import { Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom"
import Style from "./style";

function Header() {

    return (
        <Style>
            <header className="col-12 mainHeader py-4 border-bottom">
                <Container>
                    <div className="d-flex align-items-center">
                        <Col xs="12" className="d-flex align-items-center justify-content-center">
                            <div className="logo mx-4">
                                <Link to="/"><img src="/logo.png" alt="logo" /></Link>
                            </div>
                            <nav className="navbar-default">
                                <ul className="d-flex justify-content-center">
                                    <li className="mx-1 text-uppercase"><Link className="p-2" to="/">Home</Link></li>
                                    <li className="mx-1 text-uppercase"><Link className="p-2" to="/show-shapes">Show Shapes</Link></li>
                                </ul>
                            </nav>
                        </Col>
                    </div>
                </Container>
            </header>
        </Style>
    )
}
export default Header;