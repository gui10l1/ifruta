import { ValidationError } from 'yup';

interface IErrors {
  [key: string]: string;
}

function getValidationErrors(errs: ValidationError): IErrors {
  const yupErrors = {} as IErrors;

  errs.inner.forEach(err => {
    yupErrors[err.path || 0] = err.message;
  });

  return yupErrors;
}

export { getValidationErrors };
