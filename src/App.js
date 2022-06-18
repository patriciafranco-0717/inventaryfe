import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {Navbar, Container, Nav} from 'react-bootstrap';
import TypeOfDevice from './pages/typeOfDevice';
import StatusOfDevice from './pages/statusOfDevice';
import Users from './pages/users';
import Brands from './pages/brands';
import Inventary from './pages/inventary'

function App() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/inventario">
            Modulos de inventario
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/tipo-equipo">
              Tipo de equipo
            </Nav.Link>
            <Nav.Link as={Link} to="/estado-equipo">
              Estado de equipo
            </Nav.Link>
            <Nav.Link as={Link} to="/usuarios">
              Usuarios
            </Nav.Link>
            <Nav.Link as={Link} to="/marcas">
              Marcas
            </Nav.Link>
            <Nav.Link as={Link} to="/inventario">
              Inventario
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route exact path="/tipo-equipo" element={<TypeOfDevice />} />
        <Route exact path="/estado-equipo" element={<StatusOfDevice />} />
        <Route exact path="/usuarios" element={<Users />} />
        <Route exact path="/marcas" element={<Brands />} />
        <Route exact path="/inventario" element={<Inventary />} />
      </Routes>
    </Router>
  );
}

export default App;
