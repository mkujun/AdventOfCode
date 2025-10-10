import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    public static void main(String[] args) {
        long part2 = 0;

        String outString = "";
        try {
            Scanner in = new Scanner(new FileReader("Day3/src/input.txt"));
            StringBuilder sb = new StringBuilder();
            while(in.hasNext()) {
                sb.append(in.next());
            }
            in.close();
            outString = sb.toString();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        Pattern pattern = Pattern.compile("(mul\\(\\d+,\\d+\\))|(do\\(\\))|(don't\\(\\))");
        Matcher matcher = pattern.matcher(outString);

        boolean isEnabled = true;
        ArrayList<String> results = new ArrayList<>();

        while (matcher.find()) {
            String match = matcher.group();
            if (match.equals("do()")) {
                isEnabled = true;
            } else if (match.equals("don't()")) {
                isEnabled = false;
            } else if (isEnabled && match.startsWith("mul")) {
                results.add(match);  // Process only if enabled
            }
        }

        // Print all matched results
        for (String result : results) {
            String numbers = result.split("mul")[1];

            numbers = numbers.substring(1, numbers.length() - 1);

            int num1 = Integer.parseInt(numbers.split(",")[0]);
            int num2 = Integer.parseInt(numbers.split(",")[1]);

            part2 = part2 + (num1*num2);
        }
        System.out.println(part2);
    }
}