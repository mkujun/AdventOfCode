using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Aoc
{
    public class Day3
    {
        string input = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\Inputs\3.txt"));

        List<char[]> matrix = new List<char[]>();
        Dictionary<string, List<int>> gears = new Dictionary<string, List<int>>();

        static int rows = 140;
        static int columns = 140;

        List<int> part1 = new List<int>();
        int part2 = 0;

        public void ConvertInputToMatrix()
        {
            foreach (string line in File.ReadLines(@input))
            {
                char[] chars = line.ToCharArray();
                matrix.Add(chars);
            }
        }

        public void PrintMatrix()
        {
            for (int i = 0; i < rows; i++)
            {
                Console.WriteLine();
                for (int j = 0; j < columns; j++)
                {
                    Console.Write(matrix[i][j]);
                }
            }
        }

        public void ReadMatrix()
        {
            for(int i = 0;i < rows; i++)
            {
                string rowNumber = "";
                bool currentNumber = false;

                for(int j  = 0; j < columns; j++)
                {
                    char element = matrix[i][j];

                    if (Char.IsDigit(element))
                    {
                        if (!currentNumber)
                        {
                            currentNumber = true;
                        }
                        rowNumber = rowNumber + element;

                        // last number in a row scenario
                        if (j == columns - 1 && currentNumber)
                        {
                            int jEnd = j;
                            int jBegin = j - rowNumber.Length + 1;

                            CheckAroundNumber(i, jBegin, jEnd, rowNumber);
                            currentNumber = false;
                            rowNumber = "";
                        }
                    }
                    else
                    {
                        if (rowNumber != "")
                        {
                            int jEnd = j - 1;
                            int jBegin = j - rowNumber.Length;

                            CheckAroundNumber(i, jBegin, jEnd, rowNumber);
                        }

                        currentNumber = false;
                        rowNumber = "";
                    }
                }
            }
        }

        public void AddGear(int i, int j, string rowNumber)
        {
            string key = (i).ToString() + j.ToString();

            if (gears.ContainsKey(key))
            {
                gears[key].Add(Int32.Parse(rowNumber));
            }

            else
            {
                gears.Add(key, new List<int>());
                gears[key].Add(Int32.Parse(rowNumber));
            }
        }

        public void CheckAroundNumber(int i, int jBegin, int jEnd, string rowNumber)
        {
            // above
            List<char> rowAbove = new List<char>();

            for(int k = jBegin - 1; k <= jEnd + 1; k++)
            {
                try
                {
                    if (matrix[i - 1][k] == '*')
                    {
                        AddGear(i - 1, k, rowNumber);
                    }

                    rowAbove.Add(matrix[i - 1][k]);
                }
                catch (Exception ex)
                {

                }
            }

            // current
            List<char> rowCurrent = new List<char>();

            for(int k = jBegin - 1; k <= jEnd + 1; k = k + rowNumber.Length + 1)
            {
                try
                {
                    if (matrix[i][k] == '*')
                    {
                        AddGear(i, k, rowNumber);
                    }

                    rowCurrent.Add(matrix[i][k]);
                }
                catch (Exception ex)
                {

                }
            }

            // bellow
            List<char> rowBellow = new List<char>();

            for(int k = jBegin - 1; k <= jEnd + 1; k++)
            {
                try
                {
                    if (matrix[i + 1][k] == '*')
                    {
                        AddGear(i + 1, k, rowNumber);
                    }

                    rowBellow.Add(matrix[i + 1][k]);
                }
                catch (Exception ex)
                {

                }
            }

        }

        public Day3()
        {
            ConvertInputToMatrix();
            ReadMatrix();

            foreach (var valuesList in gears.Values)
            {
                if (valuesList.Count == 2)
                {
                    int result = valuesList[0] * valuesList[1];
                    part2 = part2 + result;
                }
            }

            Console.WriteLine(part2);
        }
    }
}
