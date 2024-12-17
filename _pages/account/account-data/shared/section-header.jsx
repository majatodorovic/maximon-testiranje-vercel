"use client";

import { Button } from "./button";

export const SectionHeader = ({
  title = "",
  description = "",
  icon = "",
  button = "",
  onClick = () => {},
}) => {
  return (
    <div
      className={`flex items-start flex-col sm:flex-row max-sm:gap-5 justify-between`}
    >
      <div className={`block`}>
        <h2>{title}</h2>
        <p className={`text-sm text-gray-500`}>{description}</p>
      </div>
      <Button
        button_text={button}
        type={`section-header`}
        icon={icon}
        onClick={onClick}
      />
    </div>
  );
};
