import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    static int part2 = 0;

    public static void main(String[] args) {
        //Path filePath = Paths.get("Day2/src/example.txt");
        Path filePath = Paths.get("Day2/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        readReportLineFrom(lines);

        System.out.println(part2);
    }

    private static void readReportLineFrom(List<String> lines) {
        for (String line: lines) {
            if(isReportLineSafe(line)) {
                part2++;
            }
            else {
                removeLevelFromReportLine(line);
            }
        }
    }

    private static void removeLevelFromReportLine(String line) {
        String[] levels = line.split(" ");

        for (int i = 0; i < levels.length; i++) {
            String[] newLevels = removeElementAtIndex(levels, i);
            if(isReportLineSafe(String.join(" ", newLevels))) {
                part2++;
                break;
            }
        }
    }

    private static boolean isReportLineSafe(String levelString) {
        boolean isAscending = true;
        boolean isDescending = true;

        String[] levels = levelString.split(" ");

        for (int i = 0; i < levels.length - 1; i++) {
            int current = Integer.parseInt(levels[i]);
            int next = Integer.parseInt(levels[i + 1]);

            if (Math.abs(current - next) > 3 || current == next) {
                isAscending = false;
                isDescending = false;
            }
            if (current > next) {
                isAscending = false;
            } else if (current < next) {
                isDescending = false;
            }
        }

        return isAscending || isDescending;
    }

    private static String[] removeElementAtIndex(String[] array, int index) {
        if (index < 0 || index >= array.length) {
            throw new IndexOutOfBoundsException("Index out of bounds: " + index);
        }

        String[] newArray = new String[array.length - 1];
        int newIndex = 0;

        for (int i = 0; i < array.length; i++) {
            if (i != index) {
                newArray[newIndex++] = array[i];
            }
        }
        return newArray;
    }
}