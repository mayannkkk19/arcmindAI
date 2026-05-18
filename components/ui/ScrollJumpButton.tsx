"use client"

import {useEffect,useState} from "react"

export default function ScrollJumpButton() {
    const [isScrollable, setIsScrollable] = useState(false);
    const [position, setPosition] = useState<"top" | "bottom" | "middle">("top");
}