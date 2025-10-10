import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Main {
    static HashMap<String, List<AntennaPosition>> antennaPositionHashMap = new HashMap<>();
    static int xBound;
    static int yBound;
    static HashMap<String, String> antiNodes = new HashMap<>();

    public static void main(String[] args) {
        //Path filePath = Paths.get("Day8/src/example.txt");
        //Path filePath = Paths.get("Day8/src/test.txt");
        Path filePath = Paths.get("Day8/src/input.txt");
        List<String> lines = Utils.readFile(filePath);
        String[][] grid = Utils.readFileAndConvertToMatrix(filePath);

        xBound = grid.length;
        yBound = grid[0].length;

        markAntennaPositions(grid);
        readAntennaPositions();

        System.out.println(antiNodes.size());
    }

    private static void markAntennaPositions(String[][] grid) {
        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (!grid[i][j].equals("#") && !grid[i][j].equals(".")) {
                    if (!antennaPositionHashMap.containsKey(grid[i][j])) {
                        List<AntennaPosition> positions = new ArrayList<>();
                        positions.add(new AntennaPosition(i, j));
                        antennaPositionHashMap.put(grid[i][j], positions);
                    }
                    else if (antennaPositionHashMap.containsKey(grid[i][j])) {
                        antennaPositionHashMap.get(grid[i][j]).add(new AntennaPosition(i, j));
                    }
                }
            }
        }
    }

    private static void readAntennaPositions() {
        for (String antenna: antennaPositionHashMap.keySet()) {
            List<AntennaPosition> antennaPositions = antennaPositionHashMap.get(antenna);

            for (AntennaPosition currentAntennaPosition : antennaPositions) {
                List<AntennaPosition> others = new ArrayList<>(antennaPositions);
                others.remove(currentAntennaPosition);

                createAntiNode(currentAntennaPosition, others);
            }
        }
    }

    private static void createAntiNode(AntennaPosition current, List<AntennaPosition> others) {
        for(AntennaPosition otherPosition : others) {

            List<int[]> nodes = Utils.getGridBoundedPointsOnLine(
                    current.getX(), current.getY(),
                    otherPosition.getX(), otherPosition.getY(),
                    xBound, yBound);

            for (int[] node : nodes) {
                String antiNode = node[0] + "," + node[1];

                if (!antiNodes.containsKey(antiNode)) {
                    antiNodes.put(antiNode, antiNode);
                }

            }

        }
    }

}