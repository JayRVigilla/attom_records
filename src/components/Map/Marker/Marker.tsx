/** Marker documentation
 */

import { LocalDiningOutlined, LocalPolice, RestaurantOutlined } from "@mui/icons-material";
import { Marker, Popup } from 'react-leaflet'
import { renderToStaticMarkup } from "react-dom/server";
import startCase from "lodash/startCase"
import { CRIME_ABBREVIATION_TO_DESCRIPTION, TOWN_ABBREVIATION_TO_NAME } from "@/src/utils/marinCrimeAPI";
import { DivIcon } from "leaflet";
import "./styles.css"
import { iCrimeLocationMarker, iFoodInspectionMarker } from "./types";

export interface iMarkerProps {
"data-test-id"?: string;
}

/**
 * TODO:
 * - CrimeMarker goes Navy
 * - CommuteMarker - change color as the time increases, stop light colors
 * - InspectionMarker - find Icon for Restaurant Health
 * - EMSMarker - Red Hospital Cross on a white field
 * - ParkRangerMarker -
 */

export const CrimeMarker = ({ longitude, latitude, incident_street_address, incident_city_town, crime, incident_date_time }: iCrimeLocationMarker) => {

  const crimeMarkerIcon = new DivIcon({
    html: renderToStaticMarkup(<LocalPolice/>),
    iconSize: [14, 14],
    className: "marker-icon-crime"
    });


  return (
    <Marker
      icon={crimeMarkerIcon}
      position={[parseFloat(latitude), parseFloat(longitude)]}>
      <Popup>
          {CRIME_ABBREVIATION_TO_DESCRIPTION[crime] ?
            startCase(CRIME_ABBREVIATION_TO_DESCRIPTION[crime].toLowerCase()) :
            startCase(crime.toLowerCase())}
          <br />
          {incident_date_time ? new Date(incident_date_time).toLocaleString() : "No Timestamp"}
          <br />
          {startCase(incident_street_address.toLowerCase())}, {TOWN_ABBREVIATION_TO_NAME[incident_city_town] ?
            startCase(TOWN_ABBREVIATION_TO_NAME[incident_city_town].toLowerCase()) :
            startCase(incident_city_town.toLowerCase())}
      </Popup>
    </Marker>
  )
}
export const RestaurantMarker = ({
  // business_city,
  // inspection_results,
business_name,
formatted_address,
latitude,
longitude,
inspection_date,
inspection_type,
inspector,
inspector_comments,
inspector_freqeuncy,
inspection_description,
is_major_violation,
correct_by_date,
corrected_on_site,
violation_description,
// violation_code,
placard
 }: iFoodInspectionMarker) => {

  const markerIcon = (placard: string): DivIcon => {
    return (new DivIcon({
    html: renderToStaticMarkup(<LocalDiningOutlined/>),
    iconSize: [14, 14],
    className: `marker-icon-health-inspection ${placard.toLowerCase()}`
    }))};


  return (
    <Marker
      icon={markerIcon(placard)}
      position={[parseFloat(latitude), parseFloat(longitude)]}>
      <Popup>
        {startCase(business_name?.toLowerCase())}
        <br />
        {startCase(formatted_address.toLowerCase()) }
        <hr />
        Inspected by {startCase(inspector.toLowerCase())}
        <br />
        {inspection_type}({is_major_violation ? "Major violation" : "Not a major violation"}): {inspection_date} - {inspector_freqeuncy}
        Correct by: {correct_by_date}
        <br />
        {inspection_description}: {violation_description}
        Corrected on site? {corrected_on_site}
        {inspector_comments}

        <br />
      </Popup>
    </Marker>
  )
}