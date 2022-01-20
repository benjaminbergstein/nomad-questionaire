import React, { FC } from "react";
import {
  FaUmbrellaBeach,
  FaCaravan,
  FaCarSide,
  FaTruckPickup,
  FaMountain,
  FaDonate,
  FaWindowMinimize,
  FaAmazon,
  FaEarlybirds,
  FaSun, 
  FaLeaf,
  FaTree,
  FaSnowflake,
  FaCity,
} from "react-icons/fa";
import { RiSailboatLine, RiSurgicalMaskFill } from "react-icons/ri";
import {
  MdAirplanemodeActive,
  MdApartment,
  MdLocationCity,
  MdNightlight,
  MdBeachAccess,
  MdOutlineSocialDistance,
} from "react-icons/md";
import { IoAlarm, IoBicycle, IoInfiniteSharp, IoTrashOutline } from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";
import {
  GiCoins,
  GiMoneyStack,
  GiSurferVan,
  GiWalkingBoot,
  GiBindle,
  GiCactus,
  GiSolarSystem,
  GiWeight,
  GiCircleForest,
  GiForest,
  GiMountains,
} from "react-icons/gi";
import { WiSunrise } from "react-icons/wi";
import { FiClock } from "react-icons/fi";
import { SiHackernoon } from "react-icons/si";
import { GrGroup } from "react-icons/gr";

import { GoPackage } from "react-icons/go";

import { WiTime1, WiTime6 } from "react-icons/wi";

import { BsStars } from "react-icons/bs";
import { FiMinimize2 } from "react-icons/fi";
import { BiDrink } from "react-icons/bi";

const config = {
  "vehicle.boat": RiSailboatLine,
  "vehicle.airplane": MdAirplanemodeActive,
  "vehicle.bicycle": IoBicycle,
  "vehicle.trailer": FaCaravan,
  "vehicle.small-car": FaCarSide,
  "vehicle.rv-or-trailer": FaCaravan,
  "vehicle.van": GiSurferVan,
  "vehicle.suv-or-truck": FaTruckPickup,
  "vehicle.none": GiWalkingBoot,
  "budget.dirtbag": GiBindle,
  "budget.thrifty": GiCoins,
  "budget.bougie": GiMoneyStack,
  "budget.normal": ImCreditCard,
  "terrain.beach": FaUmbrellaBeach,
  "terrain.desert": GiCactus,
  "terrain.mountains": FaMountain,
  "terrain.city": MdLocationCity,
  "duration.short": WiTime1,
  "duration.months": WiTime6,
  "duration.year": GiSolarSystem,
  "duration.indefinitely": IoInfiniteSharp,
  "stuff.storage": GoPackage,
  "stuff.donate": FaDonate,
  "stuff.junk": IoTrashOutline,
  "stuff.keep": MdApartment,
  "belongings.minimalist": FiMinimize2,
  "belongings.comfort": BsStars,
  "belongings.style": GiWeight,
  "belongings.buy-it-all": FaAmazon,
  "work-hours.hst": FaEarlybirds,
  "work-hours.pst": WiSunrise,
  "work-hours.mst": IoAlarm,
  "work-hours.cst": FiClock,
  "work-hours.est": SiHackernoon,
  "work-hours.ast": MdNightlight,
  "land-type.city": FaCity,
  "land-type.coastal": MdBeachAccess,
  "land-type.forest": GiCircleForest,
  "land-type.unique": GiForest,
  "land-type.mountains": GiMountains,
  "climate.summer": FaSun,
  "climate.autumn": FaLeaf,
  "climate.spring": FaTree,
  "climate.winter": FaSnowflake,
  "covid.concerned": MdOutlineSocialDistance,
  "covid.cautious": RiSurgicalMaskFill,
  "covid.comfortable": BiDrink,
  "covid.who-cares": GrGroup,
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
