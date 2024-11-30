"use strict";
// Enums
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
// Class Implementation
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.studentIdCounter = 1;
        this.courseIdCounter = 1;
    }
    // Add a new student
    enrollStudent(student) {
        const newStudent = Object.assign({ id: this.studentIdCounter++ }, student);
        this.students.push(newStudent);
        return newStudent;
    }
    // Register a student for a course
    registerForCourse(studentId, courseId) {
        const course = this.courses.find(c => c.id === courseId);
        const student = this.students.find(s => s.id === studentId);
        if (!course || !student) {
            throw new Error("Student or course not found.");
        }
        if (course.faculty !== student.faculty) {
            throw new Error("Student cannot register for a course outside their faculty.");
        }
        const registeredStudents = this.grades.filter(g => g.courseId === courseId).length;
        if (registeredStudents >= course.maxStudents) {
            throw new Error("Course is full.");
        }
        // Add placeholder grade for registration
        this.grades.push({ studentId, courseId, grade: null, date: new Date(), semester: course.semester });
    }
    // Set a grade for a student in a course
    setGrade(studentId, courseId, grade) {
        const registration = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
        if (!registration) {
            throw new Error("Student is not registered for this course.");
        }
        registration.grade = grade;
        registration.date = new Date();
    }
    // Update student status
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error("Student not found.");
        }
        student.status = newStatus;
    }
    // Get students by faculty
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    // Get grades of a specific student
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    // Get available courses by faculty and semester
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    // Calculate average grade for a student
    calculateAverageGrade(studentId) {
        const studentGrades = this.grades.filter(g => g.studentId === studentId && g.grade !== null);
        if (studentGrades.length === 0)
            return 0;
        const total = studentGrades.reduce((sum, g) => sum + g.grade, 0);
        return total / studentGrades.length;
    }
    // Get list of excellent students by faculty
    getExcellentStudentsByFaculty(faculty) {
        const excellentStudentIds = this.grades
            .filter(g => g.grade === GradeValue.Excellent)
            .map(g => g.studentId);
        return this.students.filter(s => s.faculty === faculty && excellentStudentIds.includes(s.id));
    }
}
// Example usage
const university = new UniversityManagementSystem();
// Enroll a student
const student1 = university.enrollStudent({
    fullName: "John Doe",
    faculty: Faculty.Computer_Science,
    year: 1,
    status: StudentStatus.Active,
    enrollmentDate: new Date(),
    groupNumber: "CS101",
});
// Output student for demonstration
console.log(student1);
