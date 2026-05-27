import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { toast } from 'react-toastify';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  FormHelperText,
  // Grid,
  TextField,
  // Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';

//  third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { loginAdmin } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PhoneIcon from '@mui/icons-material/Phone';

// ==============================|| FIREBASE LOGIN ||============================== //

const recaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const FirebaseLogin = ({ ...rest }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          mobileno: '',
          password: ''
        }}
        validationSchema={Yup.object().shape({
          mobileno: Yup.string().max(10).required('Mobile Number is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          let recaptchaToken = '';
          if (recaptchaSiteKey) {
            recaptchaToken = recaptchaRef.current?.getValue() || '';
            if (!recaptchaToken) {
              toast.error('Please complete the reCAPTCHA', { autoClose: 2000 });
              setSubmitting(false);
              return;
            }
          }
          try {
            await dispatch(loginAdmin({ ...values, recaptchaToken }, navigate));
          } catch {
            recaptchaRef.current?.reset();
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate autoComplete="off" onSubmit={handleSubmit} {...rest}>
            <TextField
              error={Boolean(touched.mobileno && errors.mobileno)}
              fullWidth
              helperText={touched.mobileno && errors.mobileno}
              label="Mobile Number"
              margin="normal"
              name="mobileno"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.mobileno}
              variant="outlined"
              color="secondary"
              inputProps={{ autoComplete: 'off' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" edge="end" size="large">
                      <PhoneIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ mt: theme.spacing(3), mb: theme.spacing(1) }}>
              <InputLabel htmlFor="outlined-adornment-password" color="secondary">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Password"
                color="secondary"
                inputProps={{ autoComplete: 'new-password' }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text">
                  {' '}
                  {errors.password}{' '}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            {recaptchaSiteKey && (
              <Box mt={2} display="flex" justifyContent="center">
                <ReCAPTCHA ref={recaptchaRef} sitekey={recaptchaSiteKey} />
              </Box>
            )}

            <Box mt={2}>
              <Button color="secondary" disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained">
                Log In
              </Button>
            </Box>

            {/* <Box pt={2}>
              <Button fullWidth position="end" size="large" variant="text" color="secondary">
                Reset Password ?
              </Button>
            </Box> */}
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
