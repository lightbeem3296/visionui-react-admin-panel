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

import Datatable from "../components/Datatable";
import { Sorter } from "pages/components/Sorter";

function Tables() {

  const columns = [
    {
      title: 'User Id',
      dataIndex: 'user_id',
      key: 'user_id',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
      width: "270px",
      fixed: 'left',
    },
    {
      title: 'User No',
      dataIndex: 'user_no',
      key: 'user_no',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Character Name',
      dataIndex: 'character_name',
      key: 'character_name',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Character No',
      dataIndex: 'character_no',
      key: 'character_no',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Charge Type',
      dataIndex: 'charge_type',
      key: 'charge_type',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'Map',
      dataIndex: 'map',
      key: 'map',
      sorter: {
        compare: Sorter.DEFAILT,
      },
      search: true,
    },
    {
      title: 'X',
      dataIndex: 'x',
      key: 'x',
      search: true,
    },
    {
      title: 'Y',
      dataIndex: 'y',
      key: 'y',
      search: true,
    },
    {
      title: 'Item Index',
      dataIndex: 'item_index',
      key: 'item_index',
      sorter: {
        compare: Sorter.DEFAILT,
      },
    },
    {
      title: 'Log Date',
      dataIndex: 'log_date',
      key: 'log_date',
      sorter: {
        compare: Sorter.DATE,
      },
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
              <Datatable columns={columns} url={"/admin/user_creedians_charge_log"} />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
