import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;


const sidebarConfig = [

  // {
  //   title: 'dashboard',
  //   path: '/admin/dashboard/',
  //   icon: getIcon(pieChart2Fill),
  //   name: 'DASHBOARD'
  // },
  {
    title: 'donors',
    path: '/admin/donors/',
    icon: getIcon(peopleFill),
    name: 'DONORS'
  },
  {
    title: 'charities',
    path: '/admin/charities/',
    icon: getIcon('codicon:organization'),
    name: 'CAMPAIGN_ADMIN'

  },
  {
    title: 'categories',
    path: '/admin/category/',
    icon: getIcon('carbon:category'),
    name: 'CATEGORIES'

  },
  {
    title: 'products',
    path: '/admin/products/',
    icon: getIcon('mdi:alpha-p-circle'),
    name: 'PRODUCT'

  },
  {
    title: 'projects',
    path: '/admin/projects/',
    icon: getIcon('fontisto:ampproject'),
    name: 'PROJECT'

  },
  {
    title: 'fundraisers',
    path: '/admin/crowdfundings/',
    icon: getIcon('hugeicons:crowdfunding'),
    name: 'FUNDRAISING'

  },
  {
    title: 'orders',
    path: '/admin/orders/',
    icon: getIcon('eos-icons:products'),
    name: 'ORDERS'

  },
  {
    title: 'donations',
    path: '/admin/donation/',
    icon: getIcon('iconoir:donate'),
    name: 'DONATION'
  },
  {
    title: 'advertisements',
    path: '/admin/advertisement/',
    icon: getIcon('fa6-solid:rectangle-ad'),
    name: 'AD'
  },
  {
    title: 'cms',
    path: '/admin/cms/',
    icon: getIcon('iconoir:page-flip'),
    name: 'CMS'

  },
  {
    title: 'partnership',
    path: '/admin/partnership/',
    icon: getIcon('teenyicons:question-circle-solid'),
    name: 'PARTNERSHIP'

  },
  {
    title: 'verified',
    path: '/admin/verified/',
    icon: getIcon('codicon:unverified'),
    name: 'VERIFIED'

  },
  // {
  //   title: 'profile',
  //   path: '/admin/profile/',
  //   icon: getIcon(peopleFill),
  //   name:'PROFILE'
  // },
  {
    title: 'setting',
    path: '/admin/setting/',
    icon: getIcon('ci:settings-filled'),
    name: 'SETTING'
  },


];





export default sidebarConfig;
