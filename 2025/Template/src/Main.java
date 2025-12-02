import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Path filePath = Paths.get("Template/src/example.txt");
        List<String> lines = Utils.readFile(filePath);
    }
}