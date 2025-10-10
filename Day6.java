public class Main {
    public static void main(String[] args) {
        String[] time = {"53", "83", "72", "88"};
        String[] distance = {"333", "1635", "1289", "1532"};

        part1(time, distance);
        part2(time, distance);
    }

    private static void part1(String[] time, String[] distance) {
        int part1 = 1;

        for (int i = 0; i < time.length; i++) {
            int wins = readRace(Integer.parseInt(time[i]), Integer.parseInt(distance[i]));
            part1 = part1 * wins;
        }

        System.out.println(part1);
    }

    private static int readRace(int time, int distance) {
        int wins = 0;

        for (int i = 0; i <= time; i++) {
            int totalDistance = i * (time - i);

            if (totalDistance > distance) {
                wins++;
            }
        }

        return wins;
    }

    private static void part2(String[] time, String[] distance) {
        String timeConcat = "";
        String distanceConcat = "";

        for (String s : time) {
            timeConcat += s;
        }

        for (String s : distance) {
            distanceConcat += s;
        }

        long largeTime = Long.parseLong(timeConcat);
        long largeDistance = Long.parseLong(distanceConcat);

        long part2 = readLongRace(largeTime, largeDistance);
        System.out.println(part2);
    }

    private static long readLongRace(long time, long distance) {
        long wins = 0;

        for (long i = 0; i <= time; i++) {
            long totalDistance = i * (time - i);

            if (totalDistance > distance) {
                wins++;
            }
        }

        return wins;
    }
    
}