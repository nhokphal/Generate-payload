import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useFormik } from 'formik'
import axios from "axios";
import { useState } from "react";
import jwt_decode from "jwt-decode";








const initialValues = {
   email: '',
   password: ''
}
const onSubmit = (values) => {
   console.table({values})
}

const Login = () => {
   const formik = useFormik({initialValues, onSubmit})
   const [user, setUser] = useState(null);
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(false);
   const [success, setSuccess] = useState(false);



  const refreshToken = async () => {
   try {
     const res = await axios.post("/refresh", { token: user.refreshToken });
     setUser({
       ...user,
       accessToken: res.data.accessToken,
       refreshToken: res.data.refreshToken,
     });
     return res.data;
   } catch (err) {
     console.log(err);
   }
 };

 const axiosJWT = axios.create()

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(user.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await refreshToken();
        config.headers["authorization"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const res = await axios.post("/", { username, password });
     setUser(res.data);
   } catch (err) {
     console.log(err);
   }
 };  




   return (
      <Container>
         <Row className="mt-5">
            <Col
               sm={10}
               md={6}
               lg={4}
               className="mx-auto bg-white rounded shadow py-5 px-3 text-primary"
            >
               <h2>Sign In</h2>
               <Form autoComplete="off" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                     <Form.Label>Email</Form.Label>
                     <Form.Control
                        autoFocus
                        type="email"
                        name="email"
                        values={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Enter your email"
                     />
                  </Form.Group>
                  <Form.Group className="mb-4">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        name="password"
                        values={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Enter your password"
                     />
                  </Form.Group>
                  <Form.Group>
                     <Button type="submit" variant="primary" className="w-100">
                        Submit
                     </Button>
                  </Form.Group>
               </Form>
               <p className="mt-3 h6 text-center">
                  Don't have an account? <a href="/register">Sign up</a>
               </p>
            </Col>
         </Row>
      </Container>
   )
}
export default Login
