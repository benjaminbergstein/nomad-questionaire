import React, { FC } from "react";
import { RiSailboatLine } from "react-icons/ri";
import { MdAirplanemodeActive } from "react-icons/md";
import { IoBicycle } from "react-icons/io5";

const config = {
  "vehicle.boat": RiSailboatLine,
  "vehicle.airplane": MdAirplanemodeActive,
  "vehicle.bicycle": IoBicycle,
};

const OptionIcon: FC<{ questionSlug; optionSlug }> = ({
  questionSlug,
  optionSlug,
}) => {
  const Icon = config[`${questionSlug}.${optionSlug}`];
  if (!Icon) return null;
  return <Icon />;
};

export default OptionIcon;
