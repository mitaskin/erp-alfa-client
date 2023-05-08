/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import BasicLayout from "../components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useState } from "react";

import axios from "axios";


function Cover() {
  // eslint-disable-next-line no-unused-vars
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetValue,setResetValue] = useState("");

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

  const handleSignIn = () => {
    // API'ye POST isteği göndererek kullanıcı adı ve şifreyi doğrula
    axios
      .post("http://127.0.0.1:5001/api/auth/register", { name, surname, phone, email, password })
      .then((response) => {
        if (response.data.status === "success") {
          openSuccessSB();
          setResMessage(response.data.message)
          setResetValue("");
        }
      })
      .catch((error) => {
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
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Dendor Üye Kayıt
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Kayıt için Bilgileri Eksiksiz Doldurunuz.
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="İsim"
                variant="standard"
                fullWidth
                refValue={resetValue}
                onChange={(e) => setName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Soyisim"
                variant="standard"
                fullWidth
                onChange={(e) => setSurname(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="phone"
                label="Telefon"
                variant="standard"
                fullWidth
                onChange={(e) => setPhone(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Şifre"
                variant="standard"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Şartları ve Koşulları
              </MDTypography>
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp; Kabul Ediyorum&nbsp;
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleSignIn}>
                Kayıt Ol
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Zaten Bir Hesabınız mı var?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Giriş Yap
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Cover;
