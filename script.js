 const form = document.querySelector('form');
 const result = document.querySelector('.result');

    form.addEventListener('submit',(e) => {
        e.preventDefault();
        getDictionaryInfo(form.elements[0].value.trim());
    });

    const getDictionaryInfo =  async(x) => {
        try {
                    result.innerHTML = "Fetching Data Please Wait..."
                    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${x}`);  
                    const data = await response.json();
                    let dictionaryData = data[0].meanings[0].definitions[0];
                    result.innerHTML = `
                        <h2><strong>Word:</strong> ${data[0].word}</h2>
                        <p class="partofspeech">${data[0].meanings[0].partOfSpeech}</p>
                        <p><strong>Meaning:</strong>${dictionaryData.definition === undefined ? "Not Found" : dictionaryData.definition}</p>              
                        <p><strong>Example:</strong>${dictionaryData.example === undefined ? "Not Found" : dictionaryData.example}</p>
                        <p><strong>Antonyms:</strong></p>
                    `;
            
                    // fetching Antonyms
                    if(dictionaryData.antonyms.length === 0){
                    result.innerHTML += `<span>Not Found</span>`;
                    }else{
                        for(let i=0; i<dictionaryData.antonyms.length; i++){
                            result.innerHTML += `<li>${dictionaryData.antonyms[i]}</li>`
                        }
                    }
                        // Adding Read More Button
                        result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
                            console.log(data);
        
            } catch (error) {
                result.innerHTML = `<p> Error That Word not avialable in our database !!! </p>`
            }            
    }