using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace DockerAndEf
{
    public class Helper
    {
        public static void ListDir(string path)
        {
            foreach (var item in Directory.GetDirectories(path))
            {
                Console.WriteLine(item);
            }

            foreach (var item in Directory.GetFiles(path))
            {
                Console.WriteLine(item);
            }
        }
    }
}
