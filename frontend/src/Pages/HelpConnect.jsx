import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { useSelector } from "react-redux";

const HelpConnect = () => {
  const contactArray = [
    {
      title: "DMRC 24x7 Helpline",
      Number: "155370(This call is chargeable as per calling party pay basis)",
      Email: "helpline@dmrc.org",
    },
    {
      title:
        "DMRC Missing, Separated, Women, Child and Specially Abled Commuters Helpline",
      Landline: "011-23415480",
      Mobile: "8800550490",
    },
    {
      title: "CISF Unit DMRC 24x7 Helpline",
      Number: "155655",
      Email: "dmrc-delhi@cisf.gov.in",
    },
    {
      title: "Delhi PoliceControl Room",
      Number: "112",
      Email: "delpol.service@delhipolice.gov.in",
    },
    {
      title: "Emergency Response Support System",
      Number: "112",
    },
    {
      title: "Delhi Police Unit Delhi Metro",
      Number: "1511",
      Email: "delpol.service@delhipolice.gov.in",
      AlternativeEmail: "metrocontrolroom2020@gmail.com",
    },
    {
      title: "Women Helpline",
      Number: "1091",
      Email: "complaintcell-ncw@nic.in",
    },
    {
      title: "Senior Citizen Helpline",
      Number: "1091, 1291",
      Email: "delpol.service@delhipolice.gov.in",
    },
    {
      title: "NationalCyberCrimeReportingPortal",
      Number: "1930",
      Website: "www.cybercrime.gov.in",
    },
  ];

  const currentTheme = useSelector((state)=>state.theme.mode);

  // title, Number,Email, Website,AlternativeEmail, Landline, Mobile

  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"}`}>
      <div className="pt-[100px] dark:bg-slate-950 pb-10 dark:text-gray-50 min-h-[80vh] px-6 lg:px-8">
        <h1 className="text-3xl font-semibold dark:text-gray-50 text-gray-700">
          -----Help And Contact
        </h1>
        <p className="text-2xl text-gray-700 dark:text-gray-50 font-semibold mt-4">
          Important Contacts and Helpline Number
        </p>

        <div className="grid grid-cols-1 mt-4 mb-5 sm:grid-cols-2 gap-4 lg:grid-cols-3">
          {contactArray.map((item, index) => {
            return (
              <div
                className="border-[1.5px] shadow-lg dark:shadow-gray-700 cursor-pointer dark:border-gray-50 border-indigo-400 lg:max-w-[400px] px-4 py-4 rounded-lg "
                key={index}
              >
                <h1 className="text-sm font-bold mb-2 dark:text-gray-50 text-gray-800">
                  {item?.title && item?.title}
                </h1>
                {item?.Number && (
                  <p className="flex gap-2 opacity-85 items-center">
                    <FaPhoneAlt /> {item?.Number}
                  </p>
                )}
                {item?.Landline && (
                  <p className="flex gap-2 opacity-85 items-center">
                    <FaPhoneAlt /> {item?.Landline}
                  </p>
                )}
                {item?.Mobile && (
                  <p className="flex gap-2 opacity-85 items-center">
                    <FaPhoneAlt /> {item?.Mobile}
                  </p>
                )}
                {item?.Email && (
                  <p className="flex gap-2 opacity-85 items-center">
                    <MdEmail /> {item?.Email}
                  </p>
                )}
                {item?.Website && (
                  <p className="flex gap-2 opacity-85 items-center">
                    {" "}
                    <CgWebsite /> {item?.Website}{" "}
                  </p>
                )}
                {item?.AlternativeEmail && (
                  <p className="flex gap-2 opacity-85 items-center">
                    {" "}
                    <CgWebsite /> {item?.AlternativeEmail}{" "}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HelpConnect;
