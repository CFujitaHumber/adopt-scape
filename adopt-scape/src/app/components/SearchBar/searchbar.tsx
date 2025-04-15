/**
 * 
 */
"use client"
import { FormEventHandler, Dispatch, SetStateAction } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./component.module.css"

export type animal = "dog" | "cat";

export type sort = "recent" | "distance" | "random";


type props = {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;

    sortType: sort;
    setSortType: Dispatch<SetStateAction<sort>>;
    defaultSort: sort;

    onSubmit?: FormEventHandler<HTMLFormElement>;

    isDisabled: boolean;
}

export default function SearchBar({query, setQuery, sortType, setSortType, defaultSort, onSubmit, isDisabled}: props){
    return (
        <Form className={"d-flex justify-content-center align-items-stretch p-2"} onSubmit={onSubmit} >
                    <Form.Control
                    style={{flexBasis:"30%", borderRight: "none", borderTopRightRadius: 0, borderBottomRightRadius: 0}}
                    type="text"
                    placeholder="Search"
                    value={query}
                    onChange={(e)=>{setQuery(e.target.value)}}
                    />
                    <Form.Select style={{flexBasis: "20%", borderRight: "none", borderTopRightRadius: 0, borderBottomRightRadius: 0, borderLeft: "none", borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} aria-label="Select Sort" onChange={(e) => {setSortType(e.target.value)}} defaultValue={defaultSort}>
                        <option value={'distance'}>Distance</option>
                        <option value={'random'}>Random</option>
                        <option value={'recent'}>Recent</option>
                    </Form.Select>
                    <Button style={{borderLeft: "none", borderTopLeftRadius: 0, borderBottomLeftRadius: 0}} className={styles.submit} disabled={isDisabled} aria-disabled={isDisabled} type="submit">Submit</Button>
        </Form>
    )
}