import { TemplateOne } from "@/components/Cart/templates/template-one";

export const cart_template = {
  template_one: ({ children, verifyCaptcha, data, cartCost }) => {
    return (
      <TemplateOne
        verifyCaptcha={verifyCaptcha}
        data={data}
        cartCost={cartCost}
      >
        {children}
      </TemplateOne>
    );
  },
};
