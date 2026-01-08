import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day3/src/example.txt");
        Path filePath = Paths.get("Day3/src/input.txt");
        List<String> banks = Utils.readFile(filePath);
        int totalJoltage = 0;

        for (String bank: banks) {
            int[] digits = bank.chars()
                    .map(c -> c - '0')
                    .toArray();

            int bat1 = digits[0];
            int bat1Index = 0;
            for (int i = 1; i < digits.length - 1 ; i++) {
                if (digits[i] > bat1) {
                    bat1 = digits[i];
                    bat1Index = i;
                }
            }
            int bat2 = digits[bat1Index + 1];
            for (int i = bat1Index + 1; i < digits.length; i++) {
                if (digits[i] > bat2) {
                    bat2 = digits[i];
                }
            }
            /*
            System.out.println("bat1 " + bat1);
            System.out.println("bat2 " + bat2);
            System.out.println();

             */

            String joltage = String.valueOf(bat1) + String.valueOf(bat2);
            totalJoltage = totalJoltage + Integer.parseInt(joltage);
        }

        System.out.println(totalJoltage);
    }
}