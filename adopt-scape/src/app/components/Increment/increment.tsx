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

export default function Increment({name, min, max, value, setValue}: props){
    //validate range
    if(min > max){
        throw Error(`Minimum Value cannot be larger than max value. Min: ${min} Max: ${max}`);
    }
    
    const increase = () => value+1 <= max ? setValue(++value) : null;
    const decrease = () => value-1 >= min ? setValue(--value) : null;

    return (<div className={style.container}>
        <Button className={`${style.button} ${style.right} `} aria-labelledby={`increment-${name}`} onClick={decrease}>-</Button>
        
        <label className={` ${ themeDectector() == Theme.Dark ? "bg-light" : "bg-dark" } ${style.name}`} >
            {name}
             <input 
            className={style.input} 
            min={min} 
            max={max}
              type="number" 
              value={value} 
              onChange={(e) =>( e.target.valueAsNumber <= max && e.target.valueAsNumber >= min) ? setValue(e.target.valueAsNumber): null} 
              id={`increment-${name}`}
              />
        </label>
        <Button className={`${style.button} ${style.left}`} aria-labelledby={`increment-${name}`} onClick={increase}>+</Button>
    </div>); //temprory TODO
}