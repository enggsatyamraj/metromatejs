import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";

import metro_image from "../assets/metro_image.jpg";
import { useSelector } from "react-redux";

const features = [
  {
    name: "Dynamic Route Mastery:",
    description:
      "Seamlessly blend technology and transit with real-time, dynamic route planning. Metro Mate adapts to your schedule, ensuring you conquer the city with precision.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Smart Mapping Technology:",
    description:
      "Immerse yourself in the urban landscape using our intelligent maps. Pinpoint stations, discover hidden gems, and sculpt your route with precision and ease.",
    icon: LockClosedIcon,
  },
  {
    name: "Alert Intelligence:",
    description:
      "Stay ahead of the game with intelligent service alerts. Metro Mate keeps you in the loop, empowering you to make informed decisions on the go.",
    icon: ServerIcon,
  },
];

const Feature = () => {
  const currentTheme = useSelector((state) => state.theme.mode);
  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"}`}>
      <div className="overflow-hidden dark:bg-slate-950 dark:text-gray-50 bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-500">
                  Key Features
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-50">
                  Smart routes, maps, alerts—effortless commuting
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-100">
                  Unlock a seamless urban journey with Metro Mate, featuring
                  dynamic route mastery, intelligent mapping, alert
                  intelligence, and an intuitive interface.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9">
                      <div className="inline font-semibold text-gray-900 dark:text-gray-50">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </div>{" "}
                      <div className="inline dark:text-gray-100 opacity-70">{feature.description}</div>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
            <img
              src={metro_image}
              alt="Product screenshot"
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
              width={2432}
              height={1442}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
