import { useState } from 'react'

import { CardSet, cardsets } from './cardPools.js'
//import { ImageSet, imagesets } from './assets/index.js'
import './App.css'

const DEFAULT_IMAGE = "img_default"

// Let's just build a better Flashcard component.
function Flashcard({faceup, card}) {
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
    /*
    Ok, so if you use props, say in "<Component first="Alice" last="Bobbery" />", and you have "function Component(first, last)",
    with NO DESTRUCTURING in the () themselves:
    - console.log(first) --> Object {Object {first: "Alice"}, Object {last: "Bobbery"}}
        - You need to destructure "first", then destructure each of its attributes since they wrap the actual prop values.
    - console.log(last) --> undefined
        - Everything gets absorbed into "first".
    - console.log({first}) --> Object {Object {first: "Alice"}, Object {last: "Bobbery"}}
        - Somehow the same.
    - console.log({last}) --> Object {last: undefined}
        - undefined gets treated as an object.
    - console.log({...first} --> Object {Object {first: "Alice"}, Object {last: "Bobbery"}}
        - Also somehow the same.
    - console.log({...last}) --> nothing
        - Can't spread undefined.

    Now, if you destructure the props first, like in "function Component({first, last})":
    - console.log(first) --> "Alice"
        - This has been properly destructured.
    - console.log(last) --> "Bobbery"
        - This has also been properly destructured.
    - console.log({first}) --> Object {first: "Alice"}
        - Somehow this wraps the value as an object.
    - console.log({last}) --> Object {last: "Bobbery"}
        - Also gets wrapped. Just don't use {} again.
    - console.log({...first} --> nothing
        - Can't spread undefined.
    - console.log({...last}) --> nothing
        - Still can't spread undefined.

    Note that if you pass objects as props, all this still applies, but you won't be able to destructure them more once they're
    just an unwrapped object. At that point, forgo all {} use and just access the attributes or use the object as normal.

    Ex.
    Pass <Component person={{first: "Alice", last: "Bobbery", id: 12345}}> -->
    function Component({person}) --> person = Object {first: "Alice", last: "Bobbery", id: 12345} -->
    - console.log(person["first"]
    */
    const cardData = card
    const [currText, setCurrText] = useState(faceup ? cardData.textA : cardData.textB)
    const [currImage, setCurrImage] = useState(faceup ? cardData.imgA : cardData.imgB)

    // This works, but it takes 2 clicks to flip from side B to side A for some reason. Fix that later.
    function flip() {
        if(faceup) {
            setCurrText(cardData.textB)
            setCurrImage(cardData.imgB)
        }
        else {
            setCurrText(cardData.textA)
            setCurrImage(cardData.imgA)
        }
        faceup = !faceup
    }

    // NOTE: Don't pass onClick or other event listeners as props; they'll be read as variables with some value.
    // Instead, just have event listeners inside the components' return statements.
    return (
        <div id="flashcard" onClick={flip}>
            <img id="flashcardImage" src={currImage}/>
            <p id="flashcardText" onChange={() => {console.log("Do something!"); card=card;}}>{currText}</p>
        </div>
    )
}


function App() {
    // Want to add a difficulty setting later? (Includes the answer = normal, exact matches + case sensitivity = difficult)
    const [faceup, setFaceup] = useState(true)
    const [difficulty, setDifficulty] = useState("Normal")
    const [currInd, setCurrInd] = useState(0)

    const [currCardSet, setCurrCardSet] = useState({...cardsets[0]})
    const [currTitle, setCurrTitle] = useState(currCardSet.title)
    const [currDesc, setCurrDesc] = useState(currCardSet.desc)
    const [currPool, setCurrPool] = useState(currCardSet.pool)

    function shuffle(arr) {
        // Given an array "arr", return a shuffled version of that array.
        for(let i=0; i<arr.length; i++) {
            let hold = arr[i]
            let swapInd = Math.floor(Math.random() * arr.length)
            arr[i] = arr[swapInd]
            arr[swapInd] = arr[i]
        }
        // Actually, since arr is passed by reference, the shuffle is kept even when this function ends.
        // No return statement necessary!
        // To return a new array, though, use "return arr.slice()".
    }

    function handleScroll(scrollRight = true) {
        if(scrollRight && currInd < currPool.length-1) {
            setCurrInd((currInd) => currInd+1)
            console.log("scrolling right")
        }
        else if(!scrollRight && currInd > 0) {
            setCurrInd((currInd) => currInd-1)
            console.log("scrolling left")
        }
        else {
            console.log("no scroll, at the edges already")
            console.log(`currInd = ${currInd}`)
        }
    }

    function handleShuffle(arr) {
        console.log("shuffling...")
        shuffle(currPool)
        setCurrInd(0)
        console.log("shuffle done")
        console.log(currInd)
    }

    return (
        <>
            <h1 id="title">{currTitle}</h1>
            <p id="desc">{currDesc}</p>
            <Flashcard
                faceup={faceup}
                card={currPool[currInd]}
            />
            <div className="answerbar">
                <input id="answer" defaultValue=":)"></input>
                <button id="submitButton" type="submit" ></button>
            </div>
            <div className="navbar" onChange={() => {alert("Hey!")}}>
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
