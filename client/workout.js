const pickExercise = document.getElementById('exercise-list-btn')
const exerciseValue = document.getElementById('exercise-list')
const finish = document.getElementById('finish')
const URL = `http://localhost:5432/live-fitness/workout`

window.onload = function (e) {
    document.getElementById('workout-name').innerHTML =
        window.localStorage.getItem('workoutName')
    let hr = 0;let min = 0;let sec = 0;
    function timer(){
        sec = parseInt(sec);min = parseInt(min);hr = parseInt(hr);sec = sec + 1;
        if (sec === 60) {min = min + 1;sec = 0;}
        if (min === 60) {hr = hr + 1;min = 0;sec = 0;}
        if (sec < 10 || sec === 0) {sec = '0' + sec;}
        if (min < 10 || min === 0) {min = '0' + min;}
        if (hr < 10 || hr === 0) {hr = '0' + hr;}
        document.getElementById('time-text').innerHTML =
            hr + ':' + min + ':' + sec;
        setTimeout(timer, 1000)
    }
    timer()
}

function toggleList(){
    const list = document.getElementById('pick-exercise')
    list.style.display === 'none' ? list.style.display = 'block' : list.style.display = 'none';
}

pickExercise.addEventListener('click', ()=>{
    const list = document.getElementById('pick-exercise')
    list.style.display = 'block'
})

exerciseValue.addEventListener('click', addExercise)

let count = 1;
function addExercise(e){
    e.preventDefault()
    let div = document.createElement('div');div.id = `exercise-blockk${count}`
    let h2 = document.createElement('h2');h2.id = `exercise-name${count}`; h2.textContent = e.target.id;
    h2.className = 'exercise'
    let innerDiv = document.createElement('div');innerDiv.id = `add-set${count}`;
    let button = document.createElement('button');button.id = `add-set-btn${count}`; button.innerHTML = 'Add Set'
    div.appendChild(h2);div.appendChild(innerDiv);div.appendChild(button)
    document.getElementById('add-exercise-block').appendChild(div)
    let workoutName = document.getElementById('workout-name')
    toggleList()
    count++;

    let body = {
        workoutName: workoutName.innerHTML,
        exerciseName: h2.innerHTML,
        sets: 0
    }
    let removeSpace = h2.innerHTML.replace(/ /g, "_")
    let exerciseBody = {
        exerciseName: removeSpace
    }
    axios.post(`${URL}/add-exercise`, exerciseBody)
        .then().catch(err => console.log(err))
    // axios.post(URL, body)
    //     .then().catch(err => console.log(err))
}


function addSet(num, set){
    let div = document.createElement('div'); div.id = `${num}new-sets${set}`
    let innerDiv1 = document.createElement('div'); innerDiv1.id = `set-set`;
    let thirdDiv1 = document.createElement('div'); thirdDiv1.id ='set-div'; thirdDiv1.textContent = `Set: `
    let setP = document.createElement('p'); setP.id = `${num}set-count${set}`; setP.innerHTML = `${set}`
    setP.className = 'set'
    innerDiv1.appendChild(thirdDiv1); innerDiv1.appendChild(setP);
    let innerDiv2 = document.createElement('div'); innerDiv2.id ='set-weight';
    let thirdDiv2 = document.createElement('div'); thirdDiv2.id ='weight-div'; thirdDiv2.textContent = 'Weight:'
    let input = document.createElement('input'); input.id = `${num}set-weightnum${set}`; input.type = 'number';
    input.className = 'weight'
    innerDiv2.appendChild(thirdDiv2); innerDiv2.appendChild(input);
    let innerDiv3 = document.createElement('div'); innerDiv3.id = 'set-rep';
    let thirdDiv3 = document.createElement('div'); thirdDiv3.id = 'sets-div'; thirdDiv3.textContent='Reps:'
    let setInput = document.createElement('input'); setInput.id = `${set}set-repnum${set}`; setInput.type = 'number';
    setInput.className = 'rep'
    innerDiv3.appendChild(thirdDiv3); innerDiv3.appendChild(setInput)
    let innerDiv5 = document.createElement('div'); innerDiv5.id = 'save-div'
    let saveB = document.createElement('button'); saveB.id = `${num}save-set${set}`; saveB.innerHTML = '&#10004';
    saveB.onclick = saveBtn; innerDiv5.appendChild(saveB);
    let innerDiv4 = document.createElement('div'); innerDiv4.id = 'button-div';
    let button = document.createElement('button'); button.id = `${num}delete-set${set}`;button.innerHTML = '&#9746'
    innerDiv4.appendChild(button);
    div.appendChild(innerDiv1); div.appendChild(innerDiv2); div.appendChild(innerDiv3); div.appendChild(innerDiv5)
    div.appendChild(innerDiv4)
    let add = document.getElementById(`add-set${num}`);
    add.appendChild(div)
}

document.querySelector('body').addEventListener('click', addSetBtn)
let one = 1;let two = 1;let three = 1;let four = 1;let five = 1;
let six = 1;let seven = 1;let eight = 1;let nine = 1;let ten = 1;
function addSetBtn(e){
    switch (e.target.id) {
        case 'add-set-btn1':
            addSet(1, one)
            one++;
            break
        case 'add-set-btn2':
            addSet(2, two)
            two++;
            break
        case 'add-set-btn3':
            addSet(3, three)
            three++;
            break
        case 'add-set-btn4':
            addSet(4, four)
            four++;
            break
        case 'add-set-btn5':
            addSet(5, five)
            five++;
            break
        case 'add-set-btn6':
            addSet(6, six)
            six++;
            break
        case 'add-set-btn7':
            addSet(7, seven)
            seven++;
            break
        case 'add-set-btn8':
            addSet(8, eight)
            eight++;
            break
        case 'add-set-btn9':
            addSet(9, nine)
            nine++;
            break
        case 'add-set-btn10':
            addSet(10, ten)
            ten++;
            break
    }
}

// finish.addEventListener('click', finishFunc);
// function finishFunc(){
//     axios.get()
// }

function saveBtn(e) {
    let button = e.target
    button.style.backgroundColor = 'green'
    let node = (e.target.parentElement.parentElement)
    let set = node.getElementsByClassName('set')[0].innerHTML
    let weight = node.getElementsByClassName('weight')[0]
    weight.disabled = true;
    let reps = node.getElementsByClassName('rep')[0]
    reps.disabled = true;
    let exercise = node.parentElement.parentElement.getElementsByClassName('exercise')[0]
    let removeSpace = exercise.innerHTML.replace(/ /g, "_")

    let body = {
        exercise: removeSpace,
        set: set,
        weight: weight.value,
        reps: reps.value
    }

    axios.post(`${URL}/save-set`, body)
        .then(res => {
            console.log(res)
        }).catch(err => console.log(err))

    button.addEventListener('click', redo)
}

function redo(e){
    let button = e.target
    button.style.backgroundColor = 'grey'
}




