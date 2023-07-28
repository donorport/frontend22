import "./style.scss";

const WidgetTitle = ({href, children}) => {
  return (
    <div className="project__detail-subtitle fw-bold">
      {href ? (
        <div className="text-decoration-none">
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default WidgetTitle;
