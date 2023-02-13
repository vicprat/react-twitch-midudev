import { useState, useEffect } from "react"
import { getRandoFact } from "../services/facts"

export function useCatFact () {
    const [fact, setFact] = useState()

    const refreshFact = () => {
        getRandoFact().then(setFact)
    }

    useEffect(refreshFact, [])

    return {fact, refreshFact}
}
