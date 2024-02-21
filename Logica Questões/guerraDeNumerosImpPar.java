//Crie uma função que some todos os numeros pares e impares separadamente e depois os subitrais de tal forma que sempre tenha um resultado possitivo.


public class Main {
    public static int diferencaSomaParImpar(int[][] matriz) {
        int somaPar = 0;
        int somaImpar = 0;

       for (int i = 0; i < matriz.length; i++) {
            for (int j = 0; j < matriz[i].length; j++) {
                if (matriz[i][j] % 2 == 0) {
                    somaPares += matriz[i][j];
                } else {
                    somaImpares += matriz[i][j];
                }
            }
        }


        return somaPar - somaImpar;
    }

    public static void main(String[] args) {
        // Exemplo de uso
        int[][] matrizExemplo = {
            {12, 11, 13},
            {12, 14, 13},
            {10, 9, 8}
        };

        int resultado = diferencaSomaParImpar(matrizExemplo);
        System.out.println("A diferença entre a soma dos números pares e ímpares é: " + resultado);
    }
}
