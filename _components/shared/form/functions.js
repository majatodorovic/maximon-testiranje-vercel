export const handleFieldsValidation = (data, fields) => {
  let err = [];
  let required_fields_err = handleRequiredFields(fields, data);

  return [...err, ...required_fields_err];
};

export const handleInputChange = (e, setData, setErrors) => {
  const { name, value, type, checked } = e.target;

  setErrors((prev) => prev.filter((error) => error !== name));
  switch (type) {
    case "checkbox":
      return setData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    default:
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
  }
};

export const handleSubmit = (
  e,
  data = {},
  setData,
  handler = ({ data }) => {},
  fields,
  setErrors
) => {
  let err = handleFieldsValidation(data, fields);
  //Added error validation for - value 
  if(data.id_country == '-') {
    err = [...err,'id_country'];
    if (err?.length > 0) {
      return setErrors(err);
    }
  } else {
    if (err?.length > 0) {
      return setErrors(err);
    }
  }

  setData = {}
  return handler({ ...data });
};

export const handleResetErrors = (setErrors) => {
  return setErrors([]);
};

export const handleRequiredFields = (fields, data) => {
  let err = [];
  let required_fields = (fields ?? [])?.filter((field) => field?.required);
  (required_fields ?? [])?.forEach(({ name }) => {
    if (!data?.[name]) {
      err.push(name);
    }
  });
  return err;
};
