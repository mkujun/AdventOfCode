import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class Main {
    static ArrayList<int[]> locksHeights = new ArrayList<>();
    static ArrayList<int[]> keysHeights = new ArrayList<>();
    static int part1 = 0;

    public static void main(String[] args) {
        //Path filePath = Paths.get("Day25/src/example.txt");
        Path filePath = Paths.get("Day25/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        for (int i = 0; i < lines.size(); i = i + 8) {
            if (Objects.equals(lines.get(i), ".....")) { // key
                readKey(lines.subList(i + 1, i + 7));
            }
            else if (Objects.equals(lines.get(i), "#####")) { // lock
                readLock(lines.subList(i + 1, i + 7));
            }
        }

        everyKeyEveryLock();
        System.out.println("part 1: " + part1);
    }

    private static void everyKeyEveryLock() {
        for (int[] lock : locksHeights) {
            for (int[] key: keysHeights) {
                boolean lockKeyFits = true;

                for (int i = 0; i < 5; i++) {
                    if (lock[i] + key[i] + 2 > 7) {
                        lockKeyFits = false;
                    }
                }

                if (lockKeyFits) {
                    part1++;
                }
            }
        }
    }

    private static void readKey(List<String> lines) {
        int[] keyHeights = new int[] {0, 0, 0, 0, 0};
        for (String line : lines) {
            String[] lineChars = line.split("");
            for (int i = 0; i < lineChars.length; i++) {
                if (Objects.equals(lineChars[i], "#")) {
                    keyHeights[i]++;
                }
            }
        }
        for (int i = 0; i < keyHeights.length; i++) {
            keyHeights[i] -= 1;
        }

        keysHeights.add(keyHeights);
    }

    private static void readLock(List<String> lines) {
        int[] lockHeights = new int[] {0, 0, 0, 0, 0};

        for (String line : lines) {
            String[] lineChars = line.split("");

            for (int i = 0; i < lineChars.length; i++) {
                if (Objects.equals(lineChars[i], "#")) {
                    lockHeights[i]++;
                }
            }
        }

        locksHeights.add(lockHeights);
    }

}