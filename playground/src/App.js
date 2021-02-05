import React, { useState, useCallback } from 'react';
import './App.css';
import InputSpinner from './component-lib'
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [value1, setValue1] = useState(1);
  const [value2, setValue2] = useState(3);
  const [value3, setValue3] = useState(5);
  const setValue1Callback = useCallback(value => setValue1(value), [setValue1]);
  const setValue2Callback = useCallback(value => setValue2(value), [setValue2]);
  const setValue3Callback = useCallback(value => setValue3(value), [setValue3]);

  return (
    <div className="App">
      <Container className="mt-2">
        <Row>
          <Col>
            <InputSpinner
              type={'real'}
              precision={2}
              max={1.2}
              min={0}
              step={0.01}
              value={value1}
              onChange={setValue1Callback}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            Min: 0 - Max: 1.2 - Step 0.01 - precision: 2 - type: real
          </Col>
          <Col>
            Valor: {value1}
          </Col>
        </Row>
        <Row>
          <Col>
            <InputSpinner
              type={'int'}
              variant={'dark'}
              max={10}
              min={0}
              step={1}
              value={value2}
              size="sm"
              onChange={setValue2Callback}
            />
          </Col>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            Min: 0 - Max: 10 - Step 1 - type: int
          </Col>
          <Col>
            Valor: {value2}
          </Col>
        </Row>
        <Row>
          <Col>
            <InputSpinner
              type={'int'}
              variant={'secondary'}
              step={2}
              value={value3}
              size="lg"
              onChange={setValue3Callback}
            />
          </Col>
          <Col>
          </Col>
        </Row>
        <Row>
          <Col>
            Min:  - Max:  - Step 2 - type: int
          </Col>
          <Col>
            Valor: {value3}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
