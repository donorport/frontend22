import React, { useState } from "react";
import { Button } from 'react-bootstrap';

// import { WidgetTitle, TagTitle } from "../../Component";
import WidgetTitle from "../../atoms/widget-title"
import TagTitle from "../../atoms/tag-title"
import HistoryItem from "../../molecules/history-item";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

function History(props) {
  const [loadMore, setLoadMore] = useState(false)
  const userAuthToken = localStorage.getItem('userAuthToken');
  const userData = JSON.parse(localStorage.getItem('userData'));


  let list = props.list

  return (
    <>
      <TagTitle>History</TagTitle>
      <WidgetTitle href="/log">Purchase Log</WidgetTitle>

      <div className="log__wrap">
        <div className="log__recent border-bottom">
          <div className="log__avatar avatar--title">
            <div className="log__avatar__img avatar__img--recent">
              {/* <i className="fa-solid fa-clock"></i> */}
              <FontAwesomeIcon icon={solid("clock")} />

            </div>
          </div>
          <div className="action__info">
            <div className="log__title">
              <div>6 Recent Donations</div>
              <div className="billing__type">48 hours</div>
            </div>
          </div>
        </div>
        <ul className="list-unstyled">
          {
            list.length > 0 ?
              list.slice(0, loadMore ? list.length : 3).map((item, i) => {
                return (
                  <HistoryItem categoryName="Fish" categoryColor="hsla(0, 96.46%, 76.14%, 1.00)" item={item} active={userAuthToken ? userData.id === item?.orderDetails?.userDetails?._id : false} />
                )
              }) :
              "Records Not Found"
          }
          {/* <HistoryItem active />
          <HistoryItem
            categoryName="Fish"
            categoryColor="hsla(0, 96.46%, 76.14%, 1.00)"
          />
          <HistoryItem categoryName="Captain" categoryColor="#000" /> */}
        </ul>
        {
          !loadMore && list.length > 3 &&

          <div className="more__log">
            <Button variant="info" className="fs-6 pt-12p pb-12p w-100" onClick={() => setLoadMore(true)}>Load More . . .</Button>
          </div>
        }
      </div>
    </>
  );
}

export default History;
