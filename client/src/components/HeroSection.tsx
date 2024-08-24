import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section bg-light text-center py-5">
      <Container>
        <Row>
          <Col>
            <h1 className="display-4">Discover Worlds Within Words on Our Site</h1>
            <p className="lead">Meet our bestsellers by browsing thousands of books from our library.</p>
            <Button variant="primary" size="lg">Get Started</Button>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
