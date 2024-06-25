import { Button, Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import './style.scss';
import DefaultLayout from '../Component/templates/default-layout';
import './style.scss';
import Page from '../../../components/Page';
import hero from '../../../assets/images/herobg.png';
import heroasset from '../../../assets/images/herobgasset.png';

const Landing = () => {
  const heroStyle = {
    width: '100%',
    height: '100vh', // Adjust height as needed
    backgroundImage: `url(${hero})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  };
  return (
    <Page
      title="Donorport | Landing"
      description="Share the Donorport brand with your customers, clients and community"
    >
      <DefaultLayout>
        <div className="d-flex flex-column" style={heroStyle}>
          <Container fluid className="d-flex p-0" style={{ backgroundColor: '' }}>
            <img src={heroasset} style={{width: '900px'}}></img>
          </Container>
        </div>
        <Container
          fluid
          className="d-flex p-0"
          style={{ height: '100vh', overflow: 'hidden' }}
        ></Container>
      </DefaultLayout>
    </Page>
  );
};

export default Landing;
