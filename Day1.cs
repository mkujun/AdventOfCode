using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Aoc
{
    public class Day1
    {
        string input = Path.GetFullPath(Path.Combine(AppDomain.CurrentDomain.BaseDirectory, @"..\..\..\Inputs\1.txt"));

        public Day1()
        {
            PartOne();
        }

        public void PartOne()
        {
            int sum = 0;

            foreach (string line in File.ReadLines(@input))
            {
                string nums = new String(line.Where(Char.IsDigit).ToArray());

                char first = nums[0];
                char last = nums[nums.Length - 1];

                string numString = first.ToString() + last.ToString();

                sum = sum + Int32.Parse(numString);
            }

            Console.WriteLine(sum);
        }
    }

}
