import React from 'react'
import Head from 'next/head'
import { Navbar, Container, Row, Col, Card } from 'react-bootstrap'

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
        {news.map((value, index) => {
          return (
            <Row key={index} style={{ marginTop: 10, marginBottom: 10 }}>
              <Col>
                <Card>
                  <Row noGutters>
                    <Col lg={5} className='d-none d-lg-block'>
                      <img
                        src={`https://agenciadenoticias.ibge.gov.br/${
                          JSON.parse(value.imagens).image_intro
                        }`}
                        alt={JSON.parse(value.imagens).image_intro_alt}
                        style={{ width: '428px' }}
                      />
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={7}>
                      <Card.Body>
                        <Card.Title>{value.titulo}</Card.Title>
                        <Card.Text>{value.introducao}</Card.Text>
                        <Card.Link target='_blank' href={value.link}>
                          Visitar notícia completa no site do IBGE
                        </Card.Link>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          )
        })}
        {/* </Row> */}
      </Container>
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
