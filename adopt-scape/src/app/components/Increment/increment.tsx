/**
 * @author Carson Fujita
 * @copyright Carson Fujita, 2025
 */

type props = {
    readonly name: string;
    readonly min: number;
    readonly max: number;
    value: number;
}

export default function Increment({name, min, max, value}: props){
    
    //validate range
    if(min > max){
        throw Error(`Minimum Value cannot be larger than max value. Min: ${min} Max: ${max}`);
    }
    
    return (<span> {name}
    </span>); //temprory TODO
}