import React from 'react';
import './style.scss';
import { Link } from 'react-router-dom';
// import { setUserCountry} from "../../user/user.action"
import { useSelector, useDispatch } from 'react-redux';
import logo from '../../../../../assets/images/logo.svg';

// class Logo extends React.Component {
//   render() {
//     return (
//       <a href="/" className="logo-wrap d-flex align-items-center">
//         <img
//           src=""
//           alt="Donorport Logo Icon"
//           className="logo-icon"
//         />
//         <div className="logo-name ms-1">Donorport</div>
//       </a>
//     );
//   }
// }

const Logo = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Link to="/" className="logo-wrap d-flex align-items-center text-decoration-none position-relative">
        <img
          // src=""
          src={logo}
          alt="Donorport Logo Icon"
          className="logo-icon"
        />
        <div className="logo-name ms-1 text-dark">Donorport</div>&nbsp;
        <span className="logo-span">{user.countrySortName}</span>
      </Link>
    </>
  );
};

export default Logo;
