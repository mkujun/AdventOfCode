import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {
    static HashMap<String, Integer> map = new HashMap<>();
    static int gatesIndex;
    static int zCount = 0;

    public static void main(String[] args) {
        //Path filePath = Paths.get("Day24/src/example.txt");
        //Path filePath = Paths.get("Day24/src/example2.txt");
        Path filePath = Paths.get("Day24/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        readInput(lines);

        do {
            for (int i = gatesIndex; i < lines.size(); i++) {
                readGates(lines.get(i));
            }
        //} while(zCount <= 12);
        } while(zCount <= 45);

        extractZValues();
    }

    private static void readInput(List<String> lines) {
        for (String line: lines) {
            if (line.contains(":")) {
                readXandY(line);
                gatesIndex = lines.indexOf(line) + 2;
            }
            else if(line.contains("->")){
                readGates(line);
            }
        }
    }

    private static void readXandY(String line) {
        String wire = line.split(":")[0];
        int wireValue = Integer.parseInt(line.split(":")[1].trim());

        map.put(wire, wireValue);
    }

    private static void readGates(String line) {
        String regex = "(\\w+)\\s+(AND|OR|XOR)\\s+(\\w+)\\s+->\\s+(\\w+)";

        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(line);

        if (matcher.matches()) {
            String input1 = matcher.group(1);
            String input2 = matcher.group(3);
            String gate = matcher.group(2);
            String wire = matcher.group(4);

            if (map.containsKey(input1) && map.containsKey(input2)
                    && !map.containsKey(wire)
            ) {
                if (wire.contains("z")) {
                    zCount++;
                }
                switch (gate) {
                    case "AND":
                        map.put(wire, andLogic(map.get(input1), map.get(input2)));
                        break;
                    case "OR":
                        map.put(wire, orLogic(map.get(input1), map.get(input2)));
                        break;
                    case "XOR":
                        map.put(wire, xorLogic(map.get(input1), map.get(input2)));
                        break;
                    default:
                        break;
                }
            }
        } else {
            System.out.println("No match found!");
        }
    }

    private static int andLogic(int x, int y) {
        return x & y;
    }

    private static int orLogic(int x, int y) {
        return x | y;
    }

    private static int xorLogic(int x, int y) {
        return x ^ y;
    }

    private static void extractZValues() {
        StringBuilder result = new StringBuilder();

        map.entrySet().stream()
                .filter(entry -> entry.getKey().startsWith("z"))
                .sorted(Map.Entry.comparingByKey())
                .forEach(entry -> result.append(entry.getValue()));

        String part1 = result.reverse().toString();

        System.out.println("part 1 " + part1);
    }


}