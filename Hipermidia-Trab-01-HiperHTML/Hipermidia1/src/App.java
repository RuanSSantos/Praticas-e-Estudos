
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Scanner;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class App {
    private static final String FILENAME = "verbetesWikipedia.xml";
    private static HashMap<Integer, Pagina> Paginas = new HashMap<>(); // Crianção do hash

    public static void main(String[] args) {
        cache();
        // Ja iniciando o carregamento do verbate
        // Instantiate the Factory
        System.out.println("Digite o titulo de pesquisa");
        Scanner scan = new Scanner(System.in);
        String[] pesquisa;
        do {
            // Iniciando a pesquisa
            ArrayList<Pesquisa> Resultados = new ArrayList<>();


            pesquisa = scan.nextLine().toLowerCase().split(" ");


            for (int i = 0; i < Paginas.size(); i++) {
                int points = 0;
                for (int j = 0; j < pesquisa.length; j++) {
                    if (Paginas.get(i).getWords().containsKey(pesquisa[j])) {
                        if (Paginas.get(i).getWords().get(pesquisa[j]) > 0)
                            points += Paginas.get(i).getWords().get(pesquisa[j]).intValue();

                        Pesquisa atual = new Pesquisa(Paginas.get(i).getId(), Paginas.get(i).getTitle(), points);
                        Resultados.add(atual);

                    }
                }
            }

            if(!Resultados.isEmpty()){
                Comparator<Pesquisa> relevancia = Collections.reverseOrder(Comparator.comparing(Pesquisa::getPoints));
                Collections.sort(Resultados, relevancia);
                for (int i = 0; i < Resultados.size(); i++) {
                    if (i <= 9) {
                        System.out.println(
                                "Id: " + Resultados.get(i).getId() + ", Titulo: " + Resultados.get(i).getTitulo()
                                        + ", Relevancia: "
                                        + Resultados.get(i).getPoints());
                    }
                }Resultados.clear(); //clean resultados para se usado novamente

            }else{
                System.out.println("Palavra não Encontrada!!");
            }

            System.out.println("Gostaria de fazer uma nova pesquisa?(digite 'n' para sair)");

        } while (!pesquisa[0].equals("n"));
        System.out.println("Saindo do modo de pesquisa");
        scan.close();

    }

    public static void cache() {
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        try {

            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.parse(new File(FILENAME));

            NodeList list = doc.getElementsByTagName("page");
            // page per page
            for (int temp = 0; temp < list.getLength(); temp++) {
                // convertendo para ser lido em string
                Node node = list.item(temp);
                if (node.getNodeType() == Node.ELEMENT_NODE) {
                    Element element = (Element) node;
                    // Get ID
                    String id = element.getElementsByTagName("id").item(0).getTextContent();

                    // Transformando o texto e titulo em um vetor de strings
                    String[] title = element.getElementsByTagName("title").item(0).getTextContent().split(" ");
                    String[] text = element.getElementsByTagName("text").item(0).getTextContent().toLowerCase()
                            .split(" ");

                    // Criando a hash do verbate
                    HashMap<String, Integer> Words = new HashMap<>();

                    // Passando palavra por palavra dos titulos
                    // em caso de não ter a palavra, adiciona a palvara ja com o valor 50, se tiver ja a palavra add + 50
                    for (int value = 0; value < title.length; value++) {
                        String PALAVRA = title[value].toLowerCase();
                        if (PALAVRA.length() >= 3) {
                            if (Words.containsKey(PALAVRA)) {
                                Words.replace(PALAVRA, Words.get(PALAVRA), Words.get(PALAVRA) + 50);
                            } else {
                                Words.put(PALAVRA, 50);
                            }
                        }
                    }
                    // mesmo processo anterior, mas com texto
                    for (int value = 0; value < text.length; value++) {
                        String PALAVRA = text[value].toLowerCase();
                        if (PALAVRA.length() >= 3) {
                            if (Words.containsKey(PALAVRA)) {
                                Words.replace(PALAVRA, Words.get(PALAVRA), Words.get(PALAVRA) + 1);
                            } else {
                                Words.put(PALAVRA, 1);
                            }
                        }
                    }
                    Pagina pagina = new Pagina(id, element.getElementsByTagName("title").item(0).getTextContent(), Words);
                    Paginas.put(temp, pagina);
                }
            }
        } catch (ParserConfigurationException | SAXException | IOException e) {
            e.printStackTrace();
        }
    }

    static class Pagina {
        public Pagina(String id, String title, HashMap<String, Integer> Words) {
            this.id = id;
            this.title = title;
            this.Words = Words;
        }


        private String id;
        private String title;
        private HashMap<String, Integer> Words;

        public HashMap<String, Integer> getWords() {
            return Words;
        }

        public String getId() {
            return id;
        }

        public String getTitle() {
            return title;
        }

    }
    // Mostrar resultado
    static class Pesquisa {
        private String id;
        private String titulo;
        private int points;

        public Pesquisa(String id, String titulo, int points) {
            this.id = id;
            this.titulo = titulo;
            this.points = points;
        }

        public String getTitulo() {
            return titulo;
        }

        public int getPoints() {
            return points;
        }

        public String getId() {
            return id;
        }
    }

}