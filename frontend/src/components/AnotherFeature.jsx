import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

const features = [
  {
    name: "Efficiency Unleashed:",
    description:
      "Experience a commute that flows seamlessly, tailored to your preferences and lifestyle.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Reliability Redefined:",
    description:
      "Rely on Metro Mate's accuracy to navigate urban intricacies, ensuring every journey is a success.",
    icon: LockClosedIcon,
  },
  {
    name: "Community-Driven Synergy:",
    description:
      "Join a thriving community of Metro Mates, sharing insights and creating a collective urban intelligence.",
    icon: ArrowPathIcon,
  },
  {
    name: "Embark on Your Odyssey:",
    description:
      "Dive into a world of urban exploration with Metro Mate. Transform your daily commute into an exciting journey, connecting you with the heartbeat of the city.",
    icon: FingerPrintIcon,
  },
];

export default function AnotherFeature() {
  const currentTheme = useSelector((state) => state.theme.mode);
  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"}`}>
      <div className="bg-white dark:text-gray-50 dark:bg-slate-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">
              Why Metro Mate Stands Out:
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
              Unparalleled Distinction: What Sets Metro Mate Apart
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-100 opacity-80">
              Amidst the crowded landscape of commuting solutions, Metro Mate
              distinguishes itself through a harmonious blend of dynamic route
              mastery, intelligent mapping technology, proactive alert
              intelligence, and an intuitively crafted user interface, creating
              a seamless and personalized urban journey that stands as a beacon
              of innovation and efficiency in the realm of metropolitan
              navigation.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-16">
                  <div className="text-base dark:text-gray-50 font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                  </div>
                  <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-100 opacity-80">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
