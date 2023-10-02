'use strict'
/*
 CRUD -> CREATE READ UPDATE DELETE
*/

const getLocalStorage = () => JSON.parse(localStorage.getItem("bd_client"));
const setLocalStorage = (dbClient) => localStorage.setItem("bd_client", JSON.stringify(dbClient));


const clearForm = () => {
    document.querySelector("#boxProduto").value = "";
    document.querySelector("#mes").value = "";
    document.querySelector("#ano").value = "";
    document.querySelector("#boxDia").value = "";
    document.querySelector("#tipoProduto").value = "";
    document.querySelector("#boxQuantidade").value = "";
    document.querySelector("#boxPreco").value = "";
}
//Delete
const deleteClient = (index) => {
    const bdClient = readClient();
    bdClient.splice(index, 1);
    setLocalStorage(bdClient);
}

// update
const updateClient = (index, client) => {
    const bdClient = readClient();
    bdClient[index] = client;
    setLocalStorage(bdClient);
}

//READ
const readClient = () => getLocalStorage();

//CREATE
const createClient = (client) => {
    let bd_client = getLocalStorage();
    if(bd_client == null) bd_client = Array();
    bd_client.push(client);
    setLocalStorage(bd_client);
}

const isValidFields = () => {
    const dia = document.querySelector("#boxDia").value;
    const mes = document.querySelector("#mes").value;
    const ano = document.querySelector("#ano").value;
    const nomeProduto = document.querySelector("#boxProduto").value;
    const tipoProduto = document.querySelector("#tipoProduto").value;
    const qntProduto = document.querySelector("#boxQuantidade").value;
    const precoProduto = document.querySelector("#boxPreco").value;

    if(dia == '' || mes == '' || ano =='' || nomeProduto == '' || tipoProduto == '' || qntProduto == '' || precoProduto == ''){
        return false;
    };

    return true;
}


//interação com layout
const saveClient = () => {
    if(isValidFields()){
        const client = {
            nomeProduto: document.querySelector("#boxProduto").value,
            mes: document.querySelector("#mes").value,
            ano: document.querySelector("#ano").value,
            dia: document.querySelector("#boxDia").value,
            tipoProduto: document.querySelector("#tipoProduto").value,
            qntProduto: document.querySelector("#boxQuantidade").value,
            precoProduto: document.querySelector("#boxPreco").value
        }
        createClient(client);
        clearForm();
        document.querySelector("#tituloModal").innerHTML = "Cadastro concluido";
        document.querySelector("#bodyModal").innerHTML = " Seu cadastro foi concluido com sucesso!";

    }else{
        document.querySelector("#tituloModal").innerHTML = "Cadastro não concluido";
        document.querySelector("#bodyModal").innerHTML = " algum(uns) dado(s) não preenchido(s) corretamente";
    }
}

const createRow = (client, index) => {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${client.nomeProduto}</td>
        <td>${client.tipoProduto}</td>
        <td>${client.qntProduto}</td>
        <td>${client.precoProduto}</td>
        <td>${client.dia} / ${parseInt(client.mes) + 1} / ${client.ano}</td>
        <td>
            <button class="btn btn-success"  data-bs-toggle="modal" data-bs-target="#modalEdit" id="edit-${index}">Editar</button>
            <button class="btn btn-danger" id="delete-${index}">excluir</button>
        </td>
    `;
    document.querySelector("#tableClient tbody").appendChild(newRow);
}

const clearTable = () => {
    const rows = document.querySelectorAll("#tableClient tbody tr");
    rows.forEach(rows => rows.parentNode.removeChild(rows));
}
const updateTable = () => {
    const bdClient = readClient();
    clearTable();
    bdClient.forEach(createRow);
}
if(document.querySelector("#cadastro") != null) updateTable();


const fillFields = (client) => {
    document.querySelector("#boxProduto").value = client.nomeProduto;
    document.querySelector("#boxDia").value = client.dia;
    document.querySelector("#mes").value = client.mes;
    document.querySelector("#ano").value = client.ano;
    document.querySelector("#tipoProduto").value = client.tipoProduto;
    document.querySelector("#boxQuantidade").value = client.qntProduto;
    document.querySelector("#boxPreco").value = client.precoProduto;

}

const editClient = (index) => {
    const client = readClient();
    fillFields(client[index]);
}

//o target retorna uma referencia do objeto na qual o evento aconteceu
const editDelete = (event) => {
    if(event.target.type == "submit"){
        const [action, index] = event.target.id.split("-");
        
        if(action =="edit"){
            editClient(index);
            // document.getElementById("saveEditClient").dataset.index = index;
            document.getElementById("saveEditClient").setAttribute("data-index", index);
        }else{
            const bdClient = readClient();
            bdClient.splice(index, 1);
            setLocalStorage(bdClient);
            location.reload();
        }
    }
}
/*
    para fazer a leitura do data-action personalizado usa-se a leitura do mesmo usando o nome criado depois do data-* juntamente com dataset
*/ 
const saveEditClient = () => {
    const bdClient = readClient();
    const client = {
        nomeProduto: document.querySelector("#boxProduto").value,
        mes: document.querySelector("#mes").value,
        ano: document.querySelector("#ano").value,
        dia: document.querySelector("#boxDia").value,
        tipoProduto: document.querySelector("#tipoProduto").value,
        qntProduto: document.querySelector("#boxQuantidade").value,
        precoProduto: document.querySelector("#boxPreco").value,
    }
    const newClient = document.getElementById("saveEditClient").dataset.index;
    updateClient(newClient, client);
    location.reload();
}
//eventos

const saveClients = document.querySelector("#botao");
if(saveClients != null) saveClients.addEventListener("click", saveClient);

const editDeletes = document.querySelector("#tableClient tbody");
if(editDeletes != null && editDeletes != undefined) editDeletes.addEventListener("click", editDelete);

const saveEditClients = document.querySelector("#saveEditClient");
if (saveEditClients != null) saveEditClients.addEventListener("click", saveEditClient);

