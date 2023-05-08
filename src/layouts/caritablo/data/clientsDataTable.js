/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"; // js-cookie kütüphanesini import ettik
import { useNavigate } from "react-router-dom";


export default function data() {

  const [resData, setresData] = useState([]);
  const history = useNavigate(); // useHistory hook'unu kullanarak history nesnesini elde ettik

  useEffect(() => {
    const jwtToken = Cookies.get('jwt');

    axios.get("http://127.0.0.1:5001/api/clients", { headers: { 'jwt': `${jwtToken}` } })
      .then((response) => {
        console.log(response.data);
        setresData(response.data)
      })
      .catch((error) => {
        history("/authentication/sign-in") // "/anasayfa" URL'ine yönlendirme yapıyoruz
      });

  }, []);

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const items = resData;

  return {
    columns: [
      { Header: "Firma Adı - Üye No", accessor: "author", width: "45%", align: "left" },
      { Header: "Görev", accessor: "function", align: "left" },
      { Header: "Vergi Dairesi", accessor: "vergi", align: "left" },
      { Header: "Yetkili", accessor: "yetkili", align: "left" },
      { Header: "Statü", accessor: "status", align: "center" },
      { Header: "Güncelleme", accessor: "employed", align: "center" },
      { Header: "Bakiye", accessor: "budget", align: "left" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: 
      resData.map((item) => ({
        author: <Author image={team4} name={item.name} email={item.clientId} />,
        function: <Job title={item.job} description={item.post} />,
        vergi: <Job title={item.taxOffice} description={item.taxNumber} />,
        yetkili: <Job title="Kerem TUGAY" description="+905319343523" />,
        budget: (<MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">$2,500</MDTypography>),
        status: (<MDBox ml={-1}><MDBadge badgeContent={item.role} color="info" variant="gradient" size="sm" /></MDBox>),
        employed: ( <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">{new Date(item.updatedAt).toLocaleDateString('tr-TR')}</MDTypography>),
        action: (<MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">Edit</MDTypography>),
      })),
  };
}
