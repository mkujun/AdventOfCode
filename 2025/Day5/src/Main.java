import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day5/src/example.txt");
        Path filePath = Paths.get("Day5/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        List<String> freshRange = new ArrayList<>();
        List<Long> ids = new ArrayList<>();

        AtomicInteger freshCounter = new AtomicInteger();

        lines.forEach(line -> {
           if (line.contains("-")) {
               freshRange.add(line);
           }
           if (!line.contains("-") && !line.isEmpty()) {
               ids.add(Long.parseLong(line));
           }
        });

        for (int i = 0; i < ids.size(); i++) {
            for (int j = 0; j < freshRange.size(); j++) {
                long rangeFrom = Long.parseLong(freshRange.get(j).split("-")[0]);
                long rangeTo = Long.parseLong(freshRange.get(j).split("-")[1]);

                if (ids.get(i) >= rangeFrom && ids.get(i) <= rangeTo) {
                    freshCounter.incrementAndGet();
                    break;
                }
            }
        }


        System.out.println(freshCounter.get());
    }
}