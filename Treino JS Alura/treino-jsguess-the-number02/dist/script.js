var secretNumber = Math.floor(Math.random()*11);
var guessCont = 1;
var guessTry = 1;
var guess = prompt('tente adivinhar o numero de 1 a 10')
while(guess!=secretNumber && guessTry !=5){
  guessCont = guessCont+1;
  guessTry++;
  if(guess>10 || guess<1){
    alert('Por favor, digite um numero valido');
    guess = prompt('insira um numero valido');
  }else if(guess<secretNumber && guess>=1){
    guess = prompt("Voce tentou: "+ guess+'\nChutou baixo! tente novamente!');
  }else if(guess>secretNumber && guess<=10){
    guess = prompt("Voce tentou: "+ guess+"\nChutou alto! Tente novamente!");
  } 
}
alert("Fim de jogo! Você tentou Acerta o numero: " +guessCont+  "\nO numero era: "+ secretNumber);