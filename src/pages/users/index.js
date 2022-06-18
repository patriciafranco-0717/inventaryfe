import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Container, Row, Col, Form, Button, Table} from 'react-bootstrap';
import axios from 'axios';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/get/users').then(function (response) {
      setUsers(response.data);
    });
  }, []);

  const {register, handleSubmit} = useForm();
  const onSubmit = data => {
    axios
      .post('http://localhost:4000/create/user', data)
      .then(function (response) {
        setUsers([...users, ...response.data]);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <h3 className="mb-4">Modulo para gestion de usuarios</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                placeholder="Ingrese el nombre"
                {...register('name', {required: true, maxLength: 80})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                placeholder="Ingrese el email"
                type="email"
                {...register('email', {required: true, maxLength: 80})}
              />
            </Form.Group>
            <Form.Check
              type="radio"
              label="Activo"
              id="activo"
              value="true"
              {...register('status', {required: true})}
            />
            <Form.Check
              type="radio"
              label="Inactivo"
              id="inactivo"
              value="false"
              {...register('status', {required: true})}
            />

            <Button className="mt-3" variant="primary" type="submit">
              Crear
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Fecha creación</th>
              <th>Fecha actualización</th>
            </tr>
          </thead>
          <tbody>
            {users.map((typeOfDevice, index) => {
              return (
                <tr key={index}>
                  <td>{typeOfDevice.name}</td>
                  <td>{typeOfDevice.email}</td>
                  <td>{typeOfDevice.status ? 'Activo' : 'Inactivo'}</td>
                  <td>{typeOfDevice.creationDate}</td>
                  <td>{typeOfDevice.updateDate}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
