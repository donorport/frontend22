import React, { useState, useRef } from 'react';
import { Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import RadioToggle from '../../atoms/radio-toggle';
import GrabItem from '../../molecules/grab-item';
import boxAnimationData from '../../../../../assets/lottie/box.json';
import shuffleAnimationData from '../../../../../assets/lottie/shuffle.json';
// import lottie from 'lottie-web/build/player/lottie_light';
import Lottie from 'lottie-web';

import { ReactComponent as EmptyIcon } from '../../../../../assets/svg/crane.svg';

import './style.scss';

// class GrabDropdown extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       locked: false,
//       empty: false,
//     };
//   }

//   onGrabToggle = (state) => {
//     this.setState({ locked: state });
//   };

//   render() {
//     const ToggleButton = React.forwardRef(({ children, onClick }, ref) => {
//       return (
//         <Button
//           ref={ref}
//           variant="outline-info"
//           onClick={(e) => {
//             e.preventDefault();
//             onClick(e);
//           }}
//           size="lg"
//           className="ms-2 fw-bold"
//         >
//           {children}
//         </Button>
//       );
//     });
//     return (
//       <>
//         <Dropdown className="d-flex" onToggle={this.onGrabToggle}>
//           <Dropdown.Toggle as={ToggleButton}>
//             Pets Play
//             {this.state.locked ? (
//               <FontAwesomeIcon icon={regular("box-open")} className="ms-1" />
//             ) : (
//               <FontAwesomeIcon icon={regular("box")} className="ms-1" />
//             )}
//           </Dropdown.Toggle>

//           <Dropdown.Menu
//             show
//             className="grab__dropdown dropdown-top-arrow w-350"
//           >
//             <div className="dropdown__inner pb-12p positin-relative">
//               <div className=" border-bottom">
//                 <div className="grab_dropdown-top d-flex align-items-center pt-12p pb-12p pl-12p pr-12p">
//                   <InputGroup className="input-group__alpha w-150">
//                     <FormControl placeholder="$0" className=" pl-12p" />
//                     <Button variant="link">
//                       <FontAwesomeIcon icon={solid("magnifying-glass")} />
//                     </Button>
//                   </InputGroup>

//                   <div className="ms-auto d-flex align-items-center">
//                     <Button
//                       variant="link"
//                       className="p-0 text-decoration-none mx-auto"
//                     >
//                       <FontAwesomeIcon
//                         icon={solid("circle-info")}
//                         className="text-light"
//                       />
//                     </Button>
//                   </div>
//                 </div>
//                 <div className="py-1 d-flex justify-content-between pl-12p pr-12p">
//                   <RadioToggle color="#6567c5" disabled>
//                     $ 25
//                   </RadioToggle>
//                   <RadioToggle color="rgb(49,231,182)">$ 50</RadioToggle>
//                   <RadioToggle color="rgb(222,138,196)">$ 75</RadioToggle>
//                   <RadioToggle color="#F9C10B">$ 100</RadioToggle>
//                 </div>
//               </div>
//               {this.state.empty ? (
//                 <div className="empty__grab pt-2 px-4 text-center">
//                   <div className="empty__grab-img mb-1">
//                     <EmptyIcon />
//                   </div>
//                   <div className="empty__grab-content pb-12p">
//                     <div className="fs-4 fw-bolder mb-2">No Items</div>
//                     <div className="fs-7 empty__grab-msg">
//                       There are no items available from the grab bag at the
//                       moment.
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <>
//                   <div className="grab__content">
//                     <GrabItem />
//                   </div>
//                 </>
//               )}
//               <div className="d-grid pt-12p pl-12p pr-12p">
//                 <Button className="mb-12p" size="lg">
//                   <span className="fw-bold fs-6">Add to cart (12)</span>
//                 </Button>
//                 <Button variant="success" size="lg">
//                   <span className="fw-bold fs-6">Checkout: $0</span>
//                 </Button>
//               </div>
//             </div>
//           </Dropdown.Menu>
//         </Dropdown>
//       </>
//     );
//   }
// }

const GrabDropdown = () => {
  const lottie = Lottie
  const [state, setState] = useState({
    locked: false,
    empty: false
  });
  const [hidden, setHidden] = useState(false);
  let shuffle = false;
  const info = false;
  const boxAnim = useRef(null);
  const shuffleAnim = useRef(null);

  const onGrabToggle = (_state) => {
    setState({ ...state, locked: _state });
    const start = _state ? 0 : 100;
    boxAnim.current.playSegments([start, 100 - start], true);
    // TODO: for transition we need to uncomment this line but it breaks filter lottie animation
    // need to fix that
    //setHidden(state);
  };

  const shuffleList = () => {
    const start = shuffle ? 0 : 120;
    shuffleAnim.current.playSegments([start, 120 - start], true);
    shuffle = !shuffle;
  };

  React.useEffect(() => {
    boxAnim.current = lottie.loadAnimation({
      container: document.querySelector('#play__icon'),
      animationData: boxAnimationData,
      loop: false,
      autoplay: false,
      renderer: 'svg'
    });
    boxAnim.current.setSpeed(4);

    shuffleAnim.current = lottie.loadAnimation({
      container: document.querySelector('#shuffle'),
      animationData: shuffleAnimationData,
      loop: false,
      autoplay: false,
      renderer: 'svg'
    });
    shuffleAnim.current.setSpeed(5);
  }, []);

  return (
    <>
      <Dropdown className="d-flex" onToggle={onGrabToggle}>
        <Dropdown.Toggle variant="outline-info" size="lg" className="no-caret ms-2 fw-bold">
          <div className="d-flex align-items-center">
            Pets Play
            <span
              id="play__icon"
              className="box__icon lottie__icon ml-3p d-flex align-items-center fs-2"
              ref={boxAnim}
            />
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu className="grab__dropdown dropdown-top-arrow w-350">
          <div className="dropdown__inner pb-12p positin-relative">
            <div className=" border-bottom">
              <div className="grab_dropdown-top d-flex align-items-center pt-12p pb-12p pl-12p pr-12p">
                <InputGroup className="input-group__alpha w-150">
                  <FormControl placeholder="$0" className=" pl-12p" />
                  <Button variant="link">
                    <FontAwesomeIcon icon={solid('magnifying-glass')} />
                  </Button>
                </InputGroup>

                <div className="ms-auto d-flex align-items-center">
                  <Button variant="link" className="p-0 text-decoration-none mx-auto">
                    <FontAwesomeIcon icon={solid('circle-info')} className="text-light" />
                  </Button>
                </div>
              </div>
              <div className="py-1 d-flex justify-content-between pl-12p pr-12p">
                <RadioToggle color="#6567c5" disabled>
                  $ 25
                </RadioToggle>
                <RadioToggle color="rgb(49,231,182)">$ 50</RadioToggle>
                <RadioToggle color="rgb(222,138,196)">$ 75</RadioToggle>
                <RadioToggle color="#F9C10B">$ 100</RadioToggle>
              </div>
            </div>
            {state.empty ? (
              <div className="empty__grab pt-2 px-4 text-center">
                <div className="empty__grab-img mb-1">
                  <EmptyIcon />
                </div>
                <div className="empty__grab-content pb-12p">
                  <div className="fs-4 fw-bolder mb-2">No Items</div>
                  <div className="fs-7 empty__grab-msg">
                    There are no items available from the grab bag at the moment.
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="grab__content">
                  <GrabItem />
                </div>
              </>
            )}
            <div className="d-grid pt-12p pl-12p pr-12p">
              <Button className="mb-12p" size="lg">
                <span className="fw-bold fs-6">Add to cart (12)</span>
              </Button>
              <Button variant="success" size="lg">
                <span className="fw-bold fs-6">Checkout: $0</span>
              </Button>
            </div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default GrabDropdown;
