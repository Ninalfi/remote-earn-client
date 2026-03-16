import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import Swal from "sweetalert2";
import { VscSendToRemoteAgent } from "react-icons/vsc";

import bannerbg from "/assets/bg-slider.jpg";
import coin from "/assets/coin.png";
import user1 from "/assets/user2.jpg";
import { AuthContext } from "../../Context/AuthContext";

const Nav = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged out successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Logout failed",
        text: err.message || "Something went wrong",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const navLinkClass = ({ isActive }) =>
    `font-medium transition-colors duration-200 ${
      isActive ? "text-accent" : "text-base-content hover:text-accent"
    }`;

  const getDashboardRoute = () => {
    if (!user?.role) return "/dashboard";

    const routes = {
      Worker: "/dashboard/workerhome",
      Buyer: "/dashboard/buyerhome",
      Admin: "/dashboard/adminhome",
    };

    return routes[user.role] || "/dashboard";
  };

  const guestNavItems = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/terms" className={navLinkClass}>
          Terms
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq" className={navLinkClass}>
          FAQs
        </NavLink>
      </li>
    </>
  );

  const userNavItems = (
    <>
      <li>
        <NavLink to={getDashboardRoute()} className={navLinkClass}>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className={navLinkClass}>
          About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navLinkClass}>
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/terms" className={navLinkClass}>
          Terms
        </NavLink>
      </li>
      <li>
        <NavLink to="/faq" className={navLinkClass}>
          FAQs
        </NavLink>
      </li>
    </>
  );

  return (
    <header
      style={{ backgroundImage: `url(${bannerbg})` }}
      className="sticky top-0 z-50 border-b border-white/10 bg-base-100/85 backdrop-blur-md bg-cover bg-center"
    >
      <div className="navbar w-11/12 max-w-7xl mx-auto py-3">
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-base-content"
          >
            <VscSendToRemoteAgent className="text-accent text-3xl" />
            <span>RemoteEarn</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {user ? userNavItems : guestNavItems}
          </ul>
        </div>

        <div className="navbar-end hidden lg:flex items-center gap-4">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-base-200 px-3 py-2">
                  <img
                    src={coin}
                    alt="Coin"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-base-content">
                    {user?.coin ?? 10}
                  </span>
                </div>

                <div
                  className="tooltip tooltip-bottom"
                  data-tip={user?.displayName || "User"}
                >
                  <div className="avatar">
                    <div className="h-11 w-11 rounded-full ring ring-accent ring-offset-2 ring-offset-base-100">
                      <img
                        src={user?.photoURL || user?.photo || user1}
                        alt="User profile"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="btn btn-neutral rounded-full px-6"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">
                <button className="btn btn-accent rounded-full px-6 text-white">
                  Login / Register
                </button>
              </NavLink>

              <a
                href="https://github.com/Ninalfi/remote-earn-client"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline rounded-full px-6"
              >
                Join as Developer
              </a>
            </>
          )}
        </div>

        <div className="navbar-end lg:hidden">
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-72 rounded-2xl border border-base-300 bg-base-100 p-4 shadow-xl space-y-1 z-[100]"
            >
              {user ? (
                <>
                  <li className="mb-3">
                    <div className="flex items-center gap-3 rounded-xl bg-base-200 p-3">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img
                            src={user?.photoURL || user?.photo || user1}
                            alt="User profile"
                            className="object-cover"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="font-semibold text-base-content">
                          {user?.displayName || "User"}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-base-content/70">
                          <img
                            src={coin}
                            alt="Coin"
                            className="h-5 w-5 rounded-full object-cover"
                          />
                          <span>{user?.coin ?? 10} Coins</span>
                        </div>
                      </div>
                    </div>
                  </li>

                  {userNavItems}

                  <li className="pt-2">
                    <button
                      onClick={handleLogout}
                      className="btn btn-neutral w-full rounded-full"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  {guestNavItems}

                  <li className="pt-2">
                    <NavLink to="/login" className="w-full">
                      <button className="btn btn-accent w-full rounded-full text-white">
                        Login / Register
                      </button>
                    </NavLink>
                  </li>

                  <li>
                    <a
                      href="https://github.com/Ninalfi/remote-earn-client"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-base-content hover:text-accent"
                    >
                      Join as Developer
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Nav;