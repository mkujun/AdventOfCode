using System;
using System.Collections.Generic;
using System.Diagnostics.CodeAnalysis;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Aoc
{
    public class Day4
    {
        //string input = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\Inputs\input.txt"));
        string input = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\Inputs\4.txt"));
        Dictionary<int, int> myDict = new Dictionary<int, int>();

        public Day4()
        {
            //PartOne();
            CreateDict();
            PartTwo();
        }

        private void CreateDict()
        {
            for (int i = 1; i <= 208; i++)
            {
                myDict.Add(i, 0);
            }
        }

        private void PartTwo()
        {
            int counter = 1;
            int sum = 0;

            foreach (string line in File.ReadLines(@input))
            {
                int copiesAtCounter = myDict[counter];

                List<string> winningNumbers = GetWinningNumbersFromLine(line);
                List<string> ticket = GetTicketFromLine(line);

                var matchingItems = winningNumbers.Intersect(ticket).ToList();

                for (int i = 0; i < matchingItems.Count; i++)
                {
                    myDict[i + counter + 1] = myDict[i + counter + 1] + 1;
                }

                for (int j = 0; j < copiesAtCounter; j++)
                {
                    for (int i = 0; i < matchingItems.Count; i++)
                    {
                        myDict[i + counter + 1] = myDict[i + counter + 1] + 1;
                    }
                }

                counter++;
            }


            foreach (var key in myDict.Keys.ToList())
            {
                myDict[key] += 1;
                sum = sum + myDict[key];    
            }

            Console.WriteLine(sum);
        }

        private void PartOne()
        {
            int part1 = 0;

            foreach (string line in File.ReadLines(@input))
            {
                List<string> winningNumbers = GetWinningNumbersFromLine(line);
                List<string> ticket = GetTicketFromLine(line);

                var matchingItems = winningNumbers.Intersect(ticket).ToList();
                int point = 1;

                if (matchingItems.Count >= 1)
                {
                    for (int i = 1; i < matchingItems.Count; i++)
                    {
                        point = point * 2;
                    }

                    part1 = part1 + point;
                }
            }

            Console.WriteLine(part1);

        }

        private List<string> GetTicketFromLine(string line)
        {
            string[] numbers = line.Split("|")[1].Split(" ");
            List<string> tickets = new List<string>();

            foreach (var item in numbers)
            {
                if (item != "")
                {
                    tickets.Add(item);
                }
            }

            return tickets;
        }

        private List<string> GetWinningNumbersFromLine(string line)
        {
            string pattern = @"\d+";
            string winningNumber = line.Split("|")[0].Split(":")[1];
            List<string> numbers = new List<string>();

            MatchCollection matches = Regex.Matches(winningNumber, pattern);

            foreach (Match match in matches)
            {
                numbers.Add(match.Value);
            }

            return numbers;
        }
    }
}
