import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day3/src/example.txt");
        Path filePath = Paths.get("Day3/src/input.txt");
        List<String> banks = Utils.readFile(filePath);
        long totalJoltage = 0;

        for (String bank: banks) {
            int[] digits = bank.chars()
                    .map(c -> c - '0')
                    .toArray();

            List<String> joltage = new ArrayList<>();

            int beginIndex = 0;

            for (int i = 11; i >= 0; i--) {
                int endIndex = digits.length - i;
                int maxIndex = findMaxIndex(beginIndex, endIndex, digits);

                joltage.add(String.valueOf(digits[maxIndex]));

                beginIndex = maxIndex + 1;
            }

            totalJoltage = totalJoltage + Long.parseLong(String.join("", joltage));
        }

        System.out.println(totalJoltage);
    }

    private static int findMaxIndex(int beginIndex, int endIndex, int[] digits) {
        int maxValue = digits[beginIndex];
        int maxIndex = beginIndex;
        for (int i = beginIndex; i < endIndex; i++) {
            if (digits[i] > maxValue) {
                maxValue = digits[i];
                maxIndex = i;
            }
        }

        return maxIndex;
    }
}