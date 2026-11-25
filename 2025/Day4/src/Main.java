import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day4/src/example.txt");
        Path filePath = Paths.get("Day4/src/input.txt");
        String[][] lines = Utils.readFileAndConvertToMatrix(filePath);
        int part2 = 0;
        //int gridWidth = 10;
        //int gridHeight = 10;

        int gridWidth = 140;
        int gridHeight = 140;

        boolean run = true;
        int removedCounter = 0;

        while (run) {
            for (int i = 0; i < lines.length; i++) {
                for (int j = 0; j < lines[0].length; j++) {
                    if (lines[i][j].equals("@")) {
                        List<String> soround = Utils.getSouroundingGridElements(lines,i,j,gridWidth,gridHeight);
                        AtomicInteger counter = new AtomicInteger();
                        soround.forEach(e -> {
                            if (e.contains("@")) {
                                counter.getAndIncrement();
                            }
                        });
                        if (counter.get() < 4) {
                            part2++;
                            lines[i][j] = ".";
                        }
                    }
                }
            }
            if (part2 == 0) {
                run = false;
            }
            removedCounter = removedCounter + part2;
            part2 = 0;
        }

        System.out.println(removedCounter);
    }
}