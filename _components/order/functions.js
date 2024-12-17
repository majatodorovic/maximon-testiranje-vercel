export const handlePaymentType = (payments) => {
  let type = null;

  (payments ?? [])?.forEach(({ data: { credit_card, paypal } }) => {
    if (credit_card !== null) {
      type = "credit_card";
      return type;
    }
    if (paypal !== null) {
      type = "paypal";
      return type;
    }
    type = "cash";
    return type;
  });

  return type;
};

export const handlePaymentStatus = (payments, payment_type) => {
  let data_tmp = {};

  (payments ?? [])?.forEach((payment) => {
    let {
      data,
      data: { status_info },
    } = payment;

    if (data?.[payment_type]) {
      if (status_info) {
        data_tmp[payment_type] = status_info;
      }
    } else {
      let info = "success";
      data_tmp[payment_type] = { status_info: info };
    }
  });
  return data_tmp;
};

export const handlePaymentText = (payment_type, status, fields) => {
  let data_tmp;
  if (status === "success") {
    data_tmp = {
      title: "Uspešno ste napravili porudžbenicu!",
      image: "/images/uspesno.png",
      subtitle: "Hvala Vam na ukazanom poverenju.",
      text_line_1: null,
      text_line_2:
        "Za sve dodatne informacije možete nas kontaktirati putem call centra +381 63 11 23 988 ili putem emaila masnetiedup@gmail.com",
      button: "Nazad na početnu stranu",
      payment_info: {
        status: status,
      },
    };
  } else {
    data_tmp = {
      title: "Uspešno ste napravili porudžbenicu!",
      subtitle: "Hvala Vam na ukazanom poverenju.",
      image: "/images/uspesno.png",
      text_line_2:
        "Za sve dodatne informacije možete nas kontaktirati putem call centra +381 63 11 23 988 ili putem emaila masnetiedup@gmail.com",
      button: "Nazad na početnu stranu",
      payment_info: {
        status: status,
      },
    };
  }

  switch (payment_type) {
    case "credit_card":
      return handlePaymentCreditCardText(data_tmp, fields, status);
    case "paypal":
      return handlePaymentPaypalText(data_tmp, fields, status);
    default:
      return handlePaymentCashText(data_tmp, fields, status);
  }
};

export const handlePaymentCreditCardText = (data_tmp, fields, status) => {
  switch (status) {
    case "success":
      return {
        ...data_tmp,
        payment_info: {
          ...data_tmp?.payment_info,
          title:
            "Uspešno ste izvršili plaćanje, račun Vaše platne kartice je zadužen!",
          fields_title: "Podaci o transakciji:",
          fields: [...fields],
        },
      };
    default:
      return {
        ...data_tmp,
        payment_info: {
          ...data_tmp?.payment_info,
          title: "Plaćanje neuspešno, račun vaše platne kartice nije zadužen!",
          description:
            "Vaša kupovina je uspešno evidentirana ali plaćanje platnom karticom nije realizovano. Uskoro ćemo Vas kontaktirati radi realizacije Vaše kupovine.",
          fields_title: "Podaci o transakciji:",
          fields: [...fields],
        },
      };
  }
};

export const handlePaymentPaypalText = (data_tmp, fields, status) => {
  switch (status) {
    case "success":
      return {
        ...data_tmp,
        payment_info: {
          ...data_tmp?.payment_info,
          title:
            "Uspešno ste izvršili plaćanje putem PayPal-a, Vaš račun je zadužen!",
          fields: [],
        },
      };
    default:
      return {
        ...data_tmp,
        payment_info: {
          ...data_tmp?.payment_info,
          title:
            "Uspešno ste izvršili plaćanje putem PayPal-a, Vaš račun je zadužen!",
          description:
            "Vaša kupovina je uspešno evidentirana ali plaćanje platnom karticom nije realizovano. Uskoro ćemo Vas kontaktirati radi realizacije Vaše kupovine.",
          fields: [],
        },
      };
  }
};

export const handlePaymentCashText = (data_tmp, fields, status) => {
  switch (status) {
    case "success":
      return {
        ...data_tmp,
        text_line_1:
          "Uskoro ćemo Vas kontaktirati u cilju dodatnog informisanja.",
      };
    default:
      return {
        ...data_tmp,
        text_line_1:
          "Uskoro ćemo Vas kontaktirati u cilju dodatnog informisanja.",
      };
  }
};
