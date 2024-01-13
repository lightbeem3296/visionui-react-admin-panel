/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Datatable from "./components/datatable";

function Tables() {

  const columns = [
    {
      title: 'User Id',
      dataIndex: 'user_id',
      key: 'user_id',
    },
    {
      title: 'User No',
      dataIndex: 'user_no',
      key: 'user_no',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Character Name',
      dataIndex: 'character_name',
      key: 'character_name',
    },
    {
      title: 'Character No',
      dataIndex: 'character_no',
      key: 'character_no',
    },
    {
      title: 'Charge Type',
      dataIndex: 'charge_type',
      key: 'charge_type',
    },
    {
      title: 'Map',
      dataIndex: 'map',
      key: 'map',
    },
    {
      title: 'X',
      dataIndex: 'x',
      key: 'x',
    },
    {
      title: 'Y',
      dataIndex: 'y',
      key: 'y',
    },
    {
      title: 'Item Tag',
      dataIndex: 'item_tag',
      key: 'item_tag',
    },
    {
      title: 'Item Index',
      dataIndex: 'item_index',
      key: 'item_index',
    },
    {
      title: 'Log Date',
      dataIndex: 'log_date',
      key: 'log_date',
    },
    {
      title: 'Log Index',
      dataIndex: 'log_index',
      key: 'log_index',
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3} style={{ minHeight: "calc(100vh - 12.2rem)" }}>
        <VuiBox mb={3}>
          <Card>
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="lg" color="white">
                Charge Log
              </VuiTypography>
            </VuiBox>
            <VuiBox
              sx={{
                "& th": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                      `${borderWidth[1]} solid ${grey[700]}`,
                  },
                },
              }}
            >
              <Datatable columns={columns} url={"http://localhost:9000/admin/user_creedians_charge_log"} />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
