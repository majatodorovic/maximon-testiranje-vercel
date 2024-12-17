const Spinner = ({className}) => {
  return (
    <div className={`${className} lds-ring scale-50`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
