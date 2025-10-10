import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    static long secretNumber;
    static long part1 = 0;

    public static void main(String[] args) {
        //Path filePath = Paths.get("Day22/src/example.txt");
        Path filePath = Paths.get("Day22/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        for (String line : lines) {
            secretNumber = Long.parseLong(line);
            for (int i = 0; i < 2000; i++) {
                secretNumber = processSecretNumber(secretNumber);
            }
            //System.out.println(secretNumber);
            part1 = part1 + secretNumber;

        }

        System.out.println("part 1: " + part1);

    }

    private static long processSecretNumber(long secretNumber) {
        long multiplied64 = secretNumber * 64;
        long mix1 = mix(multiplied64, secretNumber);
        long prune1 = prune(mix1);

        long dividedSecretNumber = prune1 / 32;
        long mix2 = mix(dividedSecretNumber, prune1);
        long prune2 = prune(mix2);

        long multiplied2048 = prune2 * 2048;
        long mix3 = mix(multiplied2048, prune2);
        long prune3 = prune(mix3);

        //System.out.println(prune3);
        return prune3;
    }

    private static long prune(long secretNumber) {
        return secretNumber % 16777216;
    }

    private static long mix(long givenValue, long secretNumber) {
        return givenValue ^ secretNumber;
    }
}