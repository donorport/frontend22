import {
  Card,
  //Table,
  Stack,
  //Avatar,
  //Button,
  //Checkbox,
  //TableRow,
  //TableBody,
  //TableCell,
  Container,
  Typography
  //TableContainer,
  //TablePagination
} from '@mui/material';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
//import plusFill from '@iconify/icons-eva/plus-fill';
//import trash from '@iconify/icons-eva/trash-2-fill';
//import editfill from '@iconify/icons-eva/edit-fill';
//import Label from '../../../components/Label';

//import { Icon } from '@iconify/react';
//import { Link as RouterLink } from 'react-router-dom';
//import DataTable from "react-data-table-component";
//import DataTableExtensions from "react-data-table-component-extensions";
import 'react-data-table-component-extensions/dist/index.css';
//import moment from 'moment';
//import helper, { priceFormat } from '../../../Common/Helper';
//import PhoneIcon from '@mui/icons-material/Phone';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import WidgetsIcon from '@mui/icons-material/Widgets';

import Page from '../../../components/Page';

import OrganizationDonation from './organizationDonationTable';
import ProjectDonation from './projectDonatonTable';

export default function Index(props) {
  const handleChange = props.handleChange;
  const value = props.value;
  return (
    <Page title="Donation List | Admin">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Donation List
          </Typography>
          {/* <Button
                        variant="contained"
                        startIcon={<Icon icon={plusFill} />}
                        onClick={() => props.openModel()}
                    >
                        Add Category
                    </Button> */}
        </Stack>
        <Card>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab icon={<CorporateFareIcon />} label="Organization" value="1" />
                  <Tab icon={<WidgetsIcon />} label="Project" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <OrganizationDonation organizationDonationList={props.organizationDonationList} />
              </TabPanel>
              <TabPanel value="2">
                <ProjectDonation projectDonationList={props.projectDonationList} />
              </TabPanel>
            </TabContext>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
