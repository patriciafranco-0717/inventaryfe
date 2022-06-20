import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Container, Row, Col, Form, Button, Table} from 'react-bootstrap';
import axios from 'axios';

export default function TypeOfDevice() {
  const [typeOfDevices, setTypeOfDevices] = useState([]);

  useEffect(() => {
    axios
      .get('https://inventarybe.herokuapp.com/get/type-of-devices')
      .then(function (response) {
        setTypeOfDevices(response.data);
      });
  }, []);

  const {register, handleSubmit} = useForm();
  const onSubmit = data => {
    axios
      .post('https://inventarybe.herokuapp.com/create/type-of-device', data)
      .then(function (response) {
        setTypeOfDevices([...typeOfDevices, ...response.data]);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <h3 className="mb-4">Modulo para gestion de equipos</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                placeholder="Ingrese el nombre"
                {...register('name', {required: true, maxLength: 80})}
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
              <th>Estado</th>
              <th>Fecha creación</th>
              <th>Fecha actualización</th>
            </tr>
          </thead>
          <tbody>
            {typeOfDevices.map((typeOfDevice, index) => {
              return (
                <tr key={index}>
                  <td>{typeOfDevice.name}</td>
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
