import { Link } from "react-router-dom";
import "./style.scss";
import helper from "../../../../../Common/Helper";

function ProjectCrowdfundingSuggestionItem(props) {
  const type = props.type ?? 'project'; // 'crowdfunding'
  const imagePath = helper[`${type[0].toUpperCase() + type.slice(1)}ImagePath`];
  let item = props.item;
  let imgUrl = item.imageDetails.length > 0 ? imagePath + item.imageDetails[0].image :""

  return (
    <Link to={`/${type}/` + item.slug}>
      <li className={`project__suggestion__item pt-12p pb-12p d-sm-flex align-items-center ${props.className}`}>
        <div className="d-flex align-items-center flex-grow-1">
          <div
            className="circle__progress"
            style={{
              background:
                "linear-gradient(0deg, #fff 50%, transparent 50%), linear-gradient(180deg, #45a3e4 50%, #fff 50%)",
            }}
          >
            <div
              className="circle__progress-img"
              style={{
                backgroundImage:
                  "url("+imgUrl+" ",
              }}
            ></div>
          </div>
        </div>
      </li>
    </Link >
  );
}

export default ProjectCrowdfundingSuggestionItem;
