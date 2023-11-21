import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { NavBar } from './partials/nav';

export const AppLayout = (props) => {

  return (
    <div>
      <NavBar />

      <Container>
        <Row>
          <Col>
            {props.children}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
