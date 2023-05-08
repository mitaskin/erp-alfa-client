/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import { useState } from "react";
import axios from "axios";

function AddRecord() {

    const cashList = [
        { title: 'Türk Lirası', year: 1994 },
        { title: 'Dolar', year: 1972 },
        { title: 'Euro', year: 1972 }
    ]

    const flatProps = {
        options: cashList.map((option) => option.title),
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        axios.post("http://127.0.0.1:5001/api/transactions", { title, description })
            .then(response => {
                console.log(response.data);
                alert("Form gönderildi.");
            })
            .catch(error => {
                console.log(error);
                alert("Form gönderirken bir hata oluştu.");
            });
    }

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox pt={6} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                                mx={2}
                                mt={-3}
                                p={2}
                                mb={1}
                                textAlign="center"
                            >
                                <Grid container spacing={0} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                                    <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                                        Kayıt Ekleme
                                    </MDTypography>
                                </Grid>
                            </MDBox>
                            <MDBox pt={4} pb={3} px={3}>
                                <MDBox component="form" role="form">
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="Başlık" fullWidth />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="Açıklama" multiline rows={5} fullWidth />
                                    </MDBox>
                                    <Grid container spacing={3} justifyContent="space-around" mb={2}>
                                        <Grid item xs={12} lg={4}><MDInput type="Number" label="Türk Lirası" fullWidth /></Grid>
                                        <Grid item xs={12} lg={4}><MDInput type="Number" label="Dolarr" fullWidth /></Grid>
                                        <Grid item xs={12} lg={4}><MDInput type="Number" label="Euro" fullWidth /></Grid>
                                    </Grid>

                                    <MDBox mb={2}>
                                        <Autocomplete
                                            {...flatProps}
                                            id="para-birimi"
                                            selectOnFocus
                                            defaultValue={flatProps.options[0]}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Para Birimini Seçiniz" variant="standard" />
                                            )}
                                        />
                                    </MDBox>

                                    <MDBox display="flex" alignItems="center" ml={-1}>
                                        <Switch />
                                        <MDTypography
                                            variant="button"
                                            fontWeight="regular"
                                            color="text"
                                            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                                        >
                                            &nbsp;&nbsp;Beni Hatırla
                                        </MDTypography>
                                    </MDBox>
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                                            Kaydet
                                        </MDButton>
                                    </MDBox>
                                    <MDBox mt={3} mb={1} textAlign="center">
                                        <MDTypography variant="button" color="text">
                                            Yeni Kullanıcı için{" "}
                                            <MDTypography
                                                component={Link}
                                                to="/authentication/sign-up"
                                                variant="button"
                                                color="info"
                                                fontWeight="medium"
                                                textGradient
                                            >
                                                Kayıt Ol
                                            </MDTypography>
                                        </MDTypography>
                                    </MDBox>
                                </MDBox>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
            <Footer />
        </DashboardLayout>
    );
}

export default AddRecord;
