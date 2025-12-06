import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day2/src/example.txt");
        Path filePath = Paths.get("Day2/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        String[] ids = lines.get(0).split(",");

        long sum = 0;

        for (String id: ids) {
            long from = Long.parseLong(id.split("-")[0]);
            long to = Long.parseLong(id.split("-")[1]);

            for (long i = from; i < to; i++) {
                int mid = String.valueOf(i).length() / 2;

                String firstHalf = String.valueOf(i).substring(0, mid);
                String secondHalf = String.valueOf(i).substring(mid);

                if (firstHalf.equals(secondHalf)) {
                    sum = sum + i;
                }
            }
        }

        System.out.println(sum);
    }
}