const container = document.querySelector(".container"); //Get the all stuff in container class

const targetWord = container.querySelector("input"); //Get the input
const hintsentence = container.querySelector(".hint");// Hint sentence

const synonyms = container.querySelector(".synonyms .wordslist")

//const synonyms = wrapper.querySelector(".synonyms .list");
//const removeIcon = wrapper.querySelector(".search span");

targetWord.addEventListener("keyup", e =>{
    if(e.key === "Enter" && e.target.value){
        fetchApi(e.target.value);
    }
});

//fectch api function
function fetchApi(word){
    hint(word)
    //hint(word);
    //Calling fetch function to use api via two then function.
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then(response => response.json())//Parsing response into js object
  .then(apiData => wordContent(word, apiData));//Calling a defined function called 'wordContent' to pass targeted word and api response as argument
};

//Define a funtion called 'wordContent' which is used to match the searched word and result data
function wordContent(word, apiData){
    if(apiData.title){
        hintwrong(word);//If find nothing,return the hint sentence
    }
    else{
        container.classList.add("active");//Add a new class called "active" to store the results and make it as a dropdown menu

        // Return the searched result to each item
        // Return word
        document.querySelector(".words p").innerText = apiData[0].word;

        // Return phonetic symbol and part of speech of the searched word
        var phoneticSpeech = `${apiData[0].meanings[0].partOfSpeech} /${apiData[0].phonetics[0].text}`;
        document.querySelector(".words span").innerText = phoneticSpeech;

        // Return definition
        document.querySelector(".definition span").innerText = apiData[0].meanings[0].definitions[0].definition;

        // Return maximum 6 synonyms
        // Find which list the synonyms belongs to
        //var sysList = apiData[0].meanings[0].definitions[0];
        if(apiData[0].meanings[0].synonyms[0] == undefined){ // Set a condition if cannot find any synonyms
            synonyms.innerHTML = `<span style = 'color: rgba(0,0,0,0.6)'>No results.</span>`
        }else{
            synonyms.innerHTML = ""
            for(i=0; i<6; i++){
            var sys = `<span> ${apiData[0].meanings[0].synonyms[i]} </span>`;
            synonyms.insertAdjacentHTML("beforeend",sys);//before tag endding
            console.log(sys);
        }

        };
    }
    console.log(apiData); 
}

//Define a function called 'hint' which will return the instruction pharse while user search for the word
function hint(word){
    hintsentence.innerHTML = `Hold on a second! Searching for <span>" ${word} "</span>`;
}

//Define a function alled 'hintwrong' which is used while the typing word is not found
function hintwrong(word){
    hintsentence.innerHTML = `Opps! Cannot find any results for <span>" ${word} "</span>`
}
