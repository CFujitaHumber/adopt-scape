/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 */
"use client";
import style from './component.module.css';
import { Button } from "react-bootstrap";
import { Dispatch, SetStateAction, ChangeEvent} from "react";
import themeDectector from '../ThemeDetector/themeDetector';
import { Theme } from '@/app/page';

type props = {
    readonly name: string;
    readonly min: number;
    readonly max: number;
    value: number;
    setValue: Dispatch<SetStateAction<number>>; 
}

//style
const containerStyle = {
  display: "inline-flex",
  alignItems: "stretch",
  alignContent: "space-between",
};

const buttonStyle = {
  display: "flex",
  FlexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  border: "0px",

  // Shared font styles
  fontWeight: 400,
  TextAlign: "center",
  textOverflow: "ellipsis",
  lineHeight: "24px",
  fontSize: "16px",
};

const rightStyle = {
  borderTopLeftRadius: "100px",
  borderBottomLeftRadius: "100px",
};

const leftStyle = {
  borderTopRightRadius: "100px",
  borderBottomRightRadius: "100px",
};

const nameStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "10px",
  padding: "0px 12px",
};

const inputStyle = {
  border: "none",
  backgroundColor: "inherit",
  display: "flex",
  flexShrink: 3,
  maxWidth: "4rem",
  padding: "0px 12px",

  // Shared font styles
  fontWeight: 400,
  TextAlign: "center",
  textOverflow: "ellipsis",
  lineHeight: "24px",
  fontSize: "16px",
};


export default function Increment({name, min, max, value, setValue}: props){
    //validate range
    if(min > max){
        throw Error(`Minimum Value cannot be larger than max value. Min: ${min} Max: ${max}`);
    }
    
    const increase = () => value+1 <= max ? setValue(++value) : null;
    const decrease = () => value-1 >= min ? setValue(--value) : null;

    return (<div style={{...containerStyle}}>
        <Button
        style={{...buttonStyle, ...rightStyle}}
        aria-labelledby={`increment-${name}`} onClick={decrease}>-</Button>
        
        <label 
        style={{...nameStyle}}
        className={` ${ themeDectector() == Theme.Dark ? "bg-light" : "bg-dark" }`} >
            {name}
             <input 
            style={{...inputStyle}}

            min={min} 
            max={max}
              type="number" 
              value={value} 
              onChange={(e) =>( e.target.valueAsNumber <= max && e.target.valueAsNumber >= min) ? setValue(e.target.valueAsNumber): null} 
              id={`increment-${name}`}
              />
        </label>
        <Button style={{...buttonStyle, ...leftStyle}} aria-labelledby={`increment-${name}`} onClick={increase}>+</Button>
    </div>); //temprory TODO
}