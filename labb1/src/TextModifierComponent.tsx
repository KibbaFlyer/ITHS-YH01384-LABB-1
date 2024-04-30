import { useState } from 'react';

interface props {
    text: string
}

function TextModifierComponent(props: props) {
    const [randomizedText, setRandomizedText] = useState([""]);

    // Fisher-yates algorithm for shuffling arrays
    function shuffle(inputArray: string[]) {
        let i = inputArray.length, j: number, temp: string;
        while (--i > 0) {
            j = Math.floor(Math.random() * (i + 1));
            temp = inputArray[j];
            inputArray[j] = inputArray[i] + " ";
            inputArray[i] = temp + " ";
        }
        return inputArray;
    }

    function clickedRandomizer() {
        const split = props.text.split(" ");
        const result = shuffle(split);
        setRandomizedText(result)
    }

    return (
        <>
            <button className="cat-button" onClick={clickedRandomizer}>Click to randomize</button>
            {randomizedText.length > 0 && <p>{randomizedText}</p>}
        </>
    )
}

export default TextModifierComponent;