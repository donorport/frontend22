import { Outlet } from 'react-router-dom';
import '../assets/scss/global.scss';

export default function FrontEndLayOut() {
  return (
    <div className="frontend_pages">
      <Outlet />
    </div>
  );
}
