import React from 'react';
import { ErrorMessage } from 'formik';

const ErrorText = ({ name }) => (
  <ErrorMessage name={name} component="div" style={{ color: 'red' }} />
);

export default ErrorText;
