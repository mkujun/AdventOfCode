import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day1/src/example.txt");
        Path filePath = Paths.get("Day1/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        ArrayList<Integer> leftList = new ArrayList<>();
        ArrayList<Integer> rightList = new ArrayList<>();

        createLeftAndRight(lines, leftList, rightList);

        int part1 = countTotalDistance(lines, leftList, rightList);
        int part2 = 0;

        for (Integer number : leftList) {
            int count = countOccurrences(number, rightList);
            int occurance = number * count;
            part2 = part2 + occurance;
        }

        System.out.println(part2);
    }

    public static int countOccurrences(Integer number, ArrayList<Integer> rightList) {
        int count = 0;
        for (Integer rightNumber : rightList) {
            if (number.equals(rightNumber)) {
                count++;
            }
        }
        return count;
    }

    private static int countTotalDistance(List<String> lines, ArrayList<Integer> leftList, ArrayList<Integer> rightList) {
        int totalDistance = 0;

        for (int i = 0; i < lines.size(); i++) {
            int distance = Math.abs(leftList.get(i) - rightList.get(i));
            totalDistance = totalDistance + distance;
        }

        return totalDistance;
    }

    private static void createLeftAndRight(List<String> lines, ArrayList<Integer> leftList, ArrayList<Integer> rightList) {
        for (String line: lines) {
            int left = Integer.parseInt(line.split("   ")[0]);
            int right = Integer.parseInt(line.split("   ")[1]);

            //addInSortedOrder(leftList, left);
            //addInSortedOrder(rightList, right);
            leftList.add(left);
            rightList.add(right);
        }
    }

    public static void addInSortedOrder(ArrayList<Integer> list, int value) {
        int index = Collections.binarySearch(list, value);
        if (index < 0) { // Convert the negative index to the insertion point
            index = -(index + 1);
        }
        list.add(index, value);
    }
}