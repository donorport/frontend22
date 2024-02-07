import React from 'react';
import { Container, Button } from 'react-bootstrap';

// import Logo from "@components/atoms/logo";
import Logo from '../../atoms/logo';
import Toggle from '../toggle';
import './style.scss';
import HeaderController from '../../../../../Controller/frontEnd/HeaderController';
// class HeaderHelp extends React.Component {
//   render() {
//     return (
//       <header className="main-header">
//         <Container className="d-flex align-items-center" fluid>
//           <Logo />
//           <div className="ps-2 border-start ms-3">
//             <Button variant="link" className=" fs-4 fw-semibold p-0 lh-1">
//               Help Center
//             </Button>
//           </div>

//           <div className="ms-auto header__right d-none d-sm-flex">
//             <Button variant="info" size="lg" className="fw-bold fs-6">
//               Submit Request
//             </Button>
//           </div>
//         </Container>
//       </header>
//     );
//   }
// }

const HeaderHelp = () => {
  return (
    <header className="main-header d-flex align-items-center">
      <Container className="d-flex align-items-center" fluid>
        <div className="d-flex gap-1 align-items-center">
        {/* <HeaderController /> */}
          <Logo />
          <div className="ms-2 fs-6 fw-bold p-0 lh-1">Help Center</div>
        </div>
        <div className="ms-auto">
          <Toggle />
        </div>
        {/* <div className="ms-auto header__right d-none d-sm-flex">
          <Button variant="info" size="lg" className="fw-bold fs-6">
            Submit Request
          </Button>
        </div> */}
      </Container>
    </header>
  );
};

export default HeaderHelp;
