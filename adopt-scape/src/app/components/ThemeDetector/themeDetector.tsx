"use client";
import { useEffect, useState } from "react";
import { Theme } from "@/app/page";

export default function themeDectector(){
    const [theme, setTheme] = useState<Theme>(Theme.Light);
    
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        const updateTheme = () => setTheme(prefersDark.matches ? Theme.Dark : Theme.Light);

        updateTheme(); 
        prefersDark.addEventListener("change", updateTheme);
  });

  return theme;
}