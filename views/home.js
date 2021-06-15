function toDoGet(url) {
    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()
    return request.responseText
}

function createLine(usuario) {
    console.log(usuario)
    line = document.createElement("tr")

    tdId = document.createElement("td")
    tdName = document.createElement("td")
    tdEmail = document.createElement("td")

    tdId.innerHTML = usuario._id
    tdName.innerHTML = usuario.name
    tdEmail.innerHTML = usuario.email


    line.appendChild(tdId)
    line.appendChild(tdName)
    line.appendChild(tdEmail)


    return line
}

function main() {
    let data = toDoGet("http://localhost:3000/user/")
    let usuarios = JSON.parse(data)
    let table = document.getElementById("table")
    usuarios.forEach(element => {
        let line = createLine(element)
        table.appendChild(line)
    })

    document.querySelector('.btn').onclick = function(){
    var randomico = Math.random()
    var max = usuarios.length
    const sort = Math.floor(randomico * max)

    let x = usuarios[sort]

    document.getElementById('resultadoName').innerHTML = x.name
    document.getElementById('resultadoEmail').innerHTML = x.email

    }

}

main()









