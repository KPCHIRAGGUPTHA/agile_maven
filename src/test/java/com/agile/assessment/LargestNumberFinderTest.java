package com.agile.assessment;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Unit tests for LargestNumberFinder using JUnit 5.
 */
class LargestNumberFinderTest {

    @Test
    @DisplayName("Test when first number is the largest")
    void testFirstNumberLargest() {
        int result = LargestNumberFinder.findLargest(45, 12, 30);
        assertEquals(45, result, "Should return the first number (45)");
    }

    @Test
    @DisplayName("Test when second number is the largest")
    void testSecondNumberLargest() {
        int result = LargestNumberFinder.findLargest(15, 89, 42);
        assertEquals(89, result, "Should return the second number (89)");
    }

    @Test
    @DisplayName("Test when third number is the largest")
    void testThirdNumberLargest() {
        int result = LargestNumberFinder.findLargest(10, 20, 99);
        assertEquals(99, result, "Should return the third number (99)");
    }

    @Test
    @DisplayName("Test when all three numbers are equal")
    void testAllNumbersEqual() {
        int result = LargestNumberFinder.findLargest(7, 7, 7);
        assertEquals(7, result, "Should return 7 when all values are equal");
    }

    @Test
    @DisplayName("Test when two numbers are equal and larger than the third")
    void testTwoNumbersEqualAndLargest() {
        assertEquals(50, LargestNumberFinder.findLargest(50, 50, 10));
        assertEquals(50, LargestNumberFinder.findLargest(50, 10, 50));
        assertEquals(50, LargestNumberFinder.findLargest(10, 50, 50));
    }

    @Test
    @DisplayName("Test with all negative numbers")
    void testAllNegativeNumbers() {
        int result = LargestNumberFinder.findLargest(-15, -3, -40);
        assertEquals(-3, result, "The largest negative number should be -3");
    }

    @Test
    @DisplayName("Test with mixed positive, negative, and zero values")
    void testMixedNumbers() {
        assertEquals(0, LargestNumberFinder.findLargest(-5, 0, -20));
        assertEquals(10, LargestNumberFinder.findLargest(-10, 0, 10));
    }

    @Test
    @DisplayName("Test double overload with floating-point values")
    void testDoubleOverload() {
        double result = LargestNumberFinder.findLargest(12.35, 99.45, 45.12);
        assertEquals(99.45, result, 0.0001, "Should correctly determine the largest double");
    }

    @ParameterizedTest(name = "findLargest({0}, {1}, {2}) = {3}")
    @CsvSource({
        "100, 25, 50, 100",
        "12, 85, 34, 85",
        "5, 18, 92, 92",
        "-1, -10, -5, -1",
        "0, 0, 0, 0"
    })
    @DisplayName("Parameterized tests for diverse combinations")
    void testWithCsvSource(int a, int b, int c, int expected) {
        assertEquals(expected, LargestNumberFinder.findLargest(a, b, c));
    }
}
