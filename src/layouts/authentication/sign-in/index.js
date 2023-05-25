/* eslint-disable no-console */
/* eslint-disable no-empty */
/* eslint-disable spaced-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";


// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Axios
import axios from "axios";
import Cookies from "js-cookie"; // js-cookie kütüphanesini import ettik


function Basic() {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useNavigate(); // useHistory hook'unu kullanarak history nesnesini elde ettik

  const [resMessage, setResMessage] = useState("");

  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const openWarningSB = () => setWarningSB(true);
  const closeWarningSB = () => setWarningSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);

  const handleLogin = () => {
    // API'ye POST isteği göndererek kullanıcı adı ve şifreyi doğrula
    axios
      .post(`${apiUrl}/api/auth/login`, { email, password })
      .then((response) => {
        const jwtToken = response.data.token;
        // API'den gelen token değeri
        if (jwtToken) {
          // Kullanıcı adı ve şifre doğruysa token değeri cookie'lere kaydedilir
          Cookies.set("jwt", jwtToken);
          setLoggedIn(true);
          setResMessage("");
          openSuccessSB();
          // Giriş başarılı ise anasayfaya yönlendir
          history("/") // "/anasayfa" URL'ine yönlendirme yapıyoruz
        } else {
          setLoggedIn(false);
          setResMessage("Kullanıcı adı veya şifre hatalı");
          openWarningSB();
        }
      })
      .catch((error) => {
        console.error("API isteği başarısız oldu:", error);
        setLoggedIn(false);
        if (error.response && (error.response.status === 400 || error.response.status === 409)) {
          openWarningSB()
          setResMessage(error.response.data.message)
        } else if (error.response && error.response.status === 500) {
          openErrorSB()
          setResMessage(error.response.data.message)
        } else {
          openErrorSB()
          setResMessage("sistem yöneticisi ile iletişime geçiniz.")
        }
      });
  };


  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="BAŞARILI"
      content={resMessage}
      dateTime="Şimdi"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="BİLGİ"
      content={resMessage}
      dateTime="Şimdi"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="UYARI"
      content={resMessage}
      dateTime="Şimdi"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="HATA"
      content={resMessage}
      dateTime="Şimdi"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );



  return (
    <BasicLayout image={bgImage}>
      <Card>
        {renderSuccessSB}{renderInfoSB}{renderWarningSB}{renderErrorSB}
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

          <MDTypography variant="h4" fontWeight="small" color="white" mt={1}>
            Dendor
          </MDTypography>
          <Grid container spacing={0} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Kullanıcı Girişi
            </MDTypography>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            {loggedIn && <p>Giriş Başarılı</p>}
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Şifre" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Beni Hatırla
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleLogin}>
                Giriş
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
    </BasicLayout>
  );
}

export default Basic;
