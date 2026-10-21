pipeline {
    agent any

    // Optional: Reference Maven and JDK configured in Jenkins Global Tool Configuration
    // tools {
    //     maven 'Maven3'
    //     jdk 'Java21'
    // }

    options {
        timeout(time: 15, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Compile') {
            steps {
                echo 'Compiling source code...'
                script {
                    if (isUnix()) {
                        sh 'mvn clean compile'
                    } else {
                        bat 'mvn clean compile'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Executing JUnit 5 test cases...'
                script {
                    if (isUnix()) {
                        sh 'mvn test'
                    } else {
                        bat 'mvn test'
                    }
                }
            }
        }

        stage('Package') {
            steps {
                echo 'Packaging application artifact...'
                script {
                    if (isUnix()) {
                        sh 'mvn package -DskipTests'
                    } else {
                        bat 'mvn package -DskipTests'
                    }
                }
            }
        }
    }

    post {
        always {
            // Collect Surefire JUnit XML reports generated during 'mvn test'
            junit allowEmptyResults: true, testResults: '**/target/surefire-reports/*.xml'
        }
        success {
            archiveArtifacts artifacts: '**/target/*.jar', fingerprint: true
            echo '=== BUILD AND TEST SUITE COMPLETED SUCCESSFULLY ==='
        }
        failure {
            echo '=== BUILD OR UNIT TESTS FAILED ==='
        }
    }
}
