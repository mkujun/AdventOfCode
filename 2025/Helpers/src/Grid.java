import java.util.ArrayList;
import java.util.List;

public class Grid {
    public static List<List<String>> extractRows(String[][] matrix) {
        List<List<String>> rows = new ArrayList<>();

        int rowCount = matrix.length;
        int colCount = matrix[0].length;

        for (int row = 0; row < rowCount; row++) {
            List<String> matrixRow = new ArrayList<>();
            for (int col = 0; col < colCount; col++) {
                matrixRow.add(matrix[row][col]);
            }
            rows.add(matrixRow);
        }

        return rows;
    }

    public static List<List<String>> extractColumns(String[][] matrix) {
        List<List<String>> cols = new ArrayList<>();

        int rowCount = matrix.length;
        int colCount = matrix[0].length;

        for (int row = 0; row < rowCount; row++) {
            List<String> matrixRow = new ArrayList<>();
            for (int col = 0; col < colCount; col++) {
                matrixRow.add(matrix[col][row]);
            }
            cols.add(matrixRow);
        }
        return cols;
    }

    public static List<List<String>> extractLeftToRightDiagonals(String[][] matrix) {
        List<List<String>> diagonals = new ArrayList<>();
        int rowCount = matrix.length;
        int colCount = matrix[0].length;

        // Diagonals starting from the first column
        for (int row = 0; row < rowCount; row++) {
            List<String> diagonal = new ArrayList<>();
            int i = row, j = 0; // Start at (row, 0)
            while (i < rowCount && j < colCount) {
                diagonal.add(matrix[i][j]);
                i++;
                j++;
            }
            diagonals.add(diagonal);
        }

        // Diagonals starting from the top row
        for (int col = 1; col < colCount; col++) {
            List<String> diagonal = new ArrayList<>();
            int i = 0, j = col; // Start at (0, col)
            while (i < rowCount && j < colCount) {
                diagonal.add(matrix[i][j]);
                i++;
                j++;
            }
            diagonals.add(diagonal);
        }

        return diagonals;
    }

    public static List<List<String>> extractRightToLeftDiagonals(String[][] matrix) {
        List<List<String>> diagonals = new ArrayList<>();
        int rowCount = matrix.length;
        int colCount = matrix[0].length;

        // Diagonals starting from the last column
        for (int row = 0; row < rowCount; row++) {
            List<String> diagonal = new ArrayList<>();
            int i = row, j = colCount - 1; // Start at (row, last column)
            while (i < rowCount && j >= 0) {
                diagonal.add(matrix[i][j]);
                i++;
                j--;
            }
            diagonals.add(diagonal);
        }

        // Diagonals starting from the top row
        for (int col = colCount - 2; col >= 0; col--) {
            List<String> diagonal = new ArrayList<>();
            int i = 0, j = col; // Start at (0, col)
            while (i < rowCount && j >= 0) {
                diagonal.add(matrix[i][j]);
                i++;
                j--;
            }
            diagonals.add(diagonal);
        }

        return diagonals;
    }
}
