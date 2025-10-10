import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.PrintStream;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Main {
    static int part1 = 1;
    static boolean hasOnlyOnes = true;

    public static void main(String[] args) throws FileNotFoundException {
        //Path filePath = Paths.get("Day14/src/example.txt");
        //Path filePath = Paths.get("Day14/src/test.txt");
        Path filePath = Paths.get("Day14/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        //int xBound = 7;
        //int yBound = 11;

        int xBound = 103;
        int yBound = 101;

        //String[][] grid = new String[103][101];
        String[][] grid = new String[xBound][yBound];

        List<Position> positions = new ArrayList<>();

        for(String line: lines) {
            String position = getPositionFromLine(line);
            String velocity = getVelocityFromLine(line);

            addPositionAndVelocityToList(position, positions, velocity);
        }

        // initial
        drawPositionsOnGrid(positions, grid);
        printGrid(grid, 0);

        // every second move
        for (int i = 0; i < 7000; i++) {
            move(positions, xBound, yBound);

            drawPositionsOnGrid(positions, grid);

            if (hasOnlyOnes) {
                printGrid(grid, i);
            }
        }

        //calculateQuadrants(grid, xBound, yBound);

        //System.out.println("robots: " + part1);
    }

    private static void calculateQuadrants(String[][] grid, int xBound, int yBound) {
        q1(grid, xBound, yBound);
        q2(grid, xBound, yBound);
        q3(grid, xBound, yBound);
        q4(grid, xBound, yBound);
    }

    private static void q1(String[][] grid, int xBound, int yBound) {
        int xHalf = (xBound - 1) / 2;
        int yHalf = (yBound - 1) / 2;

        int count = 0;

        for (int i = 0; i < xHalf; i++) {
            for (int j = 0; j < yHalf; j++) {
                //System.out.print("\"" + grid[i][j] + "\" ");
                if (grid[i][j] != " ") {
                    count = count + Integer.parseInt(grid[i][j]);
                }
            }
            //System.out.println();
        }
        System.out.println("q1 count " + count);
        part1 = part1 * count;
    }
    private static void q2(String[][] grid, int xBound, int yBound) {
        int xHalf = (xBound - 1) / 2;
        int yHalf = (yBound - 1) / 2;

        int count = 0;

        for (int i = 0; i < xHalf; i++) {
            for (int j = yHalf + 1; j < yBound; j++) {
                //System.out.print("\"" + grid[i][j] + "\" ");
                if (grid[i][j] != " ") {
                    count = count + Integer.parseInt(grid[i][j]);
                }
            }
            //System.out.println();
        }
        System.out.println("q2 count " + count);
        part1 = part1 * count;
    }
    private static void q3(String[][] grid, int xBound, int yBound) {
        int xHalf = (xBound - 1) / 2;
        int yHalf = (yBound - 1) / 2;

        int count = 0;

        for (int i = xHalf + 1; i < xBound; i++) {
            for (int j = 0; j < yHalf; j++) {
                //System.out.print("\"" + grid[i][j] + "\" ");
                if (grid[i][j] != " ") {
                    count = count + Integer.parseInt(grid[i][j]);
                }
            }
            //System.out.println();
        }

        System.out.println("q3 count " + count);
        part1 = part1 * count;
    }
    private static void q4(String[][] grid, int xBound, int yBound) {
        int xHalf = (xBound - 1) / 2;
        int yHalf = (yBound - 1) / 2;

        int count = 0;

        for (int i = xHalf + 1; i < xBound; i++) {
            for (int j = yHalf + 1; j < yBound; j++) {
                //System.out.print("\"" + grid[i][j] + "\" ");
                if (grid[i][j] != " ") {
                    count = count + Integer.parseInt(grid[i][j]);
                }
            }
            //System.out.println();
        }
        System.out.println("q4 count " + count);
        part1 = part1 * count;
    }

    private static void move(List<Position> positions, int xBound, int yBound) {
        for(Position p : positions) {
            int newX;
            int newY;

            // x
            if (p.getX() + p.getVx() >= yBound) {
                newX = (p.getX() + p.getVx()) - yBound;
            }
            else if (p.getX() + p.getVx() < 0) {
                newX = yBound + (p.getX() + p.getVx());
            }
            else {
                newX = p.getX() + p.getVx();
            }

            //y
            if (p.getY() + p.getVy() >= xBound) {
                newY = (p.getY() + p.getVy() - xBound);
            }
            else if (p.getY() + p.getVy() < 0) {
                newY = xBound + (p.getY() + p.getVy());
            }
            else {
                newY = p.getY() + p.getVy();
            }

            p.setX(newX);
            p.setY(newY);
        }

    }

    private static void initGrid(String[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                grid[i][j] = " ";
            }
        }
    }

    private static String getPositionFromLine(String line) {
        return line.split(" ")[0];
    }

    private static String getVelocityFromLine(String line) {
        return line.split(" ")[1];
    }

    private static void addPositionAndVelocityToList(String positionString, List<Position> positions, String velocityString) {
        String velocityPart = velocityString.split("=")[1];
        String[] velocityParts = velocityPart.split(",");
        int vx = Integer.parseInt(velocityParts[0].trim());
        int vy = Integer.parseInt(velocityParts[1].trim());

        String coordinatesPart = positionString.split("=")[1];
        String[] parts = coordinatesPart.split(",");

        int x = Integer.parseInt(parts[1].trim());
        int y = Integer.parseInt(parts[0].trim());

        Position position = new Position(y, x);
        position.setVx(vx);
        position.setVy(vy);

        positions.add(position);
    }

    private static void drawPositionsOnGrid(List<Position> positions, String[][] grid) {
        initGrid(grid); // each time clean grid
        hasOnlyOnes = true;

        for(Position p: positions) {
            if (Objects.equals(grid[p.getY()][p.getX()], " ")) {
                grid[p.getY()][p.getX()] = "1";
            }
            else {
                int positionValue = Integer.parseInt(grid[p.getY()][p.getX()]) + 1;
                grid[p.getY()][p.getX()] = String.valueOf(positionValue);
                hasOnlyOnes = false;
            }
        }
    }

    private static void printGrid(String[][] grid, int counter) throws FileNotFoundException {
        PrintStream out = new PrintStream(new FileOutputStream("output.txt", true));
        System.setOut(out);

        if (counter > 1000) {

        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[i].length; j++) {
                System.out.print("\"" + grid[i][j] + "\" ");
            }
            System.out.println();
        }

        System.out.println("============================iteration number " + counter +  " =====");
        }
    }

}