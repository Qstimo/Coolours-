
const cols = document.querySelectorAll('.col');


function copyToClickboard(text){
    return navigator.clipboard.writeText(text)
}

document.addEventListener('click', event=>{
const type = event.target.dataset.type;
if(type === 'lock'){
    const node = event.target.tagName.toLowerCase() === 'i'
    ? event.target
    :event.target.children[0];

    node.classList.toggle('fa-lock-open')
    node.classList.toggle('fa-lock')
     
}else if(type === 'copy'){
    copyToClickboard(event.target.textContent)
}

}
)

// function generateRandomColor() {
//     const hexCodes = '0123456789ABCDEF'
//     let color = ''
//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
//     }
//     return '#' + color
// }



function setTextColor(text,color){
    const luninance = chroma(color).luminance();
    text.style.color = luninance > 0.5 ? 'black':'white'
}

function updateColorsHash(colors = []){
    document.location.hash = colors.map(col=> col.toString().substring(1)).join('-')
}

function getColorsFromHash(){
    if(document.location.hash.length>1){
        return document.location.hash.substring(1).split('-').map(color => '#'+ color)
    }
    return []
}

function setRandomColors(isInitial) {
    const colors = isInitial? getColorsFromHash() : [];
    cols.forEach((col,i) => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock');
        const text = col.querySelector('h2');
        if(isLocked) {
            colors.push(text.textContent);
            return
        }
        const btn = col.querySelector('button');


        const color = isInitial
        ? colors[i] ? colors[i]:chroma.random()
        : chroma.random();

        col.style.background = color;
        text.textContent = color
        setTextColor(text, color)
        setTextColor(btn, color)
        !isInitial && colors.push(color)
    })
    updateColorsHash(colors)
}

document.addEventListener('keydown', event =>{
    event.preventDefault()
    if(event.code === 'Space'){
        setRandomColors()
    }
})




setRandomColors(true)
