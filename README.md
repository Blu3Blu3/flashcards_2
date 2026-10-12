# Web Development Project 3 - *Flashcards 2: Revamped*

Submitted by: **Christian Guiang**

This web app: **A more fleshed out version of my previous flashcard webpage, now featuring an answering system and fully functional scrolling and card shuffling.**

Time spent: **24** hours spent in total

## Required Features

The following **required** functionality is completed:

- [✔] **The user can enter their guess into an input box *before* seeing the flipside of the card**
  - Application features a clearly labeled input box with a submit button where users can type in a guess
  - Clicking on the submit button with an **incorrect** answer shows visual feedback that it is wrong 
  -  Clicking on the submit button with a **correct** answer shows visual feedback that it is correct
- [✔] **The user can navigate through an ordered list of cards**
  - A forward/next button displayed on the card navigates to the next card in a set sequence when clicked
  - A previous/back button displayed on the card returns to the previous card in the set sequence when clicked
  - Both the next and back buttons should have some visual indication that the user is at the beginning or end of the list (for example, graying out and no longer being available to click), not allowing for wrap-around navigation

The following **optional** features are implemented:


- [✔] Users can use a shuffle button to randomize the order of the cards
  - Cards should remain in the same sequence (**NOT** randomized) unless the shuffle button is clicked 
  - Cards should change to a random sequence once the shuffle button is clicked
- [✔] A user’s answer may be counted as correct even when it is slightly different from the target answer
  - Answers are considered correct even if they only partially match the answer on the card 
  - Examples: ignoring uppercase/lowercase discrepancies, ignoring punctuation discrepancies, matching only for a particular part of the answer rather than the whole answer
- [ ] A counter displays the user’s current and longest streak of correct responses
  - The current counter increments when a user guesses an answer correctly
  - The current counter resets to 0 when a user guesses an answer incorrectly
  - A separate counter tracks the longest streak, updating if the value of the current streak counter exceeds the value of the longest streak counter 
- [ ] A user can mark a card that they have mastered and have it removed from the pool of displayed cards
  - The user can mark a card to indicate that it has been mastered
  - Mastered cards are removed from the pool of displayed cards and added to a list of mastered cards

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<a href="https://imgur.com/a/KfNXazY">Video Walkthrough</a>

GIF created with ...  
[ScreenToGif](https://www.screentogif.com/) for Windows


## Notes

NGYAAAAH THOSE STATE VARS WERE KILLING ME!!!

Real talk, this app took tons of trial and error to figure out how state vars interacted with props when used in a component. There were several hours of just researching and reworking the code to try and force renders of the flashcards when flipping, scrolling, or shuffling. It wasn't until I brute forced checking every combination of destructuring the props and working with the state vars in the Flashcard component that I found out the problem was in wrapping the props' values in state vars, and using the state vars to handle things like the current text and side of the card. In those cases, no matter how much destructuring is done, the state vars will not react to any user actions, leaving the card totally inactive at worst and slow to respond at best.

## License

    Copyright 2026 Christian Guiang

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
