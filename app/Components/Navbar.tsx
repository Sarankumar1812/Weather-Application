"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContextUpdate } from "../context/globalContext";
import { MapPin } from "lucide-react"; 
import { github } from "../utils/Icons";

function Navbar() {
  const router = useRouter();
  const { setActiveCityCoords } = useGlobalContextUpdate(); 
  const handleLiveLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setActiveCityCoords([latitude, longitude]); 
        },
        (error) => {
          console.error("Error getting location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="w-full py-4 flex items-center justify-between">
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className="live-location-btn flex items-center gap-2"
            onClick={handleLiveLocationClick}
          >
            
            <MapPin className="icon" /> 
            Live Location
          </Button>

          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={() => {
              router.push("https://github.com/Sarankumar1812/Weather-Application");
            }}
          >
            {github} Source Code
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
