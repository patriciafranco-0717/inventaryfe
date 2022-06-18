import React, {useState, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {Container, Row, Col, Form, Button, Table} from 'react-bootstrap';
import axios from 'axios';

export default function TypeOfDevice() {
  const [inventaries, setInventaries] = useState([]);
  const [users, setUsers] = useState([]);
  const [brands, setBrands] = useState([]);
  const [statusOfDevices, setStatusOfDevices] = useState([]);
  const [typeOfDevices, setTypeOfDevices] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/get/inventaries')
      .then(function (response) {
        setInventaries(response.data);
      });
    axios.get('http://localhost:4000/get/users').then(function (response) {
      setUsers(response.data);
    });
    axios.get('http://localhost:4000/get/brands').then(function (response) {
      setBrands(response.data);
    });
    axios
      .get('http://localhost:4000/get/status-of-devices')
      .then(function (response) {
        setStatusOfDevices(response.data);
      });
    axios
      .get('http://localhost:4000/get/type-of-devices')
      .then(function (response) {
        setTypeOfDevices(response.data);
      });
  }, []);

  const {register, handleSubmit} = useForm();
  const onSubmit = data => {
    axios
      .post('http://localhost:4000/create/inventary', data)
      .then(function (response) {
        setInventaries([...inventaries, ...response.data]);
      });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md="6">
          <h3 className="mb-4">Modulo para gestion de equipos</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Serial</Form.Label>
              <Form.Control
                placeholder="Ingrese el serial"
                {...register('serial', {required: true, maxLength: 80})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Modelo</Form.Label>
              <Form.Control
                placeholder="Ingrese el modelo"
                {...register('model', {required: true, maxLength: 80})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                placeholder="Ingrese la descripción"
                {...register('description', {required: true, maxLength: 200})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Url</Form.Label>
              <Form.Control
                placeholder="Ingrese la url de la imagen"
                {...register('urlDevice', {required: true, maxLength: 80})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Color</Form.Label>
              <Form.Control
                placeholder="Ingrese la url de la imagen"
                {...register('color', {required: true, maxLength: 80})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Fecha compra</Form.Label>
              <Form.Control
                placeholder="Fecha compra"
                type="date"
                {...register('purchaseDate', {required: true, maxLength: 80})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                placeholder="Precio"
                {...register('price', {required: true, maxLength: 80})}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Usuario a cargo</Form.Label>
              <Form.Select {...register('user')}>
                {users.map((user, index) => {
                  return (
                    user.status && (
                      <option value={user.name} key={index}>
                        {user.name}
                      </option>
                    )
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Marca</Form.Label>
              <Form.Select {...register('brand')}>
                {brands.map((brand, index) => {
                  return (
                    brand.status && (
                      <option value={brand.name} key={index}>
                        {brand.name}
                      </option>
                    )
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Estado del equipo</Form.Label>
              <Form.Select {...register('statusOfDevice')}>
                {statusOfDevices.map((statusOfDevice, index) => {
                  return (
                    statusOfDevice.status && (
                      <option value={statusOfDevice.name} key={index}>
                        {statusOfDevice.name}
                      </option>
                    )
                  );
                })}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Tipo de equipo</Form.Label>
              <Form.Select {...register('typeOfDevice')}>
                {typeOfDevices.map((typeOfDevice, index) => {
                  return (
                    typeOfDevice.status && (
                      <option value={typeOfDevice.name} key={index}>
                        {typeOfDevice.name}
                      </option>
                    )
                  );
                })}
              </Form.Select>
            </Form.Group>
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
              <th>Serial</th>
              <th>Modelo</th>
              <th>Descripción</th>
              <th>Url</th>
              <th>Color</th>
              <th>Fecha compra</th>
              <th>Precio</th>
              <th>Usuario</th>
              <th>Marca</th>
              <th>Estado equipo</th>
              <th>Tipo equipo</th>
            </tr>
          </thead>
          <tbody>
            {inventaries.map((inventaries, index) => {
              return (
                <tr key={index}>
                  <td>{inventaries.serial}</td>
                  <td>{inventaries.model}</td>
                  <td>{inventaries.description}</td>
                  <td>{inventaries.urlDevice}</td>
                  <td>{inventaries.color}</td>
                  <td>{inventaries.purchaseDate}</td>
                  <td>{inventaries.price}</td>
                  <td>{inventaries.user}</td>
                  <td>{inventaries.brand}</td>
                  <td>{inventaries.statusOfDevice}</td>
                  <td>{inventaries.typeOfDevice}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
