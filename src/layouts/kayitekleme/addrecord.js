/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */

import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
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

// My Components
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";


function AddRecord() {

    // cash listesi için
    const cashList = [
        { title: 'Türk Lirası', value: "try" },
        { title: 'Dolar', value: "usd" },
        { title: 'Euro', value: "euro" }
    ]

    const flatProps = {
        options: cashList.map((option) => option.title),
    };

    // record type için
    const recordType = [
        { title: 'Gelir', value: "income" },
        { title: 'Gider', value: "expense" },
    ]

    const recordtypeProps = {
        options: recordType.map((option) => option.title),
    };

    // me api isteği için
    const [resData, setresData] = useState("");
    const history = useNavigate(); // useHistory hook'unu kullanarak history nesnesini elde ettik

    useEffect(() => {
        const jwtToken = Cookies.get('jwt');

        axios.get("http://127.0.0.1:5001/api/auth/me", { headers: { 'jwt': `${jwtToken}` } })
            .then((response) => {
                setresData(response.data.data)
                console.log(response.data.data);
            })
            .catch((error) => {
                console.error("API isteği başarısız oldu:", error);
                history("/authentication/sign-in") // "/anasayfa" URL'ine yönlendirme yapıyoruz
            });

    }, []);

    // form gönderme için
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("income");
    const [currency, setCurrency] = useState("try");

    const [amount, setAmount] = useState("");

    const handleSubmit = (event) => {
        axios.post("http://127.0.0.1:5001/api/transactions", { title, description, type, amount, currency, user: resData })
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
                                        <MDInput type="text" label="Başlık" fullWidth onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </MDBox>
                                    <MDBox mb={2}>
                                        <MDInput type="text" label="Açıklama" multiline rows={5} fullWidth onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </MDBox>
                                    <Grid container spacing={3} justifyContent="space-around" mb={2}>
                                        <Grid item xs={12} lg={3}><Autocomplete
                                            {...recordtypeProps}
                                            onChange={(e, newValue) => setType(newValue === "Gelir" ? "income" : "expense")}
                                            id="gelir-gider"
                                            selectOnFocus
                                            defaultValue={recordtypeProps.options[0]}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Kayıt Türünü Seçiniz" variant="standard" />
                                            )}
                                        /></Grid>
                                        <Grid item xs={12} lg={6}><MDInput type="Number" label="Miktar" fullWidth onChange={(e) => setAmount(e.target.value)} /></Grid>
                                        <Grid item xs={12} lg={3}><Autocomplete
                                            {...flatProps}
                                            onChange={(e) => setCurrency(e.target.value)}
                                            id="para-birimi"
                                            selectOnFocus
                                            defaultValue={flatProps.options[0]}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Para Birimini Seçiniz" variant="standard" />
                                            )}
                                        /></Grid>
                                    </Grid>
                                    <MDBox mt={4} mb={1}>
                                        <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                                            Kaydet
                                        </MDButton>
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
