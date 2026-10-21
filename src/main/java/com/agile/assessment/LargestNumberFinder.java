package com.agile.assessment;

import java.util.Scanner;

/**
 * Utility class and application to determine the largest among three numbers.
 */
public class LargestNumberFinder {

    /**
     * Determines the largest of three integer values.
     *
     * @param a the first integer
     * @param b the second integer
     * @param c the third integer
     * @return the maximum of a, b, and c
     */
    public static int findLargest(int a, int b, int c) {
        if (a >= b && a >= c) {
            return a;
        } else if (b >= a && b >= c) {
            return b;
        } else {
            return c;
        }
    }

    /**
     * Determines the largest of three double values.
     *
     * @param a the first double
     * @param b the second double
     * @param c the third double
     * @return the maximum of a, b, and c
     */
    public static double findLargest(double a, double b, double c) {
        if (a >= b && a >= c) {
            return a;
        } else if (b >= a && b >= c) {
            return b;
        } else {
            return c;
        }
    }

    /**
     * Entry point for running the application from the command line.
     *
     * @param args optional command-line arguments (num1 num2 num3)
     */
    public static void main(String[] args) {
        if (args.length >= 3) {
            try {
                int n1 = Integer.parseInt(args[0]);
                int n2 = Integer.parseInt(args[1]);
                int n3 = Integer.parseInt(args[2]);
                int largest = findLargest(n1, n2, n3);
                System.out.println("Numbers provided: " + n1 + ", " + n2 + ", " + n3);
                System.out.println("The largest number is: " + largest);
                return;
            } catch (NumberFormatException e) {
                System.out.println("Arguments could not be parsed as integers. Switching to interactive mode.");
            }
        }

        Scanner scanner = new Scanner(System.in);
        System.out.println("--- Find Largest of Three Numbers ---");
        System.out.print("Enter first number: ");
        int num1 = scanner.nextInt();
        System.out.print("Enter second number: ");
        int num2 = scanner.nextInt();
        System.out.print("Enter third number: ");
        int num3 = scanner.nextInt();

        int largest = findLargest(num1, num2, num3);
        System.out.println("The largest number is: " + largest);
        scanner.close();
    }
}
