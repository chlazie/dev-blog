"use client";
import Link from "next/link";
import React from "react";
import ThemeChanger from "./ThemeChanger";

export default function () {
  // mobile menu logic for toggle open and close
  const mobileMenu = () => {
    const menu = document.getElementById("menu");
    if (menu?.classList.contains("hidden")) {
      menu.classList.remove("hidden");
    } else {
      menu?.classList.add("hidden");
    }
  };
  return (
    <header className="flex items-center justify-between border-b-2 py-4 px-16 sm:px-5 md:px-7  bg-background text-foreground dark:bg-card dark:text-card-foreground">
      <div className="flex items-center justify-center">
        <Link
          href="/"
          className="flex items-center justify-center self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <h1 className="light:text-black">DEV</h1>
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-400 rounded-lg text-white">
            Hood
          </span>
        </Link>
      </div>

      {/* Desktop menu */}
      <nav className="hidden md:flex items-center justify-center gap-12">
        <form action="" className="flex gap-5 items-center justify-center">
          <input
            type="search"
            name="search"
            id="searchId"
            placeholder="Search for posts"
            className="md:hidden lg:inline"
          />
        </form>

        <ul className="flex items-center gap-[3rem] ">
          <Link
            href="/"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1000"
            className="cursor-[pointer] text-[20px] font-bold text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Home
          </Link>
          <Link
            href="/about"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
            className="cursor-[pointer] text-[20px] font-bold text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            About
          </Link>

          <Link
            href="/write"
            onClick={mobileMenu}
            className="cursor-[pointer] text-[20px] font-bold text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Write
          </Link>

          <Link
            href="/community"
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="2000"
            className="cursor-[pointer] text-[20px] font-bold text-base tracking-wider transition-colors hover:text-gray-300 z-colors z-50"
          >
            Community
          </Link>
        </ul>

        <ThemeChanger/>
      </nav>
      <div className="flex gap-6 items-center justify-center">
        <button className="hidden md:block text-white font-semi-bold  transition-all duration-500 hover:text-white cursor-pointer z-50">
          Log In
        </button>
        <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium border-none transition-all duration-500 hover:bg-white cursor-pointer z-50">
          <Link href="/sign-in">Sign In</Link>
        </button>
      </div>

      {/* Hamburger menu for Mobile Screens */}
      <button onClick={mobileMenu} className="md:hidden p-2 z-50">
        {/* <Menu color={'white'} size={"30px"} /> */}
        Menu
      </button>

      {/* Mobile menu - Hidden side bar */}
      <div
        id="menu"
        className="hidden fixed top-16 bottom-0 right-0 left-0 p-5 md:hidden z-40 bg-black bg-opacity-70 backdrop-blur-md"
      >
        <nav className="flex flex-col gap-6 place-items-center">
          <Link
            href="/"
            onClick={mobileMenu}
            className="text-[white] cursor-[pointer] text-[20px] font-bold text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={mobileMenu}
            className="text-[white] cursor-[pointer] text-[20px] font-bold text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            About
          </Link>

          <Link
            href="/write"
            onClick={mobileMenu}
            className="text-[white] cursor-[pointer] text-[20px] font-bold text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Write
          </Link>
          <Link
            href="/community"
            onClick={mobileMenu}
            className="text-[white] cursor-[pointer] text-[20px] font-bold text-base tracking-wider transition-colors hover:text-gray-300 z-50"
          >
            Community
          </Link>
        </nav>
      </div>
    </header>
  );
}
