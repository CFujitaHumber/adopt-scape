/**
 * 
 */
"use client"

enum animal {
    Dog,
    Cat,
    Both
};

enum sort {
    Recent,
    Distance,
    Random
}

type props = {
    query: string;
    animalType: animal;
    sortType: sort;
}

export default function SearchBar({query, animalType, sortType}: props){
    return (
        <></>
    )
}