import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day5/src/example.txt");
        Path filePath = Paths.get("Day5/src/input.txt");
        List<String> lines = Utils.readFile(filePath);
        int part1 = 0;

        HashMap<String, List<String>> dict = new HashMap<>();

        for (String line: lines) {
            if (line.contains("|")){
               addToDict(line, dict);
            }
            else if (line.contains(",")) {
                part1 = part1 + readPageFrom(line, dict);
            }
        }

        System.out.println(part1);
    }

    private static void addToDict(String line, HashMap<String, List<String>> dict) {
        String key = line.split("\\|")[0];
        String value = line.split("\\|")[1];

        dict.computeIfAbsent(key, k -> new ArrayList<>()).add(value);
    }

    private static int readPageFrom(String line, HashMap<String, List<String>> dict) {
        String[] pageUpdate = line.split(",");
        boolean isPageCorrect = true;

        for (int i = 0; i < pageUpdate.length; i++) {
            String rule = pageUpdate[i];
            String[] subArray = Arrays.copyOfRange(pageUpdate, i + 1, pageUpdate.length);

            for (String sub: subArray) {
                List<String> ruleDict = dict.get(rule);
                if (ruleDict == null) {
                    isPageCorrect = false;
                    break;
                }
                else if (!ruleDict.contains(sub)) {
                    isPageCorrect = false;
                    break;
                }
            }
        }

        if (isPageCorrect) {
            int middlePage = Integer.parseInt(pageUpdate[pageUpdate.length / 2]);
            return middlePage;
        }

        return 0;
    }
}