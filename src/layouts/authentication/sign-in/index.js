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

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

// Axios
import axios from "axios";
import Cookies from "js-cookie"; // js-cookie kütüphanesini import ettik

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);


  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const history = useNavigate(); // useHistory hook'unu kullanarak history nesnesini elde ettik

  const handleLogin = () => {
    

    // API'ye POST isteği göndererek kullanıcı adı ve şifreyi doğrula
    axios
      .post("http://127.0.0.1:5001/api/login", { email, password })
      .then((response) => {
        const jwtToken = response.data.token;
        // API'den gelen token değeri
        if (jwtToken) {
          // Kullanıcı adı ve şifre doğruysa token değeri cookie'lere kaydedilir
          Cookies.set("jwt", jwtToken);
          setLoggedIn(true);
          setErrorMessage("");
          // Giriş başarılı ise anasayfaya yönlendir
          history("/") // "/anasayfa" URL'ine yönlendirme yapıyoruz
        } else {
          setLoggedIn(false);
          setErrorMessage("Kullanıcı adı veya şifre hatalı");
        }
      })
      .catch((error) => {
        console.error("API isteği başarısız oldu:", error);
        setLoggedIn(false);
        setErrorMessage("Bir hata oluştu, lütfen tekrar deneyin");
      });
  };

  return (
    <BasicLayout image={bgImage}>
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
          {errorMessage && <p>{errorMessage}</p>}
          {loggedIn && <p>Giriş Başarılı</p>}
          <MDTypography variant="h4" fontWeight="small" color="white" mt={1}>
            Kasa Takip
          </MDTypography>
          <Grid container spacing={0} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Kullanıcı Girişi
            </MDTypography>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email} onChange={handleEmailChange} />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Şifre" fullWidth value={password} onChange={handlePasswordChange} />
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
