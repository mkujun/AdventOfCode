import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;

public class Utils {
    public static List<String> readFile(Path filePath) {
        List<String> lines = Collections.emptyList();
        try {
            lines = Files.readAllLines(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return lines;
    }

    public static String[][] readFileAndConvertToMatrix(Path filePath) {
        // Read all lines from the file
        List<String> lines = Collections.emptyList();
        try {
            lines = Files.readAllLines(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<List<String>> matrix = new ArrayList<>();
        for (String line : lines) {
            //List<String> chars = List.of(line.split(""));
            List<String> chars = Collections.unmodifiableList(Arrays.asList(line.split(""))); // java 8

            matrix.add(chars);
        }

        // Convert List<List<String>> to String[][]
        String[][] result = new String[matrix.size()][]; // Initialize 2D array with row count
        for (int i = 0; i < matrix.size(); i++) {
            List<String> row = matrix.get(i);
            result[i] = row.toArray(new String[0]); // Convert each row to String[]
        }

        return result;
    }

    public static void printGrid(String[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                System.out.print(grid[i][j]);
            }
            System.out.println();
        }
        System.out.println();
    }

    public static List<int[]> getGridBoundedPointsOnLine(int x1, int y1, int x2, int y2, int width, int height) {
        List<int[]> result = new ArrayList<>();

        int dx = x2 - x1;
        int dy = y2 - y1;

        int g = gcd(Math.abs(dx), Math.abs(dy));
        int stepX = dx / g;
        int stepY = dy / g;

        // Move in both directions from (x1, y1) until we go out of bounds
        for (int k = 0; ; k++) {
            int x = x1 + k * stepX;
            int y = y1 + k * stepY;
            if (inBounds(x, y, width, height)) {
                result.add(new int[]{x, y});
            } else {
                break;
            }
        }

        for (int k = -1; ; k--) {
            int x = x1 + k * stepX;
            int y = y1 + k * stepY;
            if (inBounds(x, y, width, height)) {
                result.add(new int[]{x, y});
            } else {
                break;
            }
        }

        // Sort results by x, then y (optional)
        result.sort(Comparator.comparingInt((int[] a) -> a[0])
                .thenComparingInt(a -> a[1]));

        return result;
    }

    private static boolean inBounds(int x, int y, int width, int height) {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    private static int gcd(int a, int b) {
        while (b != 0) {
            int tmp = a % b;
            a = b;
            b = tmp;
        }
        return a;
    }
}
