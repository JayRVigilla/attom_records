"use client"
import "./page.css";
import { Map } from "../components/Map";
import { CrimeSearchForm } from "../components/Forms/CrimeSearchForm";
import { useEffect, useState } from "react";
import { tCrime } from "../utils/marinCrimeAPI";
import { getFoodInspections } from "../lib/marinFoodInspection";

export default function Home() {
  const [crimes, setCrimes] = useState<tCrime[]>([])

  useEffect(() => {
    const fetchFoodInspections = async() => {
      const data = await getFoodInspections('')
      // console.log('useEffect', data)
    }
    fetchFoodInspections()
  },[])

  return (
    <div className="home root">
      <h1>Lauren Ipsom Realty</h1>
      <CrimeSearchForm setCrimes={setCrimes} />
      <div className="map-container">
        <Map crimes={crimes}/>
      </div>
    </div>
  );
}
