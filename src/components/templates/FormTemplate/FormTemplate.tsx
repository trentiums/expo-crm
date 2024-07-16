import React from "react";
import { Form } from "react-final-form";

type FormTemplateProps = {
  Component: any;
  [otherProps: string]: any;
};

function FormTemplate<FormValues>({
  onSubmit,
  Component,
  ...rest
}: FormTemplateProps) {
  return (
    <Form<FormValues> onSubmit={onSubmit} {...rest}>
      {(formProps) => <Component {...formProps} {...rest} />}
    </Form>
  );
}

FormTemplate.defaultProps = {};

export default FormTemplate;
