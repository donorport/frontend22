import React from 'react';
import { Button, Container } from 'react-bootstrap';

// import Logo from "@components/atoms/logo";
import Logo from '../../atoms/logo';

import './style.scss';

// class HeaderHelp extends React.Component {
//   render() {
//     return (
//       <header className="main-header">
//         <Container className="d-flex align-items-center" fluid>
//           <Logo />
//           <div className="ps-2 border-start ms-3">
//             <Button variant="link" className="text-dark fs-4 fw-semibold p-0 lh-1">
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
    <header className="main-header">
      <Container className="d-flex align-items-center" fluid>
        <Logo />
        <div className="ps-2 border-start ms-3">
          <Button variant="link" className="text-dark fs-4 fw-semibold p-0 lh-1">
            Help Center
          </Button>
        </div>

        <div className="ms-auto header__right d-none d-sm-flex">
          <Button variant="info" size="lg" className="fw-bold fs-6">
            Submit Request
          </Button>
        </div>
      </Container>
    </header>
  );
};

export default HeaderHelp;
