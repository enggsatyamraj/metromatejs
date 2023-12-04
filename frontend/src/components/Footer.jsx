import React from "react";
import {
  AiOutlineMail,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillInstagram,
  AiFillGithub,
} from "react-icons/ai";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white py-12 px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="col-span-2">
          <h2 className="text-3xl font-bold mb-4">Discover Metro Mate</h2>
          <p className="text-sm mb-2">
            Navigate the city with ease using Metro Mate, your dynamic urban
            companion. Experience a new way of commuting that adapts to your
            lifestyle.
          </p>
          <p className="text-sm">
            Embark on a journey with Metro Mate and explore the heartbeat of the
            city.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/routes" className="hover:text-gray-400">
                Routes
              </Link>
            </li>
            <li>
              <Link to="/history" className="hover:text-gray-400">
                History
              </Link>
            </li>
            <li>
              <Link to="/helpandcontact" className="hover:text-gray-400">
                Help & Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <Link
              to="https://twitter.com/SatyamRaj961686"
              target="_blank"
              className="hover:text-gray-400"
            >
              <AiFillTwitterCircle className="w-6 h-6" />
            </Link>

            <Link
              to="https://instagram.com/satyam_raj_6278?igshid=OGQ5ZDc2ODk2ZA=="
              target="_blank"
              className="hover:text-gray-400"
            >
              <AiFillInstagram className="w-6 h-6" />
            </Link>
            <Link
              to="https://github.com/Satyaaam"
              target="_blank"
              className="hover:text-gray-400"
            >
              <AiFillGithub className="w-6 h-6" />
            </Link>
          </div>
        </div>
        {/* <div>
          <h3 className="text-xl font-bold mb-4">
            Visit My Github Pofile
          </h3>
          <form className="flex items-center">
            <input
              type="email"
              placeholder="Your email"
              className="bg-gray-800 text-white px-3 py-2 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="bg-indigo-700 text-white px-4 py-2 rounded-r-md hover:bg-indigo-600 focus:outline-none"
            >
              Subscribe
            </button>
          </form>
          <Link to="https://github.com/Satyaaam"></Link>
        </div> */}
        <li>
          <p className="text-sm">
            <strong>Licensing:</strong>{" "}
            <a
              href="https://creativecommons.org/licenses/by-nc/4.0/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              CC BY-NC 4.0
            </a>
          </p>
        </li>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-4 text-center">
        <p className="text-sm">&copy; 2023 Metro Mate. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
