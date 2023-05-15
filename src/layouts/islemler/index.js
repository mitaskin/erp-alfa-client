/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */


// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // js-cookie kütüphanesini import ettik
import { Link, useNavigate } from "react-router-dom";

// Data
import authorsTableData from "layouts/islemler/data/clientsDataTable";

function Islemler() {
  const { columns, rows } = authorsTableData();
  const [resData, setresData] = useState("");
  const history = useNavigate(); // useHistory hook'unu kullanarak history nesnesini elde ettik

  useEffect(() => {
    const jwtToken = Cookies.get('jwt');

    axios.get("http://127.0.0.1:5001/api/transactions", { headers: { 'jwt': `${jwtToken}` } })
      .then((response) => {
        console.log(response.data);
        setresData(response.data)
      })
      .catch((error) => {
        history("/authentication/sign-in") // "/anasayfa" URL'ine yönlendirme yapıyoruz
      });

  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  İşlemler Tablosu (Türk Lirası)
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  isSorted={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  İşlemler Tablosu (Dolar)
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  İşlemler Tablosu (Euro)
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  entriesPerPage={false}
                  showTotalEntries={false}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Islemler;
