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
import SomeNews from '../public/some-news'

const Home = ({ news, apiOff }) => {
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
          {!apiOff &&
            news.map((value, index) => (
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
          {apiOff &&
            news.map((value, index) => (
              <Col key={index} lg={4} style={{ marginBottom: 16 }}>
                <Card>
                  <Card.Body>
                    <Card.Title>{value.title}</Card.Title>
                    <Card.Text>{value.introtext}</Card.Text>
                    <Card.Link
                      target='_blank'
                      href={`https://www.ibge.gov.br/noticia.html?id=${value.id}`}
                    >
                      Visitar notícia completa no site do IBGE
                    </Card.Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
      <EulexiaFab>
        <FontSizeAction
          headerLabel='Títulos'
          textLabel='Textos'
          tooltipTitle='Tamanho de fonte'
        />
        <FontFamilyAction dropdownPlaceholder='Fonte...' tooltipTitle='Fonte' />
        <ColorChangeAction
          backgroundLabel='Fundo'
          textLabel='Texto'
          tooltipTitle='Mudar cor'
        />
        <RulerAction
          invertedModeLabel='Modo invertido'
          sizeLabel='Tamanho'
          tooltipTitle='Régua de leitura'
        />
        <TextToSpeechAction
          readSelectedLabel='Ler texto selecionado'
          tooltipTitle='Texto para voz'
          unsupportedBrowserLabel='Navegador não suportado'
        />
      </EulexiaFab>
    </>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch(
    'http://servicodados.ibge.gov.br/api/v3/noticias/?qtd=50'
  )

  if (res.status !== undefined && res.status > 200) {
    return { news: SomeNews.conteudo, apiOff: true }
  }

  const data = await res.json()
  return { news: data.items, apiOff: false }
}

export default Home
