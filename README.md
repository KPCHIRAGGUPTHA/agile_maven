# Agile Assessment: Largest of Three Numbers (Maven + JUnit + Jenkins)

This repository contains a complete, production-ready Maven project featuring a Java implementation to find the largest of three numbers, comprehensive JUnit 5 unit test suites, and continuous integration (CI) configuration for Jenkins.

---

## 1. Project Structure

```text
agile_assessment/
├── .gitignore
├── Jenkinsfile                  # Jenkins Declarative Pipeline definition
├── pom.xml                      # Maven build configuration with JUnit 5 & Surefire
├── README.md                    # Project documentation & Jenkins setup guide
└── src/
    ├── main/java/com/agile/assessment/
    │   └── LargestNumberFinder.java      # Java implementation with main & helper logic
    └── test/java/com/agile/assessment/
        └── LargestNumberFinderTest.java  # Comprehensive JUnit 5 test cases
```

---

## 2. Java Implementation Details

[`LargestNumberFinder.java`](src/main/java/com/agile/assessment/LargestNumberFinder.java) provides:
- **`findLargest(int a, int b, int c)`**: Evaluates 3 integer values using conditional comparison logic (`a >= b && a >= c`, `b >= a && b >= c`, else `c`).
- **`findLargest(double a, double b, double c)`**: Overloaded method for floating-point calculations.
- **`main(String[] args)`**: Command-line entry point supporting both positional command-line arguments and interactive terminal input using `Scanner`.

---

## 3. JUnit 5 Test Coverage

[`LargestNumberFinderTest.java`](src/test/java/com/agile/assessment/LargestNumberFinderTest.java) executes 13 distinct assertions verifying:
1. First number is the largest (`testFirstNumberLargest`).
2. Second number is the largest (`testSecondNumberLargest`).
3. Third number is the largest (`testThirdNumberLargest`).
4. All three numbers are equal (`testAllNumbersEqual`).
5. Two numbers are equal and larger than the third (`testTwoNumbersEqualAndLargest`).
6. All negative numbers (`testAllNegativeNumbers`).
7. Mixed positive, negative, and zero values (`testMixedNumbers`).
8. Precision with floating-point values (`testDoubleOverload`).
9. Parameterized test suite using `@ParameterizedTest` and `@CsvSource` for multi-case validation.

---

## 4. Local Execution & Validation

### Run Tests via Maven
```powershell
mvn clean test
```
*Test reports are generated in `target/surefire-reports/TEST-com.agile.assessment.LargestNumberFinderTest.xml`.*

### Package into Executable JAR
```powershell
mvn package
```

### Run Application
```powershell
# With command line arguments:
java -jar target/largest-number-finder-1.0.0.jar 45 89 23

# Interactive prompt:
java -jar target/largest-number-finder-1.0.0.jar
```

---

## 5. Jenkins Setup & Configuration Guide

You can build and test this project in Jenkins using either a **Pipeline Job** (recommended) or a **Freestyle Job**.

### Prerequisites
1. **Jenkins Server** running (e.g. `http://localhost:8080`).
   - If not installed, you can start Jenkins instantly via Docker:
     ```bash
     docker run -d -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts
     ```
2. **Plugins Installed**:
   - *Pipeline*
   - *Git*
   - *JUnit Plugin*

---

### Step 1: Configure Tools in Jenkins
1. Open Jenkins and navigate to **Manage Jenkins** &rarr; **Tools** (or **Global Tool Configuration**).
2. **JDK Installation**:
   - Click **Add JDK**.
   - Name: `Java21` (or your local JDK version).
   - Uncheck *Install automatically* and set `JAVA_HOME` to your JDK path (e.g., `C:\Program Files\Java\jdk-21`), or check *Install automatically*.
3. **Maven Installation**:
   - Click **Add Maven**.
   - Name: `Maven-3.9.9` (or `Maven3`).
   - Choose *Install automatically* or provide `MAVEN_HOME` (e.g., `C:\apache-maven-3.9.9`).
4. Click **Save**.

---

### Option A: Jenkins Pipeline Job (Using `Jenkinsfile`)

1. From the Jenkins Dashboard, click **New Item**.
2. Enter item name: `largest-number-finder-pipeline`.
3. Select **Pipeline** and click **OK**.
4. In the configuration page, scroll to the **Pipeline** section:
   - **Definition**: Choose **Pipeline script from SCM**.
   - **SCM**: Select **Git**.
   - **Repository URL**: Enter your Git repository URL or local path:
     `C:/Users/dell9/OneDrive/Documents/agile_assessment` (or your GitHub/GitLab URL).
   - **Branch Specifier**: `*/master` (or `*/main`).
   - **Script Path**: `Jenkinsfile`.
5. Click **Save**.
6. Click **Build Now**.
7. Observe each stage (**Compile** &rarr; **Test** &rarr; **Package**) and view the published **Test Result Trend** graph and archived JAR artifacts.

---

### Option B: Jenkins Freestyle Job (Classic Setup)

1. From Jenkins Dashboard, click **New Item**.
2. Enter item name: `largest-number-finder-freestyle`.
3. Select **Freestyle project** and click **OK**.
4. Under **Source Code Management**:
   - Select **Git**.
   - **Repository URL**: Path to your repo or local Git directory.
   - **Branches to build**: `*/master`.
5. Under **Build Steps**:
   - Click **Add build step** &rarr; **Invoke top-level Maven targets**.
   - **Maven Version**: Select your configured Maven (e.g., `Maven-3.9.9`).
   - **Goals**: `clean test package`.
6. Under **Post-build Actions**:
   - Click **Add post-build action** &rarr; **Publish JUnit test result report**.
   - **Test report XMLs**: `**/target/surefire-reports/*.xml`.
   - (Optional) Click **Add post-build action** &rarr; **Archive the artifacts**:
     - **Files to archive**: `**/target/*.jar`.
7. Click **Save**.
8. Click **Build Now** to run the build.

---

## 6. Verifying Test Reports in Jenkins

Once the build runs:
1. Navigate to the job page in Jenkins.
2. Click on the latest build number (e.g., **#1**).
3. Click on **Test Result** to inspect the detailed execution status:
   - Total Tests: `13`
   - Failures: `0`
   - Errors: `0`
   - Duration and individual test status.
