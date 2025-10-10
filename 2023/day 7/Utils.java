import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;

public class Utils {
    public static List<String> readFile(Path filePath) {
        List<String> lines = Collections.emptyList();
        try {
            lines = Files.readAllLines(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return lines;
    }
}
