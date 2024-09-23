import './style.scss';

const TagTitle = ({children}) => (
  <h4 className="project__detail-sublabel mb-2" style={{ fontWeight: '900' }}>
    {children}
  </h4>
);
export default TagTitle;
