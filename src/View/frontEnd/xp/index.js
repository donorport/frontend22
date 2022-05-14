import { Container } from "react-bootstrap";

import DefaultLayout from "../Component/templates/default-layout";
import AvatarImg from "../../../assets/images/avatar.jpeg";
import Avatar from "../Component/atoms/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import React, { useEffect, useState } from 'react';
import IconButton from "../Component/molecules/icon-button";
import ListItemImg from "../Component/atoms/list-item-img";
import settingApi from "../../../Api/admin/setting"
import FrontLoader from "../../../Common/FrontLoader"

import "./style.scss";

const Xp = () => {
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({
    topDonator: "",
    topDonation: "",
    forEachItem: "",
    forEachDonation: "",
    forEachShare: "",
    forEachOrganization: "",
  })
  const { topDonator, topDonation, forEachItem, forEachDonation, forEachShare, forEachOrganization } = state



  useEffect(() => {
    (async () => {

      setLoading(true)
      const getSettingsValue = await settingApi.list(userAuthToken ? userAuthToken :CampaignAdminAuthToken, Object.keys(state));
      if (getSettingsValue.data.data.length > 0) {
        let data = {}

        getSettingsValue.data.data.map((d, i) => {
          data[d.name] = d.value
        })

        setState({
          ...data
        })
      }
      setLoading(false)



    })()
  }, [])


  return (
    <>
      <FrontLoader loading={loading} />
      <DefaultLayout>
        <Container fluid className="pt-5">
          <div className="d-flex align-items-center py-3 border-bottom">
            <Avatar
              size={35}
              avatarUrl={AvatarImg}
              border={0}
              shadow={false}
              className="mr-12p"
            />

            <span className="fs-7 text-light mr-2">Your Rank</span>

            <IconButton
              bgColor="#a278fc"
              className="btn__xs rounded-pill ms-2"
              icon={<FontAwesomeIcon icon={solid("narwhal")} />}
            >
              Norwhal
            </IconButton>
            <a href="/" className="text-info fw-bold fs-5 ms-auto me-1">
              3,340 xp
            </a>
          </div>
          <div className="py-20p">
            <div className="note text-dark fs-7 mw-600">
              <div className="mb-12p">
                Earn XP by interacting on Donorport even if you aren't donating
                money. Be rewarded for sharing and following Organizations and
                Projects. To track the XP you've earned, click here:
              </div>
              <a href="/" className="text-dark fw-bolder">
                My XP
              </a>
            </div>
          </div>

          <div className="mw-800 pb-5">
            <div className="d-flex align-items-center py-12p">
              <ListItemImg
                size={68}
                imgSrc="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5ef61a93718f37b258157a4d_crown.svg"
              />
              <span className="mx-sm-4 mx-2 flex__1 text-light">
                A top donator + purchased items from every category, and all
                locations
              </span>
              <span className="fw-bold text-info">{topDonator} XP</span>
            </div>
            <div className="d-flex align-items-center py-12p">
              <ListItemImg
                size={68}
                imgSrc="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5ef61d975395ccef43cbb71f_top.svg"
              />
              <span className="mx-sm-4 mx-2 flex__1 text-light">
                Have the top donation to an organization over $500
              </span>
              <span className="fw-bold text-info">{topDonation}  XP</span>
            </div>
            <div className="d-flex align-items-center py-12p">
              <ListItemImg
                size={68}
                imgSrc="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5ea77ef8debb84eec8354d5b_bank.svg"
              />
              <span className="mx-sm-4 mx-2 flex__1 text-light">
                For each item you purchase
              </span>
              <span className="fw-bold text-info">{forEachItem} XP</span>
            </div>
            <div className="d-flex align-items-center py-12p">
              <ListItemImg
                size={68}
                imgSrc="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5e4c2ff23144db148fd45b43_wallet.svg"
              />
              <span className="mx-sm-4 mx-2 flex__1 text-light">
                For each donation to an Organization / Project
              </span>
              <span className="fw-bold text-info">{forEachDonation} XP</span>
            </div>
            <div className="d-flex align-items-center py-12p">
              <ListItemImg
                size={68}
                imgSrc="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5ef61ef15babc48a50bd2bd5_share.svg"
              />
              <span className="mx-4 flex__1 text-light">
                For each share of an item / Organization / Project via social
                media
              </span>
              <span className="fw-bold text-info">{forEachShare} XP</span>
            </div>
            <div className="d-flex align-items-center py-12p">
              <ListItemImg
                size={68}
                imgSrc="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5ef6176ab4ea47d76444346c_speech-bubble.svg"
              />
              <span className="mx-4 flex__1 text-light">
                For each Organization / Project you follow
              </span>
              <span className="fw-bold text-info">{forEachOrganization} XP</span>
            </div>
          </div>
        </Container>
      </DefaultLayout>
    </>
  );
};

export default Xp;