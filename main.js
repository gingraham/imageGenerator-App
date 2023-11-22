import './style.css';

const form = document.querySelector('form');
const button = document.querySelector('button')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
  showSpinner()
    const data = new FormData(form);

    const response = await fetch('http://localhost:8080/dream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: data.get('prompt'),
      }),
    });
    
if(response.ok){
  const { image } = await response.json();
  const result = document.querySelector('#display');
  result.innerHTML = `<img src="${image}" width="512" />`;
}else{
  const err = await response.text();
  alert(err)
  console.error(err)
}
  
    hideSpinner()
});

function showSpinner(){
button.disabled = true;
button.innerHTML = `Thinking...<span ><img class="spinner" src="assets/images/ai_spinner.png" width="20" height="20" /></span>`
}

function hideSpinner(){
 button.disabled = false;
 button.innerHTML = `Think of an image`
}