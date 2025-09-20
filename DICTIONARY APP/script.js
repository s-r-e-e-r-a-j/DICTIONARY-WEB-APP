// Coded by Sreeraj

const input = document.querySelector("#input");
const word = document.querySelector("#word");
const meaning = document.querySelector("#meaning");
const searchbtn = document.querySelector("#searchbtn");

const speech = new SpeechSynthesisUtterance();

searchbtn.addEventListener("click", getMeaning);

function getMeaning() {
    const value = input.value.trim();

    if (value === "") {
        word.textContent = "";
        meaning.textContent = "";
        return;
    }

    word.textContent = value;

    const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${value}`;

    fetch(api)
        .then(response => response.json())
        .then(data => {
            if (data.title) {
                // Word not found
                word.textContent = "Not found";
                meaning.innerHTML = "Please enter a correct word.<br>ആ വാക്ക് കണ്ടെത്താൻ കഴിയുന്നില്ല.ശരിയായ വാക്ക് നൽകുക";
                return;
            }

            const definition = data[0].meanings[0].definitions[0].definition;
            meaning.textContent = definition;

            // Speak the definition
            speech.text = `Meaning of ${value}: ${definition}`;
            speech.rate = 0.8;
            speech.pitch = 0.8;
            speech.lang = "en-US";
            window.speechSynthesis.speak(speech);
        })
        .catch(error => {
            word.textContent = "Error";
            meaning.innerHTML = "Something went wrong. Please try again.";
            console.error(error);
        });
}
