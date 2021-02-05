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
        <div className="mb-4">
          <h4>
            React Bootstrap Input Spinner
          </h4>
        </div>
        <Row className="mb-3">
          <Col sm={{span: 4, offset: 4}}>
            <InputSpinner
              type={'real'}
              size="sm"
              precision={2}
              max={1.2}
              min={0}
              step={0.01}
              value={value1}
              onChange={setValue1Callback}
            />
          </Col>
        </Row>
        
        <Row className="mb-3">
          <Col sm={{span: 4, offset: 4}}>
            <InputSpinner
              type={'int'}
              variant={'dark'}
              max={10}
              min={0}
              step={1}
              value={value2}
              onChange={setValue2Callback}
            />
          </Col>
        </Row>
        
        <Row className="mb-5">
          <Col sm={{span: 4, offset: 4}}>
            <InputSpinner
              type={'int'}
              variant={'secondary'}
              step={2}
              value={value3}
              size="lg"
              arrows
              onChange={setValue3Callback}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            Min: 0 - Max: 1.2 - Step 0.01 - precision: 2 - type: real
          </Col>
          <Col>
            Valor 1: {value1}
          </Col>
        </Row>
        <Row>
          <Col>
            Min: 0 - Max: 10 - Step 1 - type: int
          </Col>
          <Col>
            Valor 2: {value2}
          </Col>
        </Row>
        <Row>
          <Col>
            Min:  - Max:  - Step 2 - type: int
          </Col>
          <Col>
            Valor 3: {value3}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
