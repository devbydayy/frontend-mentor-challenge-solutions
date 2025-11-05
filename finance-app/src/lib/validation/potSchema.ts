import * as Yup from 'yup';

export const potSchema = Yup.object().shape({
  name: Yup.string()
    .required('Pot name is required')
    .min(3, 'Name must be at least 3 characters'),
  target: Yup.number()
    .required('Target amount is required')
    .positive('Target must be a positive number'),
});
