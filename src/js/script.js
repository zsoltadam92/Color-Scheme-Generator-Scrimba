import '../scss/style.scss'

fetch('https://www.thecolorapi.com/scheme?hex=0047AB')
.then(res => res.json())
.then(data => {
  const listOfModes = Object.keys(data._links.schemes)
  document.getElementById('selectMode').innerHTML = listOfModes.map(mode => `<option value="${mode}">${mode}</option>`)
  renderColors(data)
})
.catch((error) => {
  console.error('Error:', error)
})

document.getElementById('colorSchemeForm').addEventListener('submit', (e) => {
  e.preventDefault()
  const currentColor = document.getElementById('inputColor').value.split('').slice(1).join("")
  const currentMode = document.getElementById('selectMode').value
  fetch(`https://www.thecolorapi.com/scheme?hex=${currentColor}&mode=${currentMode}`)
  .then(res => res.json())
  .then(data => renderColors(data))
  .catch((error) => {
    console.error('Error:', error)
  })
})


function renderColors(data) {
  const colorColumns = document.querySelectorAll('.main__color')
  Array.from(colorColumns).map((colorColumn,index)=> colorColumn.style.background =  data.colors[index].hex.value)
  const hexNames = document.querySelectorAll('.footer__color-hex')
  Array.from(hexNames).map((hexName,index)=> hexName.innerHTML = `<p>${data.colors[index].hex.value}</p>`)    
}