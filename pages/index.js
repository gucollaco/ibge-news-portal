import React from 'react'
import Head from 'next/head'
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap'
import {
  EulexiaFab,
  ColorChangeAction,
  FontFamilyAction,
  FontSizeAction,
  RulerAction,
  TextToSpeechAction
} from 'react-eulexia'

const Home = ({ news }) => {
  return (
    <>
      <Head>
        <title>Portal de Notícias - IBGE</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Navbar expand='lg' variant='dark' bg='dark'>
        <Container>
          <Navbar.Brand href='#'>Portal de Notícias - IBGE</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ overflow: 'hidden' }}>
        <Row style={{ marginTop: 16, marginBottom: 16 }}>
          {news.map((value, index) => (
            <Col key={index} lg={4} style={{ marginBottom: 16 }}>
              <Card>
                <Card.Img
                  variant='top'
                  src={`https://agenciadenoticias.ibge.gov.br/${
                    JSON.parse(value.imagens).image_intro
                  }`}
                  alt={JSON.parse(value.imagens).image_intro_alt}
                />
                <Card.Body>
                  <Card.Title>{value.titulo}</Card.Title>
                  <Card.Text>{value.introducao}</Card.Text>
                  <Card.Link target='_blank' href={value.link}>
                    Visitar notícia completa no site do IBGE
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <EulexiaFab>
        <FontSizeAction />
        <FontFamilyAction />
        <ColorChangeAction />
        <RulerAction />
        <TextToSpeechAction />
      </EulexiaFab>
    </>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch(
    'http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=50'
  )
  const data = await res.json()

  return { news: data.items }
}

export default Home
