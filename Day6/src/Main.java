import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

public class Main {

    private static String direction = "up";
    private static int[] startingPoint = new int[]{};
    private static boolean walk = true;

    private static int part1 = 0;

    public static void main(String[] args) {
        //Path filePath = Paths.get("Day6/src/example.txt");
        Path filePath = Paths.get("Day6/src/input.txt");
        String[][] matrix = Utils.readFileAndConvertToMatrix(filePath);

        startingPoint = findStartingPoint(matrix);

        while(walk) {
            if (direction.equals("up")) goUp(matrix);
            else if (direction.equals("right")) goRight(matrix);
            else if (direction.equals("down")) goDown(matrix);
            else if (direction.equals("left")) goLeft(matrix);
        }

        countX(matrix);
        System.out.println(part1);
    }

    private static void goUp(String[][] matrix) {
        for (int i = startingPoint[0]; i >= 0; i--) {
            if (matrix[i][startingPoint[1]].equals("#")) {
                direction = changeDirection();
                startingPoint[0] = i + 1;
                startingPoint[1] = startingPoint[1] + 1;
                return;
            }
            else if (i == 0) {
                walk = false;
                matrix[i][startingPoint[1]] = "X";
                return;
            }
            else {
                matrix[i][startingPoint[1]] = "X";
            }
        }
    }

    private static void goDown(String[][] matrix) {
        for (int i = startingPoint[0]; i < matrix.length; i++) {
            if (matrix[i][startingPoint[1]].equals("#")) {
                direction = changeDirection();
                startingPoint[0] = i - 1;
                startingPoint[1] = startingPoint[1] - 1;
                return;
            }
            else if (i == matrix.length - 1) {
                walk = false;
                matrix[i][startingPoint[1]] = "X";
                return;
            }
            else {
                matrix[i][startingPoint[1]] = "X";
            }
        }
    }

    private static void goLeft(String[][] matrix) {
        for (int j = startingPoint[1]; j >= 0; j--) {
            if (matrix[startingPoint[0]][j].equals("#")) {
                direction = changeDirection();
                startingPoint[1] = j + 1;
                return;
            }
            else if (j == 0) {
                walk = false;
                matrix[startingPoint[0]][j] = "X";
                return;
            }
            else {
                matrix[startingPoint[0]][j] = "X";
            }
        }
    }

    private static void goRight(String[][] matrix) {
        for (int j = startingPoint[1]; j < matrix.length; j++) {
            if (matrix[startingPoint[0]][j].equals("#")) {
                direction = changeDirection();
                startingPoint[1] = j - 1;
                return;
            }
            else if ( j== matrix.length - 1) {
                matrix[startingPoint[0]][j] = "X";
                walk = false;
                return;
            }
            else {
                matrix[startingPoint[0]][j] = "X";
            }
        }
    }

    private static String changeDirection() {
        if (direction.equals("up")) {
            return "right";
        }
        if (direction.equals("right")) {
            return "down";
        }
        if (direction.equals("down")) {
            return "left";
        }
        if (direction.equals("left")) {
            return "up";
        }

        return null;
    }

    public static void countX(String[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j].equals("X")) {
                    part1++;
                }
            }
        }
    }
    public static int[] findStartingPoint(String[][] matrix) {
        for (int i = 0; i < matrix.length; i++) {
            for (int j = 0; j < matrix[0].length; j++) {
                if (matrix[i][j].equals("^")) {
                    return new int[] {i,j};
                }
            }
        }
        return null;
    }
}
