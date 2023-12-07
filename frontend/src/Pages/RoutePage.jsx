import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../slices/profileSlice";
import Spinner from "../components/Spinner";

const RoutePage = () => {
  const stations = [
    "ARTHALA",
    "HINDON RIVER",
    "DILSHAD GARDEN",
    "MOHAN NAGAR",
    "SHAHEED NAGAR",
    "JHILMIL",
    "SHAHEED STHAL(NEW BUS ADDA)",
    "INDERLOK",
    "KANHAIYA NAGAR",
    "SHASTRI NAGAR",
    "MANSAROVAR PARK",
    "KASHMERE GATE",
    "TIS HAZARI",
    "KANHAIYA NAGAR",
    "KESHAVPURAM",
    "NETAJI SUBHASH PLACE",
    "KOHAT ENCLAVE",
    "PITAMPURA",
    "MAJOR MOHIT SHARMA RAJENDRA NAGAR",
    "RAJ BAGH",
    "SHYAM PARK",
    "MANSAROVAR PARK",
    "SHAHADRA",
    "WELCOME",
    "SEELAMPUR",
    "LAL QUILA",
    "JAMA MASJID",
    "DELHI GATE",
    "ITO",
    "MANDI HOUSE",
    "JANPATH",
    "CENTRAL SECRETARIAT",
    "KHAN MARKET",
    "JLN STADIUM",
    "JANGPURA",
    "LAJPAT NAGAR",
    "MOOLCHAND",
    "KAILASH COLONY",
    "NEHRU PLACE",
    "KALKAJI MANDIR",
    "GOVIND PURI",
    "HARKESH NAGAR OKHLA",
    "JASOLA APOLLO",
    "SARITA VIHAR",
    "MOHAN ESTATE",
    "TUGHLAKABAD STATION",
    "BADARPUR BORDER",
    "SARAI",
    "NHPC CHOWK",
    "MEWALA MAHARAJPUR",
    "SECTOR 28",
    "BADKAL MOR",
    "OLD FARIDABAD",
    "NEELAM CHOWK AJRONDA",
    "BATA CHOWK",
    "ESCORTS MUJESAR",
    "SANT SURDAR (SIHI)",
    "RAJA NAHAR SINGH (BALLABHGARH)",
    "JANAK PURI WEST",
    "DABRI MOR - JANAKPURI SOUTH",
    "DASHRATHPURI",
    "PALAM",
    "SADAR BAZAR CANTONMENT",
    "TERMINAL 1-IGI AIRPORT",
    "SHANKAR VIHAR",
    "VASANT VIHAR",
    "MUNIRKA",
    "R.K. PURAM",
    "IIT",
    "HAUZ KHAS",
    "PANCHSHEEL PARK",
    "CHIRAG DELHI",
    "GREATER KAILASH",
    "NEHRU ENCLAVE",
    "KALKAJI MANDIR",
    "OKHLA NSIC",
    "SUKHDEV VIHAR",
    "JAMIA MILIA ISLAMIYA",
    "OKHLA VIHAR",
    "JASOLA VIHAR SHAHEEN BAGH",
    "KALINDI KUNJ",
    "OKHLA BIRD SANCTUARY",
    "BOTANICAL GARDEN",
    "KIRTI NAGAR",
    "SATGURU RAM SINGH MARG",
    "ASHOK PARK MAIN",
    "PUNJABI BAGH",
    "PUNJABI BAGH WEST",
    "SHIVAJI PARK",
    "MADIPUR",
    "PASCHIM VIHAR EAST",
    "PASCHIM VIHAR WEST",
    "PEERAGARHI",
    "UDYOG NAGAR",
    "MAHARAJA SURAJMAL STADIUM",
    "NANGLOI",
    "NANGLOI RAILWAY STATION",
    "RAJDHANI PARK",
    "MUNDKA",
    "MUNDKA INDUSTRIAL AREA (MIA)",
    "GHEVRA METRO STATION",
    "TIKRI KALAN",
    "TIKRI BORDER",
    "PANDIT SHREE RAM SHARMA",
    "BAHADURGARH CITY",
    "NEW DELHI (YELLOW & AIRPORT LINE)",
    "SHIVAJI STADIUM",
    "DHAULA KUAN",
    "DELHI AEROCITY",
    "AIRPORT (T3)",
    "DWARKA SECTOR 21",
    "YASHOBHOOMI DWARKA SECTOR 25",
    "DWARKA SECTOR 8",
    "DWARKA SECTOR 9",
    "DWARKA SECTOR 10",
    "DWARKA SECTOR 11",
    "DWARKA SECTOR 12",
    "DWARKA SECTOR 13",
    "DWARKA SECTOR 14",
    "DWARKA",
    "DWARKA MOR",
    "NAWADA",
    "UTTAM NAGAR WEST",
    "UTTAM NAGAR EAST",
    "JANAK PURI WEST",
    "JANAK PURI EAST",
    "TILAK NAGAR",
    "SUBHASH NAGAR",
    "TAGORE GARDEN",
    "RAJOURI GARDEN",
    "RAMESH NAGAR",
    "MOTI NAGAR",
    "KIRTI NAGAR",
    "SHADIPUR",
    "PATEL NAGAR",
    "RAJENDRA PLACE",
    "KAROL BAGH",
    "JHANDEWALAN",
    "RAMAKRISHNA ASHRAM MARG",
    "RAJIV CHOWK",
    "BARAKHAMBA ROAD",
    "MANDI HOUSE",
    "SUPREME COURT",
    "INDRAPRASTHA",
    "YAMUNA BANK",
    "AKSHARDHAM",
    "MAYUR VIHAR 1",
    "MAYUR VIHAR EXTENSION",
    "NEW ASHOK NAGAR",
    "NOIDA SECTOR 15",
    "NOIDA SECTOR 16",
    "NOIDA SECTOR 18",
    "BOTANICAL GARDEN",
    "GOLF COURSE",
    "NOIDA CITY CENTRE",
    "NOIDA SECTOR 34",
    "NOIDA SECTOR 52",
    "NOIDA SECTOR 61",
    "NOIDA SECTOR 59",
    "NOIDA SECTOR 62",
    "NOIDA ELECTRONIC CITY",
    "YAMUNA BANK",
    "LAXMI NAGAR",
    "NIRMAN VIHAR",
    "PREET VIHAR",
    "KARKARDUMA",
    "ANAND VIHAR ISBT",
    "KAUSHAMBI",
    "VAISHALI",
    "MAJLIS PARK",
    "AZADPUR",
    "SHALIMAR BAGH",
    "NETAJI SUBHASH PALACE",
    "SHAKURPUR",
    "PUNJABI BAGH WEST",
    "ESI BASAIDARAPUR",
    "RAJOURI GARDEN",
    "MAYAPURI",
    "NARAINA VIHAR",
    "DELHI CANTT",
    "DURGABAI DESHMUKH SOUTH CAMPUS",
    "SIR M VISHESHWARAIAH MOTI BAGH",
    "BHIKAJI CAMA PLACE",
    "SAROJINI NAGAR",
    "DILLI HAAT INA",
    "SOUTH EXTENSION",
    "LAJPAT NAGAR",
    "VINOBAPURI",
    "ASHRAM",
    "SARAI KALE KHAN NIZAMUDDIN",
    "MAYUR VIHAR 1",
    "MAYUR VIHAR POCKET 1",
    "TRILOKPURI SANJAY LAKE",
    "EAST VINOD NAGAR MAYUR VIHAR 2",
    "MANDAWALI WEST VINOD NAGAR",
    "IP EXTENSION",
    "ANAND VIHAR ISBT",
    "KARKARDUMA",
    "KARKARDUMA COURT",
    "KRISHNA NAGAR",
    "EAST AZAD NAGAR",
    "WELCOME",
    "JAFRABAD",
    "MAUJPUR BABARPUR",
    "GOKULPURI",
    "KOHRI ENCLAVE",
    "SHIV VIHAR",
    "ROHINI SECTOR 18 19",
    "HAIDERPUR BADLI MOR",
    "JAHANGIRPURI",
    "ADARSH NAGAR",
    "AZADPUR",
    "MODEL TOWN",
    "GURU TEG BAHADUR NAGAR",
    "VISHWAVIDYALAYA",
    "VIDHAN SABHA",
    "CIVIL LINES",
    "KASHMERE GATE",
    "CHANDNI CHOWK",
    "CHAWRI BAZAR",
    "NEW DELHI",
    "RAJIV CHOWK",
    "PATEL CHOWK",
    "CENTRAL SECRETARIAT",
    "UDYOG BHAWAN",
    "LOK KALYAN MARG",
    "JOR BAGH",
    "DILLI HAAT INA",
    "AIIMS",
    "GREEN PARK",
    "HAUZ KHAS",
    "MALVIYA NAGAR",
    "SAKET",
    "QUTAB MINAR",
    "CHHATARPUR",
    "SULTANPUR",
    "GHITORNI",
    "ARJAN GARH",
    "GURU DRONACHARYA",
    "SIKANDERPUR",
    "MG ROAD",
    "IFFCO CHOWK",
    "MILLENIUM CITY CENTRE GURUGRAM",
    "DWARKA",
    "NANGLI",
    "NAJFGARH",
    "DHANSA BUS STAND",
    "SECTOR 55 56",
    "SECTOR 54 CHOWK",
    "SECTOR 53 54",
    "SECTOR 42 43",
    "PHASE 1",
    "SIKANDERPUR",
    "PHASE 2",
    "BELVEDERE TOWERS",
    "CYBER CITY",
    "MOULSARI AVENUE",
    "PHASE 3",
  ];
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState([]);
  const [totalStations, setTotalStations] = useState("");
  const [interchange, setInterchange] = useState([]);
  const [time, setTime] = useState("");
  // const [fair, setFair] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  // const loading = useSelector((state) => state.auth.loading);
  // const dispatch = useDispatch();
  // setLoading;

  const currentTheme = useSelector((state) => state.theme.mode);

  const handleFindroute = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://metromate-ixmd.onrender.com/api/v1/stations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            source: source,
            destination: destination,
          }),
        }
      );

      const result = await response.json();
      //console.log(result);
      setLoading(false);
      if (result.success) {
        setRoute(result?.route?.path);
        setTotalStations(result?.route?.stations);
        setTime(result?.route?.time);
        setInterchange(result?.route?.interchanges);
        //console.log(route);
        //console.log(result);
      } else {
        //console.log(result.message);
        //console.log(result.error);
        // toast.error(result.message);
      }
    } catch (err) {
      //console.log("error during finding the route.", err);
      toast.error(err.message);
    }
  };

  const backgroundColor = (line) => {
    if (line === "RED") {
      return "bg-RED";
    } else if (line === "VIOLET") {
      return "bg-VIOLET";
    } else if (line === "MAGENTA") {
      return "bg-MAGENTA";
    } else if (line === "GREEN") {
      return "bg-GREEN";
    } else if (line === "ORANGE") {
      return "bg-ORANGE";
    } else if (line === "BLUE") {
      return "bg-BLUE";
    } else if (line === "PINK") {
      return "bg-PINK";
    } else if (line === "YELLOW") {
      return "bg-YELLOW";
    } else if (line === "GREY") {
      return "bg-GREY";
    } else if (line === "RAPID") {
      return "bg-RAPID";
    } else if (line === "BLUE 2") {
      return "bg-BLUE-2"; // Note: Updated class name to a valid CSS class
    }
    return "bg-cyan-400";
  };

  return (
    <div className={`${currentTheme === "light" ? "light" : "dark"}`}>
      <div className="bg-white dark:bg-slate-950 px-6 lg-px-8 min-h-[80vh] pb-10">
        <div className=" grid pt-[100px] grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col  py-6 rounded-lg">
            <div className="max-w-[500px] w-[98%] sm:w-[95%]  mx-auto">
              <h1 className="block mb-2 text-xl font-semibold dark:text-gray-50 text-gray-700">
                Source
              </h1>
              <input
                className="block px-3 mx-auto w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                placeholder="Source"
                required
                name="source"
                list="suggestions"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              />
              <datalist id="suggestions">
                {stations.map((station, index) => {
                  return <option value={station} key={index} />;
                })}
              </datalist>
            </div>
            <div className="max-w-[500px] w-[98%] sm:w-[95%] mx-auto">
              <h1 className="block mt-3 mb-2 dark:text-gray-50 text-xl font-semibold text-gray-700">
                Destination
              </h1>
              <input
                className="block px-3   mx-auto w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                type="text"
                placeholder="Destination"
                required
                name="destination"
                list="suggestions"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
              <datalist id="suggestions">
                {stations.map((station, index) => {
                  return <option value={station} key={index} />;
                })}
              </datalist>
            </div>
            <button
              onClick={handleFindroute}
              className="rounded-md mt-4 w-fit mx-auto bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Find Route
            </button>
          </div>

          <div>
            {loading ? (
              <div className="sm:h-[400px] h-[200px] flex items-center justify-center">
                <Spinner width={"100%"} height={"50vh"} />
              </div>
            ) : (
              route.length > 0 && (
                <div className=" px-2">
                  <div>
                    <p className="text-xl dark:text-gray-50 font-semibold text-gray-700">
                      Total Stations:{" "}
                      <span className="font-bold">{totalStations}</span>
                    </p>
                    <details className="mb-4">
                      <summary className="text-xl mt-2 font-semibold dark:text-gray-50 text-gray-700 cursor-pointer">
                        Interchanges:{" "}
                        <span className="font-bold">
                          {interchange.length > 0 && interchange.length}
                        </span>
                      </summary>
                      <p className="">
                        {interchange.length > 0 ? (
                          interchange.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className={`border-[1px] px-2 rounded py-1 dark:border-gray-50 dark:text-gray-50 border-gray-500 my-1 flex items-center justify-between`}
                              >
                                <h1>{item.station}</h1>
                                <h2
                                  className={`${backgroundColor(item?.line)} px-2 py-1 rounded text-slate-950 font-bold`}
                                >
                                  {item.line}
                                </h2>
                              </div>
                            );
                          })
                        ) : (
                          <h1>No interchange</h1>
                        )}
                      </p>
                    </details>
                    <p className="text-xl font-semibold dark:text-gray-50 text-gray-700">
                      Time: <span className="font-bold">{time} </span>min
                    </p>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-50">
                      Route
                    </h1>
                    {route.map((item, index) => {
                      return (
                        <div
                          className={`my-1  overflow-hidden rounded-lg px-3 py-1 flex border-[1px] dark:border-gray-50 border-gray-500 dark:text-gray-50 justify-between items-center `}
                          key={index}
                        >
                          <div>{item.station}</div>
                          {item?.line && (
                            <div
                              className={`${backgroundColor(
                                item?.line
                              )} px-3 text-slate-950 font-bold py-1 rounded-lg text-sm`}
                            >
                              {item?.line && item?.line}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePage;
