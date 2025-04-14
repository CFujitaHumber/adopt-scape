/**
 * 
 */
"use client"
import { FormEventHandler, Dispatch, SetStateAction } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styles from "./component.module.css"
export enum animal {
    Dog,
    Cat,
    Both
};

export enum sort {
    Recent,
    Distance,
    Random
}

type props = {
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;

    animalType: animal;
    setAnimalType: Dispatch<SetStateAction<animal>>;
    defaultAnimal: animal;

    sortType: sort;
    setSortType: Dispatch<SetStateAction<sort>>;
    defaultSort: sort;

    onSubmit?: FormEventHandler<HTMLFormElement>
}

export default function SearchBar({query, setQuery, animalType, setAnimalType, defaultAnimal, sortType, setSortType, defaultSort, onSubmit}: props){
    return (
        <Form className={styles.form} onSubmit={onSubmit}>
                    <Form.Control
                    type="text"
                    placeholder="Search"
                    className={styles.control}
                    />
                    <Form.Select className={styles.animalSelect} aria-label="Select Animal" defaultValue={defaultAnimal}>
                        <option value={animal.Dog}>Dog</option>
                        <option value={animal.Cat}>Cat</option>
                        <option value={animal.Both}>Both</option>
                    </Form.Select>
                    <Form.Select className={styles.sortSelect} aria-label="Select Sort" defaultValue={defaultSort}>
                        <option value={sort.Distance}>Distance</option>
                        <option value={sort.Random}>Random</option>
                        <option value={sort.Recent}>Recent</option>
                    </Form.Select>
                    <Button className={styles.submit} type="submit">Submit</Button>
        </Form>
    )
}