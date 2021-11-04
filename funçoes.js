function getCorrect() {

    return document.getElementById("correta").value
}


function getChecked() {

    input = document.querySelectorAll('input')

    console.log(input)

    for (c = 0; c < input.length; c++) {

        if (input[c].checked == true) {

            return input[c].value

            break
        }
    }

}

var entrada;
var correta;

function correçao() {

    entrada = getChecked()
    correta = getCorrect()

    // console.log("Entrada:", getChecked())
    // console.log("Correta:", getCorrect())

    if (entrada == correta) {

        document.getElementById("display").innerHTML = `Parabéns, voce acertou! A alternativa é a letra ${correta}`
        document.getElementById("display").style.display = "block"
    }

    else {
        document.getElementById("display").innerHTML = `Que pena, voce errou! A alternativa é a letra ${correta}`
        document.getElementById("display").style.display = "block"
    }

}


function sobreescrever(objeto, id, index) {

    console.log("sobrescrevendo")

    objetoSplit = objeto.split(" ")

    objetoSplit[index] = `${id}:${entrada}`

    //console.log(memoriaSplit.join(" "))

    return objetoSplit.join(" ")

}

function escrever(objeto, id) {

    console.log("escrevendo")

    objetoSplit = objeto.split(" ")

    objetoSplit.push(`${id}:${entrada}`)

    //console.log(objetoSplit.join(" "))


    return objetoSplit.join(" ")

}

function gravar(oQueGravar) { //armazena no section storage

    sessionStorage.setItem("respostas", oQueGravar)

}

function salvarFormulario(id) {

    entrada = getChecked() //variavel entrada recebe funcao getchecked


    if (sessionStorage.getItem("respostas")) { //pega id respostas

        let substituiu = false //variavel substituiu começa em falso

        memoria = sessionStorage.getItem("respostas") // memoria armazena dados de "resposta"

        memoriaSplit = memoria.split(" ") //memoria split dá espaco entre dados do armazenamento da sectionstorage

        for (c = 0; c < memoriaSplit.length; c++){ //loop para acrescentar respostas no chave memoria, c menor que memoriasplit 

            if (memoriaSplit[c].split(":")[0] == id) {

                substituiu = true

                index = c;

                gravar(sobreescrever(memoria, id, index))

                break;
            } // transforma  id + resposta em padrão q5:D = q5 alternativa, concatena : e resposta D,
        }

        if (!substituiu) {
            gravar(escrever(memoria, id))
        }

    }

    else {
        sessionStorage.setItem("respostas", `${id}:${entrada}`)
    }
}


window.onload = function autofill(id) {

    memoria = sessionStorage.getItem("respostas");

    memoriaSplit = memoria.split(" ");

    for (c = 0; c < memoriaSplit.length; c++) {

        if (memoriaSplit[c].split(":")[0] == id) {

            toFill = memoriaSplit[c].split(":")[0];

            console.log(toFill);

            document.querySelector(`input[c].value="${toFill}"`).checked = true;

            break;
        }
    }
}


function resultado() {

	gabarito = ["q1:D", "q2:A", "q3:E", "q4:A", "q5:C", "q6:B", "q7:B", "q8:E", "q9:B", "q10:A", "q11:B", "q12:B", "q13:E",
				"q14:C", "q15:B", "q16:B", "q17:E", "q18:C", "q19:B", "q20:A", "q21:C", "q22:D", "q23:E", "q24:E", "q25:D", "q26:C",
				"q27:D", "q28:C", "q29:A", "q30:A", "q31:C", "q32:C", "q33:D", "q34:A", "q35:E"]

    quebrar = sessionStorage.getItem("respostas").split(" ")

    corretas = 0;

    for (c = 0; c < quebrar.length; c++) {

        if (gabarito.indexOf(quebrar[c]) > -1) {
            corretas++
        }
    }

    console.log(corretas)

    var porcentagem = corretas / quebrar.length * 100;
    var porcentagem = porcentagem.toFixed(1);


    document.getElementById("acertos").innerHTML = `Seus acertos: ${corretas}`
    document.getElementById("qtt").innerHTML = `Questões respondidas: ${quebrar.length}`
    document.getElementById("porcentagem").innerHTML = `Porcentagem de alternativas corretas: ${porcentagem+"%"}`

}

function inputVazio(){
Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `"Você precisa selecionar alguma alternativa para correção.."`,
  })
}
