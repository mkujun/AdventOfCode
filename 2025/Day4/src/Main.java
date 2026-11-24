import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day4/src/example.txt");
        Path filePath = Paths.get("Day4/src/input.txt");
        String[][] lines = Utils.readFileAndConvertToMatrix(filePath);
        int part1 = 0;
        /*
        int gridWidth = 10;
        int gridHeight = 10;

         */
        int gridWidth = 140;
        int gridHeight = 140;

        for (int i = 0; i < lines.length; i++) {
            for (int j = 0; j < lines[0].length; j++) {
                //System.out.print(lines[i][j]);
                if (lines[i][j].equals("@")) {
                    List<String> soround = Utils.getSouroundingGridElements(lines,i,j,gridWidth,gridHeight);
                    AtomicInteger counter = new AtomicInteger();
                    soround.forEach(e -> {
                        if (e.contains("@")) {
                            counter.getAndIncrement();
                        }
                    });
                    if (counter.get() < 4) {
                        part1++;
                    }
                }
            }
            //System.out.println();
        }
        //System.out.println();

        System.out.println(part1);
    }
}