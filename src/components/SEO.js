// import { Helmet } from 'react-helmet';

const Seo = ({ title, description, url, keywords=["Donorport"] }) => {
  
	return (
<Helmet htmlAttributes={{ lang: 'en' }} title={title} meta={[
        {
          name: 'description',
          content: description,
        },
        {
          name: 'keywords',
          content: keywords.join(),
        },
		]}
    links={[
     {
          rel: 'canonical',
          href: url,
      },
    ]}
    />
 );
}
export default Seo;