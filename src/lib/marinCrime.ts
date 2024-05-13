import { dateRangeClean, iBetweenProps, whereString } from "../utils/marinAPI";
import { MARIN_CRIME_BASE_URL, tCrime } from "../utils/marinAPI/marinCrimeAPI";
import { calcMaxMinLatLong } from "../utils";
import { iCrimeLocationMarker } from "../components/Map/Marker/types";


export type tCrimeQueries = {
  crime?: string;
  crime_class?: string;
  incident_city_town?: string;
  incident_city_town_mapping?: string;
  $where?: string;
  dateRange: [string, string]; // [MinISOString, MaxISOString]
  // focalLatLong: [string, string]; // [lat,long] float strings
  focalLatLong: [number, number]; // [lat,long] float strings
}

export const getCrimes = async (queries: tCrimeQueries) => {
  try {
    const {dateRange, focalLatLong} = queries

    const qStrings: string[] = []

    const dateProps: iBetweenProps = {
      max: dateRangeClean(dateRange[1]),
      min: dateRangeClean(dateRange[0]),
      param: "incident_date_time",
    }

    const maxMinLatLong = calcMaxMinLatLong({
      lat:focalLatLong[0],
      lon:focalLatLong[1],
    })

    const latProps: iBetweenProps = {
      max: maxMinLatLong.max[0].toString(),
      min: maxMinLatLong.min[0].toString(),
      param: "latitude",
    }

    const longProps: iBetweenProps = {
      max: maxMinLatLong.max[1].toString(),
      min: maxMinLatLong.min[1].toString(),
      param: "longitude",
    }

    qStrings.push(whereString.betweenISOStrings(dateProps))

    const props = [latProps, longProps]
    props.forEach(prop => {
      qStrings.push(whereString.betweenNums(prop))
    })

    const selects = [
      "longitude",
      "latitude",
      "incident_street_address",
      "incident_city_town",
      "crime",
      "incident_date_time"
    ]

    const url = `${MARIN_CRIME_BASE_URL}?$select=${selects.join(", ")}&$where=${qStrings.join(" AND ")}`

    const data: Promise<iCrimeLocationMarker[]> = fetch(url)
    .then(response => response.json())
      .then(result => {
        const crimes: iCrimeLocationMarker[] = []
        result.forEach((d: tCrime) => {
          crimes.push(
            {
              type: "crime",
              ...d,
              longitude: parseFloat(d.longitude!),
              latitude: parseFloat(d.latitude!)
            }
          )

      })

      // return result
      return crimes
    })

    // console.log("crimes", data)
    // data.forEach(d => {
    //   data.longitude = parseFloat(data.longitude)
    //   data.latitude = parseFloat(data.latitude)
    // })
    return data
  } catch (error) {
    console.error(`ERROR getCrimes(${queries}): ${error}`)
  }
}