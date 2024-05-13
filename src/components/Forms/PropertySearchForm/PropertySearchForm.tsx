/** PropertySearchForm documentation
 */
"use client"
import {useCallback, useState, Dispatch} from 'react'
import "./styles.css";
import { TextInput } from '../../TextInput';
import { Button } from '../../Button';
import { getLongLatFromAddress } from '@/src/lib/positionstack';
import { tCoordsObject } from '@/src/constants';

export interface iPropertySearchFormProps {
  "data-test-id"?: string;
  setLocationLatLong: Dispatch<tCoordsObject>;

}

export const PropertySearchForm = ({setLocationLatLong}: iPropertySearchFormProps) => {
  // * state
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const clearForm = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if(!address && !city && !state)return
    setAddress("")
    setCity("")
    setState("")
  }

  const submitSearch = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if(!address && !city && !state)return
    const data = await getLongLatFromAddress({ address, city, state })
    if(data) setLocationLatLong(data)
  }, [address, city, state])

  return (
    <form className='property-search-form'>

    <TextInput value={address} placeholder='' setValue={setAddress} label="address" />

    <span className='input-group'>
      <TextInput value={city } placeholder='' setValue={setCity } label="city" />
      <TextInput value={state } placeholder='' setValue={setState } label="state" />
    </span>

    <div className='action-buttons'>

      <Button
        label='Search'
        onClick={(event)=>submitSearch(event)}
      />
      <Button
        label='Clear'
        onClick={(event)=>clearForm(event)}
      />
    </div>
  </form>
  );
};
