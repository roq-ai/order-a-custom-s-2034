import * as yup from 'yup';

export const saunaValidationSchema = yup.object().shape({
  type: yup.string().required(),
  door: yup.string().required(),
  window: yup.string().required(),
  wood: yup.string().required(),
  fabric: yup.string().required(),
  roof: yup.string().required(),
  color: yup.string().required(),
  warm_generator: yup.string().required(),
  company_id: yup.string().nullable(),
});
