import { useState } from 'react'

import { CardSet, cardsets } from './cardPools.js'
//import { ImageSet, imagesets } from './assets/index.js'
import './App.css'

const DEFAULT_IMAGE = "img_default"

// Let's just build a better Flashcard component.
function Flashcard(faceup, card) {
    /*
    Keep it simple this time.

    Component-side:
    - Current side (state var)
    - Flip on click (onClick function)

    Data-side:
    - Side A text
    - Side B text
    - Side A image (if empty, remove or hide the Flashcard's image element)
    - Side B image (")

    Parameters:
    - faceup: If side A is up or not
    - card  : The current card's data, pulled from the selected pool
    */

    // Trying something new
    console.log("in the flashcard, with white curtains")
    /*
    Ok, so if you use props, say in "<Component first="Alice" last="Bobbery" />", and you have "function Component(first, last)",
    with NO DESTRUCTURING in the () themselves:
    - console.log(first) --> Object {Object {first: "Alice"}, Object {last: "Bobbery"}}
        - You need to destructure "first", then destructure each of its attributes since they wrap the actual prop values.
    - console.log(last) --> undefined
        - Everything gets absorbed into "first".
    - console.log({...first}) --> 

    */
    console.log(faceup)
    console.log(card)
    console.log("breaka")
    console.log({faceup})
    console.log({card})
    const cardData = {card}
    const [currText, setCurrText] = useState(cardData.textA)
    const [currImage, setCurrImage] = useState(DEFAULT_IMAGE)

    function flip() {
        if(faceup) {
            setCurrText(cardData.textB)
            setCurrImage(cardData.imgB)
        }
        else {
            setCurrText(cardData.textA)
            setCurrImage(cardData.imgA)
        }
    }

    return (
        <div id="flashcard" onClick={flip}>
            <img id="flashcardImage" src={currImage} />
            <p id="flashcardText">{currText}</p>
        </div>
    )
}


function App() {
    // Want to add a difficulty setting later? (Includes the answer = normal, exact matches + case sensitivity = difficult)
    const [faceup, setFaceup] = useState(true)
    const [difficulty, setDifficulty] = useState("Normal")
    const [currInd, setCurrInd] = useState(0)

    const [currCardSet, setCurrCardSet] = useState({...cardsets[0]})
    console.log("currCardSet is: ")
    console.log(currCardSet)
    console.log("destructuring that...")
    console.log({...currCardSet})
    const [currTitle, setCurrTitle] = useState(currCardSet.title)
    const [currDesc, setCurrDesc] = useState(currCardSet.desc)
    const [currPool, setCurrPool] = useState(currCardSet.pool)
    console.log(`currPool is: ${currPool}`)
    console.log("currPool[currInd] is:")
    console.log(currPool[currInd])

    function shuffle(arr) {
        // Given an array "arr", return a shuffled version of that array.
        for(let i=0; i<arr.length; i++) {
            let hold = arr[i]
            let swapInd = Math.floor(Math.random*arr.length)
            arr[i] = arr[swapInd]
            arr[swapInd] = arr[i]
        }
        // Actually, since arr is passed by reference, the shuffle is kept even when this function ends.
        // No return statement necessary!
        // To return a new array, though, use "return arr.slice()".
    }

    function handleScroll(scrollRight = true) {
        if(scrollRight && currInd < currPool.length-1) {
            setCurrInd(currInd+1)
            console.log("scrolling right")
        }
        else if(!scrollRight && currInd > 0) {
            setCurrInd(currInd-1)
            console.log("scrolling left")
        }
        else {
            console.log("no scroll, at the edges already")
            console.log(`currInd = ${currInd}`)
        }
    }

    function handleShuffle(arr) {
        console.log("shuffling...")
        shuffle(arr)
        setCurrInd(0)
        console.log("shuffle done")
    }

    return (
        <>
            <h1 id="title">{currTitle}</h1>
            <p id="desc">{currDesc}</p>
            <Flashcard faceup={{faceup}} card={currPool[currInd]} />
            <div className="answerbar">
                <input id="answer" defaultValue=":)"></input>
                <button id="submitButton" type="submit" onClick={console.log("hi ma")}></button>
            </div>
            <div className="navbar">
                <button
                    id="scrollLeft"
                    onClick={
                        () => {
                            handleScroll(false)
                            setFaceup(true)
                        }
                    }
                >
                    {" < "}
                </button>
                <button
                    id="shuffle"
                    onClick={
                        () => {
                            handleShuffle(currPool)
                            setFaceup(true)
                        }
                    }
                >
                        Shuffle cards 
                </button>
                <button
                    id="scrollRight"
                    onClick={
                        () => {
                            handleScroll(true)
                            setFaceup(true)
                        }
                    }
                >
                    {" > "}
                </button>
            </div>
        </>
    )
}

export default App
