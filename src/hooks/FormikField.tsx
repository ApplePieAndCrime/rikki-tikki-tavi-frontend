import { FormikValues } from 'formik';

const useFormikHook = (formik: FormikValues) => {
  const FormikField = (name: string, ...rest: any[]) => {
    return {
      name,
      value: formik[name],
      onChange: formik.handleChange,
      error: !!formik.errors[name],
      helperText: formik.errors[name],
      ...rest,
    };
  };
  return { FormikField };
};

export default useFormikHook;
