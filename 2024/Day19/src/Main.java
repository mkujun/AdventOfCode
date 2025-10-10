import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day19/src/example.txt");
        Path filePath = Paths.get("Day19/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        int part1 = 0;

        List<String> stringsToCheck = readStringsToCheck(lines);

        List<String> patterns = readPatterns(lines);

        for (String str : stringsToCheck) {
            if (canBeFormed(str, patterns, new HashMap<>())) {
                part1++;
            }
        }

        System.out.println(part1);
    }

    private static List<String> readPatterns(List<String> lines) {
        return Arrays.asList(lines.get(0).split(", "));
    }

    private static List<String> readStringsToCheck(List<String> lines) {
        List<String> stringsToCheck = new ArrayList<>();

        for (int i = 2; i < lines.size(); i++) {
            stringsToCheck.add(lines.get(i));
        }

        return stringsToCheck;
    }

    private static boolean canBeFormed(String target, List<String> patterns, Map<String, Boolean> memo) {
        if (target.isEmpty()) return true;
        if (memo.containsKey(target)) return memo.get(target);

        for (String pattern : patterns) {
            if (target.startsWith(pattern)) {
                String remaining = target.substring(pattern.length());
                if (canBeFormed(remaining, patterns, memo)) {
                    memo.put(target, true);
                    return true;
                }
            }
        }

        memo.put(target, false);
        return false;
    }

}