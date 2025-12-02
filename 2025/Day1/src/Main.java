
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World day1!");

        Path filePath = Paths.get("Day1/src/input.txt");
        List<String> lines = Utils.readFile(filePath);
    }
}