const form = document.querySelector('.search_form');
const content = document.querySelector('.main_content');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector(".input").value;
    const url = `https://googledictionaryapi.eu-gb.mybluemix.net/?define=${input}&lang=en`;

    //sendRequest to url
    fetch(url)
    .then(response => {
        if(response.statusText === "Not Found"){
            alert("Word "+response.statusText);
            throw response.statusText;  
            
        }
        else{
            return response.json();}
        })
    .then(data => {
        handleData(data)
    }).catch(error => {
       console.log(error);
    });

}

function handleData(data) {
    let allMeaning = data[0].meaning;

    content.innerHTML = "<h1 style='text-align: center;margin-bottom: 50px;'>[Definitions]</h1>";

    content.insertAdjacentHTML('beforeend', `<h2 style="font-size = ">${data[0].word} :</h2>`);

    for (let meaning in allMeaning) {

        content.insertAdjacentHTML('beforeend', `
        <h3>${meaning}:</h3>`);
        content.insertAdjacentHTML('beforeend', `<p>${allMeaning[meaning][0].definition}</p>`);
        //check if a word has 2nd definition
        if (allMeaning[meaning][1] && allMeaning[meaning][1].hasOwnProperty("definition")) {
            content.insertAdjacentHTML('beforeend', `<br>OR<br><p>${allMeaning[meaning][1].definition}</p>`);
        }
        //check if a word has synonyms available
        if(allMeaning[meaning][0].hasOwnProperty("synonyms")){
        content.insertAdjacentHTML('beforeend', `<div class="synonyms"><h3>Synonyms: </h3><span>${allMeaning[meaning][0].synonyms.join(', ')} .</span></div>`);}

    }
}
