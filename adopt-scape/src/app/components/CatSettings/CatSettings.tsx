"use client";
import React, {Component, Dispatch, SetStateAction, useState } from "react";
import { Container } from "react-bootstrap";
import Increment from "../Increment/increment";

export type CatSettingsState = {
    weight: number;
    setWeight: Dispatch<SetStateAction<number>>;

    playfullness: number;
    setPlayfullness: Dispatch<SetStateAction<number>>;

    grooming_needed: number;
    setGroomingNeeded: Dispatch<SetStateAction<number>>;

    other_pet_friendly: number;
    setOtherPetFriendly: Dispatch<SetStateAction<number>>;

    children_friendly: number;
    setChildrenFriendly: Dispatch<SetStateAction<number>>;
    
}

export default function CatSettings({weight, setWeight, playfullness, setPlayfullness, grooming_needed, setGroomingNeeded, other_pet_friendly, setOtherPetFriendly, children_friendly, setChildrenFriendly}: CatSettingsState){

    return (<Container style={{display: "flex", flexFlow: "row wrap", gap: "1rem"}}>

        <Increment 
        name="Weight"
        min={0}
        max={5}
        value={weight}
        setValue={setWeight}
        />

        <Increment 
        name="Playfullness"
        min={0}
        max={5}
        value={playfullness}
        setValue={setPlayfullness}
        />

        <Increment 
        name="Grooming Needed"
        min={0}
        max={5}
        value={grooming_needed}
        setValue={setGroomingNeeded}
        />

        <Increment 
        name="Other Pet Friendly"
        min={0}
        max={5}
        value={other_pet_friendly}
        setValue={setOtherPetFriendly}
        />

        <Increment 
        name="Children Friendly"
        min={0}
        max={5}
        value={children_friendly}
        setValue={setChildrenFriendly}
        />
    </Container>)
}