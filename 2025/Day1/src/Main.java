import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        //Path filePath = Paths.get("Day1/src/example.txt");
        Path filePath = Paths.get("Day1/src/input.txt");
        List<String> lines = Utils.readFile(filePath);

        int dial = 50;
        int zeros = 0;

        for (String line: lines) {
            char direction = line.charAt(0);
            int rotation = Integer.parseInt(line.substring(1));

            if (rotation >= 100) {
                int firstNumber = rotation / 100;
                zeros = zeros + firstNumber;
                rotation = rotation % 100;
            }

            if (direction == 'L') {
                if (dial - rotation < 0) {
                    if (dial != 0) {
                        zeros++;
                    }
                    dial = 100 + dial - rotation;
                }
                else if (dial - rotation >= 0) {
                    dial = dial - rotation;
                }

            }
            if (direction == 'R') {
                if (dial + rotation > 100) {
                    if (dial != 0) {
                        zeros++;
                    }
                    dial = (dial + rotation) - 100;
                }
                else if (dial + rotation <= 100) {
                    dial = dial + rotation;
                }
            }
            if (dial == 100 || dial == 0) {
                dial = 0;
                zeros++;
            }
        }

        System.out.println(zeros);
    }
}

// 280 - too low