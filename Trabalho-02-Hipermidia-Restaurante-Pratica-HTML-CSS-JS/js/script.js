(function(global) {

  var doc = {};

  var htmlPaginaInicial = "components/pagina-inicial.html";
  var itensCategoriasUrl =
    "data/categorias.json";
  var htmlTituloCategorias = "components/titulo-categorias.html";
  var htmlCategorias = "components/categorias.html";
  var itensCardapioUrl = "data/itens_cardapio/";
  var htmlTituloItensCardapio = "components/titulo-itens-cardapio.html";
  var htmlItensCardapio = "components/itens-cardapio.html";

  // Função para inserir um código html em um determinado elemento
  function insereHtml(seletor, html) {
    var elemento = document.querySelector(seletor);
    elemento.innerHTML = html;

  }

  // Mostra o ícone de carregamento dentro do elemento identificado por 'seletor'.
  function exibeLoader(seletor) {
    var html = "<div class='text-center'>";

    html += "<img class='loader' src='images/ajax-loader.gif'></div>";

    insereHtml(seletor, html);
  };

  // Substitui o nome da propriedade pelo seu respectivo valor em uma determinada string
  function inserePropriedade(string, nomeProp, valorProp) {
    var propSubstituir = "{{" + nomeProp + "}}";
    string = string.replace(
    new RegExp(propSubstituir, "g"), valorProp
    );
    return string;
  };

  // Ao carregar a página, antes das imagens e CSS
  document.addEventListener("DOMContentLoaded", function(event) {
    $ajaxUtils.sendGetRequest(
    htmlPaginaInicial,
    function(resposta) {
    document.querySelector("#principal").innerHTML =resposta;
    },
    false
    );
  });

  // Builds HTML for the categories page based on the data
  // from the server
  function exibirVisaoCategorias(categorias) {
    // Carrega o título da página de categorias
    $ajaxUtils.sendGetRequest(
    htmlTituloCategorias,
    function(htmlTituloCategorias) {
    // Vamos incluir aqui...
      $ajaxUtils.sendGetRequest(htmlCategorias,
        function(htmlCategorias) {
        var htmlVisaoCategorias = criaVisaoCategorias(
        categorias,
        htmlTituloCategorias,
        htmlCategorias
        );
        insereHtml("#principal", htmlVisaoCategorias);
        },
    false
    );
  },
    false
    );
}

  // Usa os dados das categorias e componentes html para criar a visão das categorias
  function criaVisaoCategorias(categorias, htmlTituloCategorias,
    htmlCategorias) {
    var htmlFinal = htmlTituloCategorias;
    htmlFinal += "<section class='row'>";

    // Percorrer todas as categorias #3
    for (var i = 0; i < categorias.length; i++) {
    // Inserir valores das categorias
    var html = htmlCategorias;
    var nome ="" + categorias[i].nome;
    var codigo = categorias[i].codigo;
    html = inserePropriedade(html, "nome", nome);
    html = inserePropriedade(html,"codigo", codigo);
    htmlFinal += html;
    }
    htmlFinal += "</section>";
    return htmlFinal;
  }


  function exibirVisaoItensCardapio(itensCardapioCategoria) {
    $ajaxUtils.sendGetRequest(
    htmlTituloItensCardapio,
      function(htmlTituloItensCardapio) { // #4
      $ajaxUtils.sendGetRequest(
      htmlItensCardapio,
        function(htmlItensCardapio) { // #5
        var htmlVisaoItensCardapio = criaVisaoItensCardapio(
        itensCardapioCategoria,
        htmlTituloItensCardapio,
        htmlItensCardapio
        );
        insereHtml("#principal", htmlVisaoItensCardapio);
        },
    false
    );
  },
    false
    );
}

  // Usa os dados dos itens e componentes html para criar a visão itens do cardápio
  function criaVisaoItensCardapio(
    itensCardapioCategoria,
    htmlTituloItensCardapio,
    htmlItensCardapio
  ) {
      // #6 Modificar propriedades do título
      htmlTituloItensCardapio = inserePropriedade(
      htmlTituloItensCardapio, "nome",
      itensCardapioCategoria.categoria.nome);

      htmlTituloItensCardapio = inserePropriedade(
      htmlTituloItensCardapio, "descricao",
      itensCardapioCategoria.categoria.descricao);
    
      var htmlFinal = htmlTituloItensCardapio;
      htmlFinal += "<section class='row'>";

      // #7

      var itensCardapio = itensCardapioCategoria.itens_cardapio;

      var codigoCategoria = itensCardapioCategoria.categoria.codigo;
      for (var i = 0; i < itensCardapio.length; i++) {
      var html = htmlItensCardapio;
      html = inserePropriedade(html, "codigo", itensCardapio[i].codigo);
      html = inserePropriedade(html, "codigo_categoria", codigoCategoria);
      // #8
        html = inserePreco(html, "preco_porcao_pequena", 
itensCardapio[i].preco_porcao_pequena);

        html = inserePorcao(html, "nome_porcao_pequena",
itensCardapio[i].nome_porcao_pequena);

        html = inserePreco(html, "preco_porcao_grande", itensCardapio[i].preco_porcao_grande);

        html = inserePorcao(html, "nome_porcao_grande", itensCardapio[i].nome_porcao_grande);

        html = inserePropriedade(html, "nome", itensCardapio[i].nome);
        
        html = inserePropriedade(html, "descricao", itensCardapio[i].descricao);
        
      htmlFinal += html;
      }

      htmlFinal += "</section>";
      return htmlFinal;
  }

  // Adiciona 'R$ ' na frente do preço se especificado
  function inserePreco(html, nomeProp, valorProp) {
      if (!valorProp) {
      return inserePropriedade(html, nomeProp, "");
      }

      valorProp = "R$ " + valorProp.toFixed(2);
      html = inserePropriedade(html, nomeProp, valorProp);
      return html;
  }

  // Adiciona o nome da porção em parênteses se especificado
  function inserePorcao(html, nomeProp, valorProp) {
      if (!valorProp) {
      return inserePropriedade(html, nomeProp, "");
      }

      valorProp = "(" + valorProp + ")";
      html = inserePropriedade(html, nomeProp, valorProp);
      return html;
  }

  // Carrega a visão das categorias.
  doc.carregarCategorias = function() {
    exibeLoader("#principal");
    $ajaxUtils.sendGetRequest(
    itensCategoriasUrl,
    exibirVisaoCategorias
    );
  };

  // Carrega os itens do cardapio para uma determinada categoria..
  doc.carregarItensCardapio = function(codigoCategoria) {
    exibeLoader("#principal");
    $ajaxUtils.sendGetRequest(itensCardapioUrl + codigoCategoria +".json",
    exibirVisaoItensCardapio
    );
  };

  global.$doc = doc;

})(window);