import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day4/src/example.txt");
        Path filePath = Paths.get("Day4/src/input.txt");
        String[][] matrix = Utils.readFileAndConvertToMatrix(filePath);

        int part1 = 0;

        /*
        List<List<String>> rows = Grid.extractRows(matrix);
        List<List<String>> cols = Grid.extractColumns(matrix);
        List<List<String>> leftToRightDiagonals = Grid.extractLeftToRightDiagonals(matrix);
        List<List<String>> rightToLeftDiagonals = Grid.extractRightToLeftDiagonals(matrix);

        for (List<String> item : rows) {
            part1 = part1 + countXmas(item);
        }

        for (List<String> item : cols) {
            part1 = part1 + countXmas(item);
        }

        for (List<String> item : leftToRightDiagonals) {
            part1 = part1 + countXmas(item);
        }

        for (List<String> item : rightToLeftDiagonals) {
            part1 = part1 + countXmas(item);
        }

         */

        searchMas(matrix);
        //System.out.println(part1);
    }

    private static void searchMas(String[][] grid) {
        int part2 = 0;

        for (int i = 1; i < grid[0].length - 1; i++) {
            for (int j = 1; j < grid[0].length - 1; j++) {
                String leftDiagonal = grid[i-1][j-1] + grid[i][j] + grid[i+1][j+1];
                String rightDiagonal = grid[i-1][j+1] + grid[i][j] + grid[i+1][j-1];

                if ((leftDiagonal.equals("MAS") || leftDiagonal.equals("SAM")) &&
                (rightDiagonal.equals("MAS") || rightDiagonal.equals("SAM"))) {
                    part2++;
                }
            }
        }

        System.out.println(part2);
    }

    public static int countXmas(List<String> item) {
        String concat = String.join("", item);
        int xmas = concat.split("XMAS", -1).length-1;
        int samx = concat.split("SAMX", -1).length-1;
        return xmas + samx;
    }
}
