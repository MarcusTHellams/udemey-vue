import { InferType, object, string } from 'yup';

export const schema = object({
  name: string().required('Name is Required'),
  description: string().required('Description is Required'),
});

export type FormValues = InferType<typeof schema>;
