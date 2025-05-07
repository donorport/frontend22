import { useState, useRef, useEffect } from 'react';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'; // Import solid icons
import isSuperAdmin from '../../../../../Api/admin/superAdmin';
import getAllOrganizations from '../../../../../Api/admin/getAllOrganizations';
import switchCharity from '../../../../../Api/admin/switchCharity';
import defaultAvatar from '../../../../../assets/images/avatar.png';
import Avatar from '../../atoms/avatar';
import helper from '../../../../../Common/Helper';
import { Button } from 'react-bootstrap';
import CreateCharityModal from './CreateCharityModal';

const SuperDropdown = ({ placeholder = 'Select organization' }) => {
  const [isSuper, setIsSuper] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const dropdownRef = useRef(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
    setIsOpen(false);
  };

  const handleCreateSuccess = async () => {
    // Refresh organization list
    const updatedOrganizations = await getAllOrganizations();
    setOrganizations(
      updatedOrganizations.map((org) => {
        if (org.image) {
          org.image = helper.CampaignAdminLogoPath + org.image;
        }
        return org;
      })
    );
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
              icon={solid('triangle')}
              className={`super-dropdown__arrow ${isOpen ? '' : 'closed'}`}
            />
          </div>

          {isOpen && (
            <div className="super-dropdown__menu">
              <div className="super-dropdown__create-new">
                <Button variant="primary" size="sm" onClick={() => setShowCreateModal(true)}>
                  <FontAwesomeIcon icon={solid('plus')} className="me-1" />
                  Create New Charity
                </Button>
              </div>
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
                    </div>
                    <span className="super-dropdown__name">{org.name}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}

      {/* Use the CreateCharityModal component */}
      <CreateCharityModal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
};

export default SuperDropdown;
