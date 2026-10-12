import { useState } from "react"
import styled, { css } from "styled-components"

import { CardSet, cardsets } from './cardPools.js'
//import { ImageSet, imagesets } from './assets/index.js'
import "./App.css"

// Enter globals
const DEFAULT_IMAGE = "img_default"
const DEFAULT_IMAGE_WIDTH = 100
const DEFAULT_IMAGE_HEIGHT = 100

const flip = keyframes`
    from {
        transform: rotateX(0deg);
    }
    to {
        transform: rotateX(180deg);
    }
`

// TODO: Look for a way to pass props into animations.
const glowPositive = keyframes`
    0% {
        background-color: white;
    }
    100% {
        background-color: rgb(80, 255, 41);
        text-shadow: 0px 0px 5px rgb(30, 155, 0);
    }
`

const glowNegative = keyframes`
    0% {
        background-color: white;
        
    }
    100% {
        background-color: rgb(255 50 81);
        text-shadow: 0px 0px 5px rgb(155 0 31)
    }
`

// For reference:
// To make a new styled component, set a const var to "styled.__HTMLElement__`...`".
//  Ex. const BigRedButton = styled.button`...`
//  Ex. const MyTitle = styled.h1`...`
// Inside the template string, add all the CSS you want, with normal CSS syntax.
// If you want to add props, add <{$prop1?: value1, $prop2?: value2, ...}> right after the HTML element.
//  Ex. const GameCanvas = styled.div<{$}>
// You can have as many props as you want in this "props" object. Usually, they're prefixed with "$" and are optional (denoted by "?").
// To use the props for conditional CSS, add a code block in the template string with an anonymous function using "props" as a parameter.
//  Ex. ${props => props.$prop1 && css`...`};
//  You must have separate blocks for every condition you want to check for.
// From here, you can use the component 
const ScrollButton = styled.button<{$atEdge?: boolean}>`
    background-color: white;
    border: 3px solid rgb(176, 16, 69);
    color: black;

    ${props =>
        props.$atEdge && css`
            color: gray;
    `};
`

function compareArrays(arr1, arr2) {
    // Return true if two arrays are the same 
    if(arr1.length != arr2.length) {
        return false
    }
    
    for(let a = 0; a < arr1.length; a++) {
        // If an element is an array, recurse on it.
        if(arr1[a] instanceof Array && arr2[a] instanceof Array) {
            if(!compareArrays(arr1[a], arr2[a])) {
                return false
            }
        }
        else if(arr1[a] != arr2[a]) {
            return false
        }
    }
    return true
}


//~~~~~//

// Let's just build a better Flashcard component.
function Flashcard({faceup, textA, imageA, textB, imageB, onclick}) {
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

    // DON'T EVER USE STATE VARS TO WRAP PROP VALUES! THEY WON'T UPDATE WITH RERENDERS!
    // ALL THE CHANGES SHOULD HAPPEN IN THE APP FUNCTION ONLY!
    // Ex. Don't do this in this component's definition--> const [currText, setCurrText] = useState(cardData.textA)

    let currText = faceup ? textA : textB
    let currImage = faceup ? imageA : imageB
    
    return (
        <div id="flashcard" onClick={onclick}>
            <img
                id="flashcardImage"
                src={(currImage != null) ? currImage : DEFAULT_IMAGE}
                width={(currImage != null) ? auto : DEFAULT_IMAGE_WIDTH}
                height={(currImage != null) ? auto : DEFAULT_IMAGE_HEIGHT}
            >
            </img>
            <p id="flashcardText">{currText}</p>
        </div>
    )
}


function App() {
    // Want to add a difficulty setting later? (Includes the answer = normal, exact matches + case sensitivity = difficult)
    const [faceup, setFaceup] = useState(true)
    const [difficulty, setDifficulty] = useState("Normal")
    // 0 = neutral, 1 = wrong, 2 = correct
    const [isCorrect, setIsCorrect] = useState(0)

    // TODO: Add a way to change the current card set later on. A dropdown is probably best for this.
    const [currInd, setCurrInd] = useState(0)
    const [currCardSet, setCurrCardSet] = useState({...cardsets[0]})
    const [currTitle, setCurrTitle] = useState(currCardSet.title)
    const [currDesc, setCurrDesc] = useState(currCardSet.desc)
    const [currPool, setCurrPool] = useState(currCardSet.pool)

    function shuffle(arr) {
        // Given an array "arr", return a shuffled version of that array.
        for(let i = 0; i < arr.length; i++) {
            let hold = arr[i]
            let swapInd = Math.floor(Math.random() * arr.length)
            arr[i] = arr[swapInd]
            arr[swapInd] = hold
        }
        // Actually, since arr is passed by reference, the shuffle is kept even when this function ends.
        // No return statement necessary!
        // To return a new array, though, use "return arr.slice()".
    }

    function checkAnswer(answer, validAnswers) {
        // Given a string "answer" and a string array "validAnswers", return true if any string in validAnswers is a word or
        // phrase in answer.
        answer = answer.trim().toLowerCase()
        let splitAnswer = answer.split(" ")
        for(let v = 0; v < validAnswers.length; v++) {
            // If a valid answer has multiple words, only exact matches for all of its words will count.
            let currWords = validAnswers[v].trim().split(" ")
            if(currWords.length > 1) {
                for(let w = 0; w < splitAnswer.length - currWords.length + 1; w++) {
                    if(compareArrays(splitAnswer.slice(w, w+currWords.length), currWords)) {
                        return true
                    }
                }
            }
            // Otherwise, just check if the provided answer includes the valid answer as a space-separated word.
            else {
                if(splitAnswer.includes(currWords[0])) {
                    return true
                }
            }
        }
        return false
    }

    function handleScroll(scrollRight = true) {
        if(scrollRight && currInd < (currPool.length - 1)) {
            setCurrInd(currInd + 1)
            console.log("scrolling right")
        }
        else if(!scrollRight && currInd > 0) {
            setCurrInd(currInd - 1)
            console.log("scrolling left")
        }
        else {
            console.log("no scroll, at the edges already")
            console.log(`currInd = ${currInd}`)
        }
    }

    function handleShuffle() {
        console.log("shuffling...")
        shuffle(currPool)
        setCurrInd(1)
        setCurrInd(0)
        console.log("shuffle done")
    }

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        e.preventDefault()

        // Read the form data
        const form = e.target
        const formData = new FormData(form)
        const answer = formData.get("answer")
        // Use the "neutral" state, 0, for blank submissions.
        if(answer == "") {
            setIsCorrect(0)
        }
        // If the answer is wrong, use the "wrong" state, 1. There's no penalty for getting answers wrong... at least for now.
        // TODO: If you add in difficulty, you can maybe add a lives/guesses system that only allows for x amount of wrong answers.
        //       Maybe you can also change the amount of lives given for each difficulty?
        else if(!checkAnswer(answer, currPool[currInd].answers)) {
            setIsCorrect(1)
            setFaceup(true)
            alert("Incorrect... give it another go!")
        }
        // Otherwise, if the answer is correct, use the "correct" state, 2.
        else {
            setIsCorrect(2)
            setFaceup(false)
            // Debug only; swap this out for a color flash on the input section or somewhere else later on.
            // Also check out how to do styling within React (stylized-components, iirc)
            alert("Correct!")
        }
    }

    function flip() {
        setFaceup(!faceup)
    }
    

    return (
        <>
            <h1 id="title">{currTitle}</h1>
            <p id="desc">{currDesc}</p>
            <Flashcard
                faceup={faceup}
                textA={currPool[currInd].textA}
                textB={currPool[currInd].textB}
                imageA={currPool[currInd].imageA}
                imageB={currPool[currInd].imageB}
                onclick={flip}
            />

            <form
                className="answerbar"
                onSubmit={handleSubmit}
            >
                <input
                    id="answer"
                    name="answer"
                />
                <button
                    id="submitButton"
                    type="submit"
                >
                    Submit
                </button>
            </form>

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
