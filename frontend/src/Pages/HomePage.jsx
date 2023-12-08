import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Feature from "../components/Feature";
import AnotherFeature from "../components/AnotherFeature";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentTheme = useSelector((state) => state.theme.mode);
  const token = useSelector((state)=>state.auth.token);

  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"}`}>
      <div className="bg-white dark:bg-slate-950 dark:text-gray-50">
        <div className=" isolate px-6 lg:px-8">
          <div
            className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
          <div className="mx-auto max-w-2xl py-32 ">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-center w-[90%] text-gray-600 dark:text-gray-100 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                Unlock Effortless Urban Exploration with the Ultimate Commuting
                Companion{" "}
                <Link
                  to={token ? "/routes" : "/login"}
                  className="font-semibold text-indigo-600 dark:text-indigo-500"
                >
                  <span className="absolute inset-0" aria-hidden="true" />
                  See Routes <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight dark:text-gray-50 text-gray-900 sm:text-6xl">
                Metro Mate: Beyond Tracks - Navigate, Connect, Conquer
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-100 opacity-80">
                Welcome to Metro Mate, where the city is your canvas, and
                commuting becomes an art. Elevate your metro experience with a
                platform that goes beyond tracks, offering a symphony of
                features to transform your daily journeys.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to={token ? "/routes" : "/login"}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  See Routes
                </Link>
                <Link
                  to={token ? "/routes" : "/login"}
                  className="text-sm dark:text-gray-100 font-semibold leading-6 text-gray-900"
                >
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            aria-hidden="true"
          >
            <div
              className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
            />
          </div>
        </div>
        <Feature />
        <AnotherFeature />
      </div>
    </div>
  );
}
