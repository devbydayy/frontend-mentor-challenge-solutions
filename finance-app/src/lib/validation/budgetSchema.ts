import * as Yup from 'yup';

export const budgetSchema = Yup.object().shape({
  category: Yup.string()
    .required('Category name is required')
    .min(3, 'Category must be at least 3 characters'),
  maximum: Yup.number()
    .required('Maximum amount is required')
    .positive('Amount must be positive'),
});
