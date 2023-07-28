import { Route, Routes } from 'react-router-dom';
import ProfileController from '../Controller/frontEnd/ProfileController';

export default function UserPrivateRoutes() {
  return (
    <div className="app dk" id="app">
      <div id="content" className="app-content white bg box-shadow-z2" role="main">
        <div className="app-body" id="view">
          <div className="page-content">
            {/* <div className="page-bg" data-stellar-ratio="2" style={{backgroundImage: "url('images/a3.jpg')"}}></div> */}
            <Routes>
              <Route exact path="/app/:username" element={<ProfileController />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
