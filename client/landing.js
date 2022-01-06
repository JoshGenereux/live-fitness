const start = document.querySelector('.button')
const URL = `http://localhost:5432/live-fitness`

start.addEventListener('click', ()=>{
    axios.post(URL)
        .then(res => {
            console.log(res.data)
        }).catch(err => console.log(err))
    window.open('home.html', "_self")
})