const paragraph = "Programming is the the art of solving problems with computer code basically telling a computer what to do"
        const paragraphDOM = document.querySelector(".paragraph")
        const correctDOM = document.querySelector(".correct p")
        const mistakeDOM = document.querySelector(".mistake p")
        let correct = 0
        let mistake = 0
        let counter = 0
        let currentPossition = 0

        function stringToArray(words) {
            let array = []
            for (let i = 0; i < words.length; i++) {
                array.push(paragraph[i])
            }
            return array
        }


        window.onload = () => {
            const element = stringToArray(paragraph).map((item, index) => {
                if (index === currentPossition) {
                    return `<span class="letter current_position">${item}</span>`
                }
                return `<span class="letter">${item}</span>`
            })
            const clearElement = element.join('')
            paragraphDOM.innerHTML = clearElement
            counter = stringToArray(paragraph).length
        }

        function renderGraphic(value, letters) {
            // Remove old
            letters.forEach((item, index) => {
                if (item.classList.contains('current_position')) {
                    item.classList.remove('current_position')
                }
            })

            // Add new
            letters.forEach((item, index) => {
                if (value === index) {
                    item.classList.add('current_position')
                }
            })
        }

        function isCorrect(letter, letters) {
            if (letters[currentPossition].innerText === letter) {
                return true
            }
            return false
        }

        function correctGuess() {
            correctDOM.innerText = correct
            mistakeDOM.innerText = mistake
        }

        function typeIn(e) {
            const letters = document.querySelectorAll('.paragraph .letter')
            const keyPressed = e.key
            
            if (keyPressed === "Backspace" && currentPossition != 0) {
                currentPossition--
                renderGraphic(currentPossition, letters)
            } else if (isCorrect(keyPressed, letters) && currentPossition != letters.length && keyPressed != "Backspace") {
                currentPossition++
                correct++
                correctGuess()
                renderGraphic(currentPossition, letters)
            } else if(!isCorrect(keyPressed, letters) && currentPossition != letters.length && keyPressed != "Backspace") {
                currentPossition++
                mistake++
                correctGuess()
                renderGraphic(currentPossition, letters)
            }
        }


        window.addEventListener("keyup", typeIn)