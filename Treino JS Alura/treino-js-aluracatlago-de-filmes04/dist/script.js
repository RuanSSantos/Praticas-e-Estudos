function adicionarFilme() {
  var filmeFavorito = document.getElementById('filme').value;
  var treilerFilme = document.getElementById('treiler').value;
  var elementoListaFilmes = document.getElementById('listaFilmes');

  if (filmeFavorito.trim() !== '') {
    var linkElement = document.createElement('a');
    linkElement.href = treilerFilme;
    linkElement.target = '_blank'; 
    linkElement.rel = 'noopener noreferrer';
    var imgElement = document.createElement('img');
    imgElement.src = filmeFavorito;
    
    linkElement.appendChild(imgElement);
    elementoListaFilmes.appendChild(linkElement);
    
    document.getElementById('filme').value = '';
    document.getElementById('treiler').value = '';
  } else {
    alert('Por favor, insira uma URL de imagem válida.');
  }
}
//   https://upload.wikimedia.org/wikipedia/en/9/99/How_to_Train_Your_Dragon_Poster.jpg
//   https://www.youtube.com/watch?v=oKiYuIsPxYk