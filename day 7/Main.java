import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        Path filePath = Paths.get("src/input2.txt");
        //Path filePath = Paths.get("src/input.txt");
        List<String> lines = Utils.readFile(filePath);
        List<Hand> handList = new ArrayList<>();

        for (String line : lines) {
            Hand hand = new Hand(line);
            handList.add(hand);
        }

        for (int i = 0; i < 4000; i++) {
            sortByType(handList);
            sortByLabel(handList);
        }

        calculateRank(handList);
    }

    private static void sortByType(List<Hand> handList) {
        for (int i = 0; i < handList.size() - 1; i++) {
            Hand hand1 = handList.get(i);
            Hand hand2 = handList.get(i + 1);

            if (hand1.getType().compareTo(hand2.getType()) > 0) {
                swapHandListElements(handList, i + 1, i);
            }
        }
    }

    private static void swapHandListElements(List<Hand> handList, int fromIndex, int toIndex) {
        Hand temp = handList.get(fromIndex);
        handList.set(fromIndex, handList.get(toIndex));
        handList.set(toIndex, temp);
    }

    private static void sortByLabel(List<Hand> handList) {
        for (int i = 0; i < handList.size() - 1; i++) {
            Hand hand1 = handList.get(i);
            Hand hand2 = handList.get(i + 1);

            char[] hand1Labels = hand1.getValue().toCharArray();
            char[] hand2Labels = hand2.getValue().toCharArray();

            if (hand1.getType() == hand2.getType()) {
                for (int j = 0; j < hand1Labels.length; j++) {
                    Hand.Label label1 = Hand.charToCardLabel(hand1Labels[j]);
                    Hand.Label label2 = Hand.charToCardLabel(hand2Labels[j]);

                    if (label1.compareTo(label2) < 0) {
                        swapHandListElements(handList, i + 1, i);
                        break;
                    } else if (label1.compareTo(label2) > 0) {
                        break;
                    }
                }
            }
        }
    }

    private static void calculateRank(List<Hand> handList) {
        int sum = 0;

        for (int i = 0; i < handList.size(); i++) {
            int rank = i + 1;
            sum = sum + rank * Integer.parseInt(handList.get(i).getBid());
        }

        System.out.println("part 2 " + sum);
    }
}

class Hand {
    enum CamelCardHand {
        HIGH_CARD, ONE_PAIR, TWO_PAIR, THREE, FULL_HOUSE, FOUR, FIVE;
    }

    enum Label {
        A, K, Q, T, NINE, EIGHT, SEVEN, SIX, FIVE, FOUR, THREE, TWO, J
    }

    private String value;
    private String bid;
    private CamelCardHand type;

    public Hand(String line) {
        String[] parts = line.split(" ");

        this.value = parts[0];
        this.bid = parts[1];

        parseType(value);
    }

    public String getValue() {
        return value;
    }

    public String getBid() {
        return bid;
    }

    public CamelCardHand getType() {
        return type;
    }

    private void parseType(String str) {
        HashMap<Character, Integer> charCountMap = new HashMap<>();
        char[] charArray = str.toCharArray();

        for (char c : charArray) {
            if (charCountMap.containsKey(c)) {
                charCountMap.put(c, charCountMap.get(c) + 1);
            } else {
                charCountMap.put(c, 1);
            }
        }

        if (charCountMap.containsKey('J')) {
            this.type = defineJ(charCountMap);
        }
        else {
            this.type = defineType(charCountMap);
        }
    }

    private CamelCardHand defineJ(HashMap<Character, Integer> charMap) {
        if (charMap.containsValue(4) || charMap.containsValue(5)) {
            return CamelCardHand.FIVE;
        }
        if (charMap.containsValue(3) && charMap.containsValue(2)) {
            return CamelCardHand.FIVE;
        }
        if (charMap.containsValue(3) && !charMap.containsValue(2)) {
            return CamelCardHand.FOUR;
        }

        if (charMap.containsValue(2)) {
            int size = charMap.size();

            if (size == 4) {
                return CamelCardHand.THREE;
            }

            if (size == 3) {
                int j = charMap.get('J');

                if (j == 1) {
                    return CamelCardHand.FULL_HOUSE;
                }
                if (j == 2) {
                    return CamelCardHand.FOUR;
                }

            }
        }

        if (charMap.containsValue(1)) {
            return CamelCardHand.ONE_PAIR;
        }

        return null;
    }

    private CamelCardHand defineType(HashMap<Character, Integer> charMap) {
        if (charMap.containsValue(5)) {
            return CamelCardHand.FIVE;
        }
        if (charMap.containsValue(4)) {
            return CamelCardHand.FOUR;
        }
        if (charMap.containsValue(3) && charMap.containsValue(2)) {
            return CamelCardHand.FULL_HOUSE;
        }
        if (charMap.containsValue(3) && !charMap.containsValue(2)) {
            return CamelCardHand.THREE;
        }

        if (charMap.containsValue(2)) {
            int size = charMap.size();

            if (size == 4) {
                return CamelCardHand.ONE_PAIR;
            }
            if (size == 3) {
                return CamelCardHand.TWO_PAIR;
            }
        } else if (charMap.containsValue(1)) {
            return CamelCardHand.HIGH_CARD;
        }

        return null;
    }

    public static Label charToCardLabel(char rankChar) {
        switch (rankChar) {
            case 'A':
                return Hand.Label.A;
            case 'K':
                return Hand.Label.K;
            case 'Q':
                return Hand.Label.Q;
            case 'T':
                return Hand.Label.T;
            case '9':
                return Hand.Label.NINE;
            case '8':
                return Hand.Label.EIGHT;
            case '7':
                return Hand.Label.SEVEN;
            case '6':
                return Hand.Label.SIX;
            case '5':
                return Hand.Label.FIVE;
            case '4':
                return Hand.Label.FOUR;
            case '3':
                return Hand.Label.THREE;
            case '2':
                return Hand.Label.TWO;
            case 'J':
                return Hand.Label.J;
            default:
                throw new IllegalArgumentException("Invalid rank character: " + rankChar);
        }
    }

    public String toString() {
        return "Value " + this.value + " Bid " + this.bid + " Type " + this.type;
    }
}
