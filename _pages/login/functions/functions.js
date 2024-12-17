export const handleOpen = (setShow, type) => {
  return setShow((prev) => ({
    type: type,
    show: !prev?.show,
  }));
};
