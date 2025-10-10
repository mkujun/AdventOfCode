import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Stream;

public class Main {
    public static void main(String[] args) {
        Path filePath = Paths.get("Day7/src/input.txt");
        //Path filePath = Paths.get("Day7/src/example.txt");
        List<String> lines = Utils.readFile(filePath);
        long part1 = 0;

        char[] symbols = {'+', '*', '|'};

        for(String line: lines) {
            long result = Long.parseLong(line.split(":")[0]);
            int[] nums = Stream.of(line.split(": ")[1].split(" ")).mapToInt(Integer::parseInt).toArray();

            List<String> permutations = generatePermutations(symbols, nums.length - 1);

            for(String permutation : permutations) {
                String[] operatorsSplit = permutation.split("");

                long sum = 0;

                for (int i = 0; i < nums.length - 1; i++) {
                    long num1 = (i == 0) ? nums[i] : sum;
                    long num2 = nums[i + 1];

                    String operator = operatorsSplit[i];

                    if (operator.equals("+")) {
                        sum = num1 + num2;
                    }
                    if (operator.equals("*")) {
                        sum = num1 * num2;
                    }
                    if (operator.equals("|")) {
                        String con = String.valueOf(num1) + String.valueOf(num2);
                        sum = Long.parseLong(con);
                    }
                }
                if (sum == result) {
                    part1 = part1 + sum;
                    break;
                }
            }
        }

        System.out.println("part1 " + part1);
    }

    public static List<String> generatePermutations(char[] symbols, int length) {
        List<String> permutations = new ArrayList<>();
        generate(symbols, "", length, permutations);
        return permutations;
    }

    private static void generate(char[] symbols, String current, int length, List<String> permutations) {
        if (current.length() == length) {
            permutations.add(current);
            return;
        }

        for (char symbol : symbols) {
            generate(symbols, current + symbol, length, permutations);
        }
    }
}