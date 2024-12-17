export const handleCreditCard = (data) => {
  if (data) {
    const {
      payment_provider_data: { form },
    } = data;

    let bank_form = document.createElement("div");
    bank_form.innerHTML = form;
    document.body.appendChild(bank_form);
    const formData = document.getElementById("bank_send_form");
    formData?.submit();
  }
};

export const handleSetData = (type, form, data, setDataTmp) => {
  switch (type) {
    case "same_data":
      return handleSetSameData(form, setDataTmp);
    case "different_data":
      return handleSetDifferentData(data, setDataTmp);
    case "default_data":
      return handleSetDataTmp(form, setDataTmp);
    default:
      return;
  }
};

const handleSetSameData = (form, setDataTmp) => {
  if (form?.[0]) {
    return Object?.entries(form?.[0])?.forEach(([key, value]) => {
      if (key?.includes("billing")) {
        const new_key = key?.replace("billing", "shipping");
        setDataTmp((prev) => ({
          ...prev,
          [new_key]: value ?? null,
        }));
      }
    });
  }
};

const handleSetDifferentData = (data, setDataTmp) => {
  return Object?.entries(data)?.forEach(([key]) => {
    if (key?.includes("shipping")) {
      setDataTmp((prev) => ({
        ...prev,
        [key]: null,
        id_country_shipping: 0, //Set default to Izaberi
      }));
    }
  });
};

const handleSetDataTmp = (form, setDataTmp) => {
  if (form?.[0]) {
    return Object?.entries(form?.[0])?.forEach(([key, value]) => {
      if (key?.includes("billing")) {
        setDataTmp((prev) => ({
          ...prev,
          [key]: value ?? null,
        }));
      }
    });
  }
};
