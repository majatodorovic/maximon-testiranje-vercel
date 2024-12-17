"use client";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";
import { icons } from "@/_lib/icons";

export const getSwiperModules = ({ modules = [], available_modules = [] }) => {
  let modules_tmp = [];
  let selected_modules = [...modules];

  (available_modules ?? [])?.forEach((module) => {
    if (selected_modules?.includes(module?.name)) {
      modules_tmp?.push(module?.module);
    }
  });
  return modules_tmp;
};

export const renderBannerPagination = ({
  num_of_slides,
  current_slide,
  func,
}) => {
  return (
    <div className="absolute mx-auto bottom-5 left-0 right-0 z-[5]">
      <div className={`flex flex-col gap-2 items-center`}>
        <div className={`flex items-center gap-5`}>
          <span onClick={func?.prev} className={`text-boa-red cursor-pointer`}>
            {icons.chevron_left}
          </span>
          <span className={`text-boa-red`}>
            {current_slide + 1} / {num_of_slides}
          </span>
          <span onClick={func?.next} className={`text-boa-red cursor-pointer`}>
            {icons.chevron_right}
          </span>
        </div>
        <div className={`flex items-center gap-2`}>
          {Array.from({ length: num_of_slides }, (_, i) => {
            return (
              <span
                key={i}
                onClick={() => func?.slideTo(i)}
                className={`w-20 h-0.5 cursor-pointer ${
                  current_slide === i ? "bg-boa-red" : "bg-white"
                }`}
              ></span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const available_modules = [
  {
    name: "Navigation",
    module: Navigation,
  },
  {
    name: "Pagination",
    module: Pagination,
  },
  {
    name: "Autoplay",
    module: Autoplay,
  },
  {
    name: "Scrollbar",
    module: Scrollbar,
  },
];
