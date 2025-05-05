import { useState, useRef, useEffect } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isSuperAdmin from '../../../../../Api/admin/superAdmin';
import getAllOrganizations from '../../../../../Api/admin/getAllOrganizations';
import switchCharity from '../../../../../Api/admin/switchCharity';
import defaultAvatar from '../../../../../assets/images/avatar.png';
import Avatar from '../../atoms/avatar';
import helper from '../../../../../Common/Helper';

const SuperDropdown = ({ placeholder = 'Select organization' }) => {
  const [isSuper, setIsSuper] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userRole = await isSuperAdmin();
      setIsSuper(userRole);
    };
    fetchUserRole();
  }, []);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const response = await getAllOrganizations();

      setOrganizations(
        response.map((org) => {
          if (org.image) {
            org.image = helper.CampaignAdminLogoPath + org.image;
          }
          return org;
        })
      );
    };

    fetchOrganizations();
  }, []);

  useEffect(() => {
    console.log('org:', organizations);
  }, [organizations]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOrgSelect = async (org) => {
    setSelectedOrg(org);
    const token = await switchCharity(org._id);
    localStorage.setItem('charityToken', token);
    console.log(token);
    setIsOpen(false);
  };

  return (
    <>
      {isSuper && (
        <div className="super-dropdown" ref={dropdownRef}>
          <div className="super-dropdown__toggle" onClick={toggleDropdown}>
            {selectedOrg ? (
              <div className="super-dropdown__selected">
                <div className="super-dropdown__image-wrap">
                  <img
                    src={selectedOrg.image ? selectedOrg.image : defaultAvatar}
                    alt={selectedOrg.name}
                    className="super-dropdown__image"
                  />
                </div>
                <span className="super-dropdown__name">{selectedOrg.name}</span>
              </div>
            ) : (
              <span className="super-dropdown__placeholder">{placeholder}</span>
            )}
            <FontAwesomeIcon
              icon="fa-solid fa-triangle"
              className={`super-dropdown__arrow ${isOpen ? 'open' : ''}`}
            />
          </div>

          {isOpen && (
            <div className="super-dropdown__menu">
              {organizations.length > 0 &&
                organizations.map((org) => (
                  <div
                    key={org._id}
                    className="super-dropdown__item"
                    onClick={() => handleOrgSelect(org)}
                  >
                    <div className="super-dropdown__image-wrap">
                      <Avatar
                        avatarUrl={org.image}
                        className={org ? 'donor_avatar_bg' : 'charity_avatar_bg'}
                      />
                      {/* <img src={org.image} alt={org.name} className="super-dropdown__image" /> */}
                    </div>
                    <span className="super-dropdown__name">{org.name}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SuperDropdown;
