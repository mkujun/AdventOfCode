import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Path filePath = Paths.get("Day11/src/example.txt");
        //Path filePath = Paths.get("Day11/src/input.txt");
        //Path filePath = Paths.get("Day11/src/test.txt");
        List<String> lines = Utils.readFile(filePath);

        Map<String, Long> dict = new HashMap();
        List<String> currentStones = new ArrayList<>(Arrays.asList(lines.get(0).split(" ")));
        Map<String, Long> updates = new HashMap();

        for(String stone: currentStones) {
            dict.put(stone, dict.getOrDefault(stone, 0L) + 1);
        }

        for (int i = 1; i <= 75; i++) {
            updates.clear();
            updates.putAll(dict);

            for (Map.Entry<String, Long> stone : dict.entrySet()) {
                if (stone.getKey().equals("0")) {
                    Long numOfZeros = dict.get("0");
                    String keyOne = "1";

                    updates.put(keyOne, updates.getOrDefault(keyOne, 0L) + numOfZeros);

                    // decrement
                    updates.put(stone.getKey(), updates.getOrDefault(stone.getKey(), 0L) - numOfZeros);
                }
                else if (stone.getKey().split("").length % 2 == 0) {
                    String digits = stone.getKey();
                    int half = (digits.length()) / 2;
                    int leftHalf = Integer.parseInt(digits.substring(0, half));
                    int rightHalf = Integer.parseInt(digits.substring(half, digits.length()));

                    String leftKey = String.valueOf(leftHalf);
                    String rightKey = String.valueOf(rightHalf);

                    Long numOfOcc = dict.get(stone.getKey());

                    updates.put(leftKey, updates.getOrDefault(leftKey, 0L) + numOfOcc);
                    updates.put(rightKey, updates.getOrDefault(rightKey, 0L) + numOfOcc);

                    // decrement
                    updates.put(stone.getKey(), updates.getOrDefault(stone.getKey(), 0L) - numOfOcc);
                }
                else {
                    Long newStone = Long.parseLong(stone.getKey()) * 2024;
                    String newKey = String.valueOf(newStone);

                    Long numOfOcc = dict.get(stone.getKey());

                    updates.put(newKey, updates.getOrDefault(newKey, 0L) + numOfOcc);

                    // decrement
                    updates.put(stone.getKey(), updates.getOrDefault(stone.getKey(), 0L) - numOfOcc);
                }

                // clear key with '0' for value
                if (updates.get(stone.getKey()).doubleValue() == 0) {
                    updates.remove(stone.getKey());
                }

            }

            dict.clear();
            dict.putAll(updates);

            Long sum = 0L;
            for (Map.Entry<String, Long> stone : dict.entrySet()) {
                sum = sum + stone.getValue();
            }

            System.out.println("sum " + sum);
        }

    }
}