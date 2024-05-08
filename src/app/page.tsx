"use client"
import "./page.css";
import { Map } from "../components/Map";
import { CrimeSearchForm } from "../components/Forms/CrimeSearchForm";
import { useEffect, useState } from "react";
import { tCrime } from "../utils/marinAPI/marinCrimeAPI";
import { getFoodInspections } from "../lib/marinFoodInspection";
import { iFoodInspectionMarker } from "../components/Map/Marker/types";
import { PropertySearchForm } from "../components/Forms/PropertySearchForm";
import { homeCords } from "../constants";
import { subDays } from 'date-fns';


export default function Home() {
  const [crimes, setCrimes] = useState<tCrime[]>([])
  const [foodInspections, setFoodInspections] = useState<iFoodInspectionMarker[]>([])

  useEffect(() => {
    const min = subDays(Date.now(), 60).toISOString().slice(0, -1)
    const max = new Date(Date.now()).toISOString().slice(0, -1)

    const fetchFoodInspections = async() => {
      const data = await getFoodInspections({
        dateRange: [min, max],
        focalLatLong: [homeCords.lat, homeCords.lon]
      })
      if(data) setFoodInspections(data)
    }
    if (crimes.length) fetchFoodInspections()
  },[crimes])

  return (
    <div className="home root">
      <h1>Lauren Ipsom Realty</h1>
      <CrimeSearchForm setCrimes={setCrimes} />
      <PropertySearchForm />
      <div className="map-container">

        <Map
          crimes={crimes}
          foodInspections={foodInspections}
        />

      </div>
    </div>
  );
}
