import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import styles  from './productos-form.module.css';  


const ProductosForm = () => {
    return (
        <Container className={styles.container} >
            <Row className="d-flex justify-content-center mt-5">
                <Col xs={6} style={{marginTop:"20px"}} >
                    <h2>Formulario productos crud</h2>
                    <div class="mt-5">
                        <Form style={{width:"100%"}}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nombre: * </Form.Label>
                                <Form.Control type="text" placeholder="Producto" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Stock: * </Form.Label>
                                <Form.Control type="text" placeholder="Codigo" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Precio: * </Form.Label>
                                <Form.Control type="text" placeholder="Precio" />
                            </Form.Group>
                            <Form.Group controlId="exampleForm.SelectCustom">
                                <Form.Label>Categoria: *</Form.Label>
                                <Form.Control as="select" custom>
                                    <option>Seleccione una opción</option>
                                    <option>Categoria1</option>
                                    <option>Categoria1</option>
                                    <option>Categoria1</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Descripción:</Form.Label>
                                <Form.Control type="text" placeholder="Descripción" />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Imagen:</Form.Label>
                                <Form.Control type="text" placeholder="Descripción" />
                            </Form.Group>
                            <br />
                            <Button variant="success" type="Guardar" style={{marginBottom:"20px"}}>
                                Submit
                        </Button>
                        </Form>
                    </div>
                </Col>
            </Row>

        </Container>
    );
};


export default ProductosForm;