var listaFilmes = [];
var nomeFilmes = ["How to Train your Dragon", "Aranheverso", "Sherek", "Divertidamente"];
listaFilmes[0] = "https://upload.wikimedia.org/wikipedia/pt/0/0b/How_to_Train_Your_Dragon_3_poster.jpg";
listaFilmes[1] = "https://upload.wikimedia.org/wikipedia/pt/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg";
listaFilmes[2] = "https://upload.wikimedia.org/wikipedia/pt/thumb/e/e6/Shrek_Poster.jpg/230px-Shrek_Poster.jpg";
listaFilmes[3] = "https://upload.wikimedia.org/wikipedia/pt/f/f6/Inside_Out_%28filme%29.jpg"

for(i=0; i<listaFilmes.length; i++){
  document.write("<img src ="+ listaFilmes[i] +">");
  document.write(nomeFilmes[i]);
}