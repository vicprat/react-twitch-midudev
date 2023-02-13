import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

import './App.css'

function App() {
    const {fact, refreshFact} = useCatFact()
    const {imageUrl} = useCatImage({fact})

    const handleClick = async () => {refreshFact()}

    return (
        <main>
            <h1>App de gatos</h1>
            <button onClick={handleClick}>Get new fact</button>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={imageUrl} alt={`Image extracted using the first three words for ${fact}`} />}
        </main>
    )
}

export default App