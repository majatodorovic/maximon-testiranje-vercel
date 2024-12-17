export const createOptionsArray = (data) => {
  const { delivery_method_id, delivery_method_name, prop_name, selected } =
    data;

  const { id, name } = selected;

  let arr = [];

  arr.push({
    id: delivery_method_id,
    name: delivery_method_name,
    data: [
      {
        id: prop_name,
        selected: {
          id: id,
          name: name,
        },
      },
    ],
  });

  arr = arr?.filter(
    (v, i, a) =>
      a?.findIndex(
        (t) =>
          t?.id === v?.id &&
          t?.data?.[0]?.selected?.id === v?.data?.[0]?.selected?.id
      ) === i
  );

  return arr;
};
