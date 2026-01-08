import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class Main {
    static Set<String> unique = new HashSet<>();

    public static void main(String[] args) {
        //Path filePath = Paths.get("Day2/src/example.txt");
        Path filePath = Paths.get("Day2/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        String[] ids = lines.get(0).split(",");

        long sum = 0;

        for (String id: ids) {
            long from = Long.parseLong(id.split("-")[0]);
            long to = Long.parseLong(id.split("-")[1]);

            for (long i = from; i <= to; i++) {

                int numInRangeLength = String.valueOf(i).length();

                for (long j = 2; j <= numInRangeLength; j++) {
                    if (numInRangeLength % j == 0) {
                        splitIntoParts(j,i);
                    }
                }
            }
        }

        for (String value : unique) {
            sum = sum + Long.valueOf(value);
        }
        System.out.println(sum);
    }

    private static void splitIntoParts(long j, long numberToSplit) {
        int partSize = (int) (String.valueOf(numberToSplit).length() / j);
        String[] result = new String[(int)j];

        for (int i = 0; i < j; i++) {
            int start = i * partSize;
            result[i] = String.valueOf(numberToSplit).substring(start, start + partSize);
        }

        if (arePartsEqual(result)) {
            String concatParts = String.join("", result);
            unique.add(concatParts);
        }


    }

    private static boolean arePartsEqual(String[] parts) {
        for (int i = 1; i < parts.length; i++) {
            if (!Objects.equals(parts[i], parts[i - 1])) {
                return false;
            }
        }
        return true;
    }
}