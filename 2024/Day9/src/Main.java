import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

public class Main {
    static class File {
        int startIndex;
        int endIndex;
        int size;
        String mark;

        public File(int startIndex, int endIndex, String mark) {
            this.startIndex = startIndex;
            this.endIndex = endIndex;
            this.mark = mark;

            this.size = endIndex - startIndex + 1;
        }
    }

    static class FreeSpace {
        int start;
        int end;
        int size;

        public FreeSpace(int start, int end) {
            this.start = start;
            this.end = end;
            this.size = end - start + 1;
        }
    }

    public static void main(String[] args) {
        //Path filePath = Paths.get("Day9/src/example.txt");
        Path filePath = Paths.get("Day9/src/input.txt");
        String line = Utils.readFile(filePath).get(0);

        int idNumber = 0;
        LinkedList<String> blocks = new LinkedList<>();
        String[] digits = line.split("");

        readBlocks(digits, blocks, idNumber);

        List<File> files = new ArrayList<>();

        int start = -1;

        List<FreeSpace> freeSpaces = new ArrayList<>();

        int freeSpaceStart = -1;

        readFilesAndFreeSpaces(blocks, start, files, freeSpaceStart, freeSpaces);

        for (int i = files.size() - 1; i >= 0; i--) {
            File file = files.get(i);

            for (int j = 0; j < freeSpaces.size(); j++) {
                FreeSpace freeSpace = freeSpaces.get(j);

                if (file.startIndex <= freeSpace.start) {
                    break;
                }

                if (file.size <= freeSpace.size) {
                    moveFile(freeSpace, freeSpaces, file, blocks);
                    break;
                }
            }
        }

        calculateChecksum(blocks);
    }

    private static void readFilesAndFreeSpaces(LinkedList<String> blocks, int start, List<File> files, int freeSpaceStart, List<FreeSpace> freeSpaces) {
        for (int i = 0; i < blocks.size(); i++) {
            if (!blocks.get(i).equals(".")) {
                String mark = blocks.get(i);
                if (start == -1) {
                    start = i;
                }

                if (i == blocks.size() - 1) {
                    files.add(new File(start, i, mark));
                    break;
                }

                if (blocks.get(i + 1).equals(".") || !blocks.get(i + 1).equals(mark)) {
                    files.add(new File(start, i, mark));
                    start = -1;
                }
            }
            else {
                if (freeSpaceStart == -1) {
                    freeSpaceStart = i;
                }
                if (!blocks.get(i + 1).equals(".")) {
                    freeSpaces.add(new FreeSpace(freeSpaceStart, i));
                    freeSpaceStart = -1;
                }
            }
        }
    }

    private static void moveFile(FreeSpace freeSpace, List<FreeSpace> freeSpaces, File file, LinkedList<String> blocks) {
        // move file
        for (int i = freeSpace.start; i < freeSpace.start + file.size; i++) {
            blocks.set(i, file.mark);
            // add new free space
            freeSpaces.add(new FreeSpace(file.startIndex, file.endIndex));
        }

        // prune existing free space
        Iterator<FreeSpace> iterator = freeSpaces.iterator();
        while (iterator.hasNext()) {
            FreeSpace freeSpace1 = iterator.next();
            if (freeSpace1.start == freeSpace.start && freeSpace1.end == freeSpace.end) {
                if (freeSpace1.size == file.size) {
                    iterator.remove();
                }
                if (freeSpace1.size > file.size) {
                    freeSpace1.start = freeSpace1.start + file.size;
                    freeSpace1.size = freeSpace1.size - file.size;
                }
            }
        }

        for (int i = file.startIndex; i <= file.endIndex; i++) {
            blocks.set(i, ".");
        }
    }

    private static void moveBlocks(LinkedList<String> blocks) {
        int left = 0;
        int right = blocks.size() - 1;

        while (left < right) {
            // Move left pointer to next dot
            while (left < right && !blocks.get(left).equals(".")) {
                left++;
            }

            // Move right pointer to next non-dot
            while (left < right && blocks.get(right).equals(".")) {
                right--;
            }

            // Swap if valid positions found
            if (left < right) {
                Collections.swap(blocks, left, right);
                left++;
                right--;
            }
        }
    }

    private static void readBlocks(String[] digits, LinkedList<String> blocks, int idNumber) {
        int freeSpace;
        int fileLength;
        for (int i = 0; i < digits.length; i++) {

            if (i % 2 == 0) {
                fileLength = Integer.parseInt(digits[i]);
                for (int j = 0; j < fileLength; j++) {
                    blocks.add(String.valueOf(idNumber));
                }
                idNumber++;
            }
            else {
                freeSpace = Integer.parseInt(digits[i]);
                for (int j = 0; j < freeSpace; j++) {
                    blocks.add(".");
                }
            }

        }
    }

    private static void calculateChecksum(LinkedList<String> blocks) {
        long sum = 0;

        for (int i = 0; i < blocks.size(); i++) {
            if (!Objects.equals(blocks.get(i), ".")) {
                sum = sum + Long.parseLong(blocks.get(i)) * i;
            }
        }

        System.out.println(sum);
    }
}