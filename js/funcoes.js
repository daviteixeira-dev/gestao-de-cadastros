function validarCliente(idNomeCliente, idEnderecoCliente, idCPF){
    let nome = document.getElementById(idNomeCliente).value;
    let endereco = document.getElementById(idEnderecoCliente).value;
    let cpf = document.getElementById(idCPF).value;

    if (nome == "")
        alert("Nome do cliente não pode estar em branco. Favor preenchê-lo!");
    else if (endereco == "")
        alert("Endereço do cliente não pode estar em branco. Favor preenchê-lo!");
    else if(cpf == "")
        alert("CPF do cliente não pode estar em branco. Favor preenchê-lo!");
    else cadastrarCliente(nome, endereco, cpf);
}

function validarProduto(idNomeProduto, idCodProduto, idQtidadeProduto){
    let nome = document.getElementById(idNomeProduto).value;
    let codigo = document.getElementById(idCodProduto).value;
    let qtidade = document.getElementById(idQtidadeProduto).value;

    if (nome == "")
        alert("Nome do produto não pode estar em branco. Favor preenchê-lo!");
    else if (codigo == "")
        alert("Código do produto não pode estar em branco. Favor preenchê-lo!");
    else cadastrarProduto(nome, codigo, parseInt(qtidade));
}

function cadastrarProduto(produto, codig, qtidade) {
    let novoProduto = {nome:produto, codigo:codig, quantidade:qtidade};

    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        if (produtos == null) produtos = []; // Nenhum produto ainda foi cadastrado
        else produtos = JSON.parse(produtos);
        produtos.push(novoProduto); // Adiciona um novo produto
        localStorage.setItem("produtos",JSON.stringify(produtos))
        alert("Foram cadastradas com sucesso "+qtidade+" unidades do produto "+ produto+"!");
        atualizarTotalEstoque("totalEstoque");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

function cadastrarCliente(nome, endereco, cpf) {
    let novoCliente = {nome:nome, endereco:endereco, cpf:cpf};

    if (typeof(Storage) !== "undefined") {
        let clientes = localStorage.getItem("clientes");
        if (clientes == null) clientes = []; // Nenhum cliente ainda foi cadastrado
        else clientes = JSON.parse(clientes);
        clientes.push(novoCliente); // Adiciona um novo cliente
        localStorage.setItem("clientes",JSON.stringify(clientes))
        alert("Foram cadastradas com sucesso "+clientes.length+" clientes!");
        atualizarTotalClientes("totalClientes");
        location.reload();
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Função: atualizarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------

function atualizarTotalEstoque(idCampo1) {
    localStorage.setItem("totalEstoque",++document.getElementById(idCampo1).innerHTML)
}

function atualizarTotalClientes(idCampo2) {
    localStorage.setItem("totalClientes",++document.getElementById(idCampo2).innerHTML)
}

//-----------------------------------------------------------------------------------------------------------
// Função: carregarTotalEstoque(idCampo)
// Incrementa a quantidade de itens cadastrado no estoque (carrinho localizado no canto superior da tela)
// Parâmetros:
// - idCampo: identificador do campo que contem a quantidade de itens no estoque
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------

function carregarTotalEstoque(idCampo1) {
    if (typeof(Storage) !== "undefined") {
        let totalEstoque = localStorage.getItem("totalEstoque");
        if (totalEstoque == null) totalEstoque = 0;
        document.getElementById(idCampo1).innerHTML = totalEstoque;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

function carregarTotalClientes(idCampo2) {
    if (typeof(Storage) !== "undefined") {
        let totalClientes = localStorage.getItem("totalClientes");
        if (totalClientes == null) totalClientes = 0;
        document.getElementById(idCampo2).innerHTML = totalClientes;
    }
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível executar essa aplicação");
}

//-----------------------------------------------------------------------------------------------------------
// Exibe todos os itens do estoque (nome, código e quantidade)
// Retorno: nenhum
//-----------------------------------------------------------------------------------------------------------

function listarEstoque() {
    if (typeof(Storage) !== "undefined") {
        let produtos = localStorage.getItem("produtos");
        document.write("<h1>Estoque:</h1>")
        if (produtos == null)
            document.write("<h3>Ainda não há nenhum item no estoque</h3>");
        else {
            produtos = JSON.parse(produtos);
            produtos.forEach(produto => {
                document.write("<ul>");
                document.write("<li>Nome do produto: "+produto.nome+"</li>");
                document.write("<li>Código do produto: "+produto.codigo+"</li>");
                document.write("<li>Quantidade no estoque: "+produto.quantidade+"</li>");
                document.write("</ul>");
            });
        }
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
}

function listarClientes() {
    if (typeof(Storage) !== "undefined") {
        let clientes = localStorage.getItem("clientes");
        document.write("<h1>Clientes:</h1>")
        if (clientes == null)
            document.write("<h3>Ainda não há nenhum cliente cadastrado</h3>");
        else {
            clientes = JSON.parse(clientes);
            clientes.forEach(cliente => {
                document.write("<ul>");
                document.write("<li>Nome do cliente: "+cliente.nome+"</li>");
                document.write("<li>Endereço do cliente: "+cliente.endereco+"</li>");
                document.write("<li>CPF do cliente: "+cliente.cpf+"</li>");
                document.write("</ul>");
            });
        }
    } 
    else alert("A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!");    
}