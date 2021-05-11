var atual; //Armazena o container que está sendo apresentado na tela (cadastro ou relatório)
var localStorage = Window.localStorage; 

function menuCadastro(){
    atual.classList.add("d-none"); //Para esconder o container em apresentação é feita a adição da classe d-none
    atual = document.getElementById("cadastro"); //Busca o container que apresenta a tela de cadastro
    atual.classList.remove("d-none"); //Remove a classe d-none do container de cadastro para que ele fique visível
}            

function menuRelatorioInner(){ //Função que gera o relatório de pessoas usando innerHTML
    atual.classList.add("d-none"); //Para esconder o container em apresentação é feita a adição da classe d-none
    atual=document.getElementById("relatorio"); //Busca o container que apresenta a tela de relatório
    atual.classList.remove("d-none"); //Remove a classe d-none do container de relatório para que ele fique visível
    var html=""; //Variável que vai conter o trecho de HTML com o corpo da tabela de pessoas
    var keys = Object.keys(localStorage); //Busca na localStorage todas as chaves armazenadas
    keys.forEach(function(chave, pos){ //Percorre o vetor de chaves e para cada chave encontrada, executa o código abaixo
        let pessoa = JSON.parse(localStorage.getItem(chave)); //Recupera o JSON associado a uma determinada chave e o transforma em objeto
        html = html+"<tr>"; //Adiciona a tag TR (linha) ao HTML do corpo da tabela
        html=html+"<td><a href=\"#\" onclick=\"buscaCPF('" +  pessoa.cpf + "');\">"+pessoa.cpf+"</a></td>"; //Adiciona a célula (TD) com o CPF da pessoa. Também é inserido o evento onClick para permitir a edição do cadastro
        html=html+"<td>"+pessoa.nome+"</td>"; //Adiciona a célula de dados (TD) com o nome da pessoa
        html=html+"<td>"+pessoa.email+"</td>"; //Adiciona a célula de dados (TD) com o e-mail da pessoa
        html=html+"<td>"+pessoa.nasc+"</td>"; //Adiciona a célula de dados (TD) com o a data de nascimento da pessoa
        html=html+"</tr>"; //Encerra o elemento TR (linha) da pessoa em processamento
    });
    document.getElementById("corpoTabela").innerHTML=html; //Busca o elemento do corpo da tabela e altera o conteúdo para o trecho de HTML gerado no laço (repetição) acima
}

function menuRelatorioDOM(){ //Função que gera o relatório de pessoas processando a DOM
    atual.classList.add("d-none"); //Para esconder o container em apresentação é feita a adição da classe d-none
    atual=document.getElementById("relatorio"); //Busca o container que apresenta a tela de relatório
    atual.classList.remove("d-none"); //Remove a classe d-none do container de relatório para que ele fique visível
    var keys = Object.keys(localStorage); //Busca na localStorage todas as chaves armazenadas
    //O trecho abaixo é utilizado para remover todos os elementos do corpo da tabela
    while (document.getElementById("corpoTabela").firstChild) { //Estrutura que é repetida enquanto houver elementos dentro do corpo da tabela
        document.getElementById("corpoTabela").removeChild(document.getElementById("corpoTabela").firstChild); //Remove o primeiro elemento existente dentro do corpo da tabela
    }
    keys.forEach(function(chave, pos){ //Percorre o vetor de chaves e para cada chave encontrada, executa o código abaixo
        let pessoa = JSON.parse(localStorage.getItem(chave)); //Recupera o JSON associado a uma determinada chave e o transforma em objeto
        let linha = document.createElement("tr"); //Cria um novo elemento TR (linha)
        let coluna = document.createElement("td"); //Cria um novo elemento TD (celula de dados) para CPF
        let ancora = document.createElement("a"); //Cria uma nova âncora (link)
        ancora.setAttribute("href", "#"); //Determina o endereço de destino da âncora
        ancora.setAttribute("onClick", "buscaCPF('" +  pessoa.cpf + "');"); //Determina o script a ser executado no evento onClick da âncola
        ancora.innerHTML=pessoa.cpf; //Define o CPF da pessoa como texto da âncora (link)
        coluna.appendChild(ancora); //Adiciona a âncora à celula CPF (TD)
        linha.appendChild(coluna); //Adiciona a célula (TD) de CPF à linha (TR)
        coluna = document.createElement("td"); //Cria um novo elemento TD para armazenar o nome
        coluna.innerHTML=pessoa.nome; //Define o nome como texto da célula (TD)
        linha.appendChild(coluna); //Adiciona a célula (TD) de nome à linha (TR)
        coluna = document.createElement("td"); //Cria um novo elemento TD para armazenar o email
        coluna.innerHTML=pessoa.email; //Define o email como texto da célula (TD)
        linha.appendChild(coluna); //Adiciona a célula (TD) de e-mail à linha (TR)
        coluna = document.createElement("td"); //Cria um novo elemento TD para armazenar a data de nascimento
        coluna.innerHTML=pessoa.nasc; //Define a data de nascimento como texto da célula (TD)
        linha.appendChild(coluna); //Adiciona a célula (TD) de data de nascimento à linha (TR)
        document.getElementById("corpoTabela").appendChild(linha); //Adiciona a linha (TR) ao corpo da tabela (TBODY)
    });
    
}

function gravar(){ //Função que grava os dados da interface na LocalStorage
    var novo = new Object(); //Cria um novo objeto "vazio"
    novo.cpf=document.getElementById("cpf").value; //Busca, na interface, o conteúdo do input "cpf" e o define como atributo do objeto "novo"
    novo.nome=document.getElementById("nome").value; //Busca, na interface, o conteúdo do input "nome" e o define como atributo do objeto "novo"
    novo.email=document.getElementById("email").value; //Busca, na interface, o conteúdo do input "email" e o define como atributo do objeto "novo"
    novo.nasc=document.getElementById("nasc").value; //Busca, na interface, o conteúdo do input "nasc" e o define como atributo do objeto "novo"
    var jt = JSON.stringify(novo); //Gera um JSON com as propriedades do objeto "novo"
    localStorage.setItem(novo.cpf, jt); //Armazena o JSON gerado utilizando o CPF como chave
    document.getElementById("btnRemover").classList.remove("d-none"); //Torna o botão "remover" visível na interface
}

function remover(){ //Função que remove um cadastro da LocalStorage
    var cpf = document.getElementById("cpf").value; //Busca, na interface, o conteúdo da inout "cpf"
    localStorage.removeItem(cpf); //Remove, da LocalStorage, a entrada identificada pela chave "cpf"
    document.getElementById("cpf").value=""; //Limpa o input na interface
    document.getElementById("nome").value=""; //Limpa o input na interface
    document.getElementById("email").value=""; //Limpa o input na interface
    document.getElementById("nasc").value=""; //Limpa o input na interface
    document.getElementById("btnRemover").classList.add("d-none"); //"Esconde" o botão remover da interface
}

function buscaCPF(cpf){ //Função que realiza a busca de um determinado CPF na LocalStorage
    menuCadastro(); //Torna a interface de cadastro visível na interface
    var jt = localStorage.getItem(cpf); //Busca, na LocalStorage, o cadastro identificado pelo CPF
    if(jt!=null){ //Se foi encontrado o cadastro. Alimenta os campos na interface, pois trata-se de uma atualização de dados
        var pessoa=JSON.parse(jt); //
        document.getElementById("cpf").value=pessoa.cpf; //Atualiza, na Interface, o conteúdo do campo "cpf"
        document.getElementById("nome").value=pessoa.nome; //Atualiza, na Interface, o conteúdo do campo "nome"
        document.getElementById("email").value=pessoa.email; //Atualiza, na Interface, o conteúdo do campo "email"
        document.getElementById("nasc").value=pessoa.nasc; //Atualiza, na Interface, o conteúdo do campo "nasc"
        document.getElementById("btnRemover").classList.remove("d-none"); //Torna o botão "remover" visível na tela
    }else{ //O cadastro não foi encotnrado. Limpa a interface, pois trata-se de um novo cadastro
        document.getElementById("nome").value=""; //Limpa o conteúdo do campo "nome"
        document.getElementById("email").value=""; //Limpa o conteúdo do campo "email"
        document.getElementById("nasc").value=""; //Limpa o conteúdo do campo "nome"
        document.getElementById("btnRemover").classList.add("d-none"); //Esconde, na interface, o botão "remover"
    }
}

function buscaPessoa(){ //Função que realiza a busca, na LocalStorage, de uma pessoa com base no CPF informado na interface
    var cpf = document.getElementById("cpf").value; //Busca o CPF digitado na interface
    buscaCPF(cpf); //Faz a chamada à função que busca os dados na LocalStorage com base em um CPF
}

