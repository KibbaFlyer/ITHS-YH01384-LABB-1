import { useState } from 'react';
import TextModifierComponent from './TextModifierComponent';

function CatsComponent() {
    const [catFacts, setCatFacts] = useState("")

    function fetchCatFacts() {
        fetch("https://catfact.ninja/fact")
            .then(response => response.json()).then(data => {
                setCatFacts(data.fact)
            });
    }

    return (
        <div className="component">
            <h1>Cats</h1>
            <button onClick={fetchCatFacts} className='cat-button'>
                Click for cat facts!
            </button>
            <br />
            <textarea value={catFacts} readOnly={true} style={{ width: "500px", height: "100px" }} />
            <br />
            {catFacts != "" && <TextModifierComponent text={catFacts} />}
        </div>

    )
}

export default CatsComponent