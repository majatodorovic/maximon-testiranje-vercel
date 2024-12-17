import { Input } from "@/_components/shared/form/input";
import { icons } from "@/_lib/icons";

export const Form = ({
  handleSubmit,
  fields,
  data,
  errors,
  isPending,
  showOptions,
  handleInputChange,
  button_text,
  className,
  buttonClassName,
}) => {
  return (
    <>
      <form
        className={`mt-5 ${
          showOptions ? "border-b" : ""
        } relative ${className}`}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        {(fields ?? [])?.map(
          ({ id, name, type, required, options, fill, placeholder }) => {
            return (
              <Input
                onChange={(e) => handleInputChange(e)}
                value={data?.[name]}
                key={id}
                data={data}
                type={type}
                placeholder={placeholder}
                name={name}
                fill={fill}
                options={options}
                id={name}
                errors={errors}
                required={required}
              />
            );
          }
        )}
        <div className={`col-span-full mt-5`}>
          <div className={`${showOptions ? "mb-5" : ""}`}>
            <button
              disabled={isPending}
              type={`submit`}
              className={`w-full bg-[#04b400] hover:bg-[#04b400]/80 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#04b400] sm:text-base shadow disabled:opacity-50 ${buttonClassName}`}
            >
              {isPending ? (
                <div
                  className={`animate-spin w-fit mx-auto flex justify-center text-center`}
                >
                  {icons.loading}
                </div>
              ) : (
                button_text ?? "Prijavite se"
              )}
            </button>
          </div>
        </div>
        {showOptions && (
          <div
            className={`absolute px-2 bg-[#f7f7f7] -bottom-3 left-0 right-0 mx-auto w-fit`}
          >
            ili
          </div>
        )}
      </form>
    </>
  );
};
