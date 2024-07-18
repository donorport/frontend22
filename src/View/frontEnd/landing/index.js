import { Button, Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import DefaultLayout from '../Component/templates/default-layout';
import './style.scss';
import Page from '../../../components/Page';
import hero from '../../../assets/images/hero.svg';
import heroasset from '../../../assets/images/bg.svg';
import Header from '../Component/organisms/header';

const Landing = () => {
  const heroStyle = {
    width: '100%',
    height: '100vh', // Adjust height as needed
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'fixed'
  };
  return (
    <Page
      title="Donorport | Landing"
      description="Share the Donorport brand with your customers, clients and community"
    >
      <div className="d-flex flex-column" style={heroStyle}>
        <Header />
        <Container fluid className="d-flex p-0" style={{ backgroundColor: '', height: '1100px' }}>
          <div
            className="ps-5 pb-5 d-flex flex-column justify-content-center align-items-start"
            style={{ width: '54%' }}
          >
            <div style={{width: '450px'}}>            <h1 className="lh-1">Donate what you want!</h1>
            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium
              voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint
              occaecati cupiditate non provident,.
            </p>
            <Button className="btn btn-lg">Donate Now</Button></div>

          </div>
          <div className="d-flex flex-1 align-items-center justify-content-center">
            {' '}
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: '#5e5cde',
                borderRadius: '24px',
                height: '400px',
                width: '500px'
              }}
            >
              <img alt="" src={heroasset} className="p-5" style={{ width: '675px' }}></img>
            </div>
          </div>
        </Container>
        <Container
          className="bg-white"
          style={{ height: '900px', background: 'white', borderRadius: '24px' }}
        ></Container>
      </div>
      <Container
        fluid
        className="d-flex p-0"
        style={{ height: '100vh', overflow: 'hidden', background: 'white' }}
      ></Container>
    </Page>
  );
};

export default Landing;
