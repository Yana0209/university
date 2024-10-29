// a) Create type alias DayOfWeek for days of the week
type DayOfWeek = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday";
// b) Create union type TimeSlot for possible class time slots
type TimeSlot = "8:30-10:00" | "10:15-11:45" | "12:15-13:45" | "14:00-15:30" | "15:45-17:15";
// c) Define type alias CourseType for types of classes
type CourseType = "Lecture" | "Seminar" | "Lab" | "Practice";

// a) Create type alias Professor
type Professor = {
    id: number;
    name: string;
    department: string;
};
// b) Define type alias Classroom
type Classroom = {
    number: string;
    capacity: number;
    hasProjector: boolean;
};
// c) Create type alias Course
type Course = {
    id: number;
    name: string;
    type: CourseType;
};
// d) Define type alias Lesson
type Lesson = {
    courseId: number;
    professorId: number;
    classroomNumber: string;
    dayOfWeek: DayOfWeek;
    timeSlot: TimeSlot;
    name: string; 
};

// a) Create arrays
let professors: Professor[] = [];
let classrooms: Classroom[] = [];
let courses: Course[] = [];
let schedule: Lesson[] = []; 

// b) Write function addProfessor
function addProfessor(professor: Professor): void {
    professors.push(professor);
    updateProfessorSelect(); 
}
// c) Create function addLesson
function addLesson(lesson: Lesson): boolean {
    if (validateLesson(lesson) === null) {
        schedule.push(lesson);
        return true;
    }
    return false;
}
// a) Implement function findAvailableClassrooms
function findAvailableClassrooms(timeSlot: TimeSlot, dayOfWeek: DayOfWeek): string[] {
    const occupiedClassrooms = schedule
        .filter(lesson => lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek)
        .map(lesson => lesson.classroomNumber);

    return classrooms
        .map(classroom => classroom.number)
        .filter(number => !occupiedClassrooms.includes(number));
}
// b) Write function getProfessorSchedule
function getProfessorSchedule(professorId: number): Lesson[] {
    return schedule.filter(lesson => lesson.professorId === professorId);
}
// a) Create type alias ScheduleConflict
type ScheduleConflict = {
    type: "ProfessorConflict" | "ClassroomConflict";
    lessonDetails: Lesson;
};
// b) Write function validateLesson
function validateLesson(lesson: Lesson): ScheduleConflict | null {
    for (let scheduledLesson of schedule) {
        if (scheduledLesson.timeSlot === lesson.timeSlot && scheduledLesson.dayOfWeek === lesson.dayOfWeek) {
            if (scheduledLesson.professorId === lesson.professorId) {
                return {
                    type: "ProfessorConflict",
                    lessonDetails: scheduledLesson,
                };
            }
            if (scheduledLesson.classroomNumber === lesson.classroomNumber) {
                return {
                    type: "ClassroomConflict",
                    lessonDetails: scheduledLesson,
                };
            }
        }
    }
    return null;
}
// a) Implement function getClassroomUtilization
function getClassroomUtilization(classroomNumber: string): number {
    let totalLessonsInClassroom = schedule.filter(
        (lesson) => lesson.classroomNumber === classroomNumber
    ).length;
    const totalPossibleLessons = 5 * 5; 
    return (totalLessonsInClassroom / totalPossibleLessons) * 100;
}
// b) Create function getMostPopularCourseType()
function getMostPopularCourseType(): CourseType {
    let typeCount: { [key in CourseType]: number } = {
        Lecture: 0,
        Seminar: 0,
        Lab: 0,
        Practice: 0,
    };
    for (let lesson of schedule) {
        let course = courses.find((course) => course.id === lesson.courseId);
        if (course) {
            typeCount[course.type]++;
        }
    }
    let popularType: CourseType = "Lecture";
    let maxCount = 0;
    for (let type in typeCount) {
        if (typeCount[type as CourseType] > maxCount) {
            maxCount = typeCount[type as CourseType];
            popularType = type as CourseType;
        }
    }
    return popularType;
}
// a) Write function reassignClassroom
function reassignClassroom(lessonId: number, newClassroomNumber: string): boolean {
    let lesson = schedule.find((lesson) => lesson.courseId === lessonId);
    if (!lesson) return false;
    let updatedLesson: Lesson = { ...lesson, classroomNumber: newClassroomNumber };
    if (validateLesson(updatedLesson) === null) {
        lesson.classroomNumber = newClassroomNumber;
        return true;
    }
    return false;
}
// b) Implement function cancelLesson
function cancelLesson(lessonId: number): void {
    schedule = schedule.filter((lesson) => lesson.courseId !== lessonId);
}






// Function to display the current schedule
function getScheduleDisplay(): string {
    return schedule.map(lesson => {
        const course = courses.find(c => c.id === lesson.courseId);
        const professor = professors.find(p => p.id === lesson.professorId);

        return `
            Lesson Name: ${lesson.name}, 
            Professor: ${professor ? professor.name : 'Unknown'}, 
            Classroom: ${lesson.classroomNumber}, 
            Day: ${lesson.dayOfWeek}, 
            Time: ${lesson.timeSlot}
        `;
    }).join('<br>');
}

// Function to populate select elements
function populateSelects(): void {
    const daysOfWeek: DayOfWeek[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots: TimeSlot[] = ["8:30-10:00", "10:15-11:45", "12:15-13:45", "14:00-15:30", "15:45-17:15"];
    const courseType: CourseType[] = ["Lecture", "Seminar", "Lab", "Practice"];
    
    const dayOfWeekSelect = document.getElementById('dayOfWeekSelect') as HTMLSelectElement;
    daysOfWeek.forEach(day => {
        const option = document.createElement('option');
        option.value = day;
        option.textContent = day;
        dayOfWeekSelect.appendChild(option);
    });

    const timeSlotSelect = document.getElementById('timeSlotSelect') as HTMLSelectElement;
    timeSlots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        timeSlotSelect.appendChild(option);
    });
    
    const courseTypeSelect = document.getElementById('courseTypeSelect') as HTMLSelectElement; 
    courseType.forEach(type => { 
        const option = document.createElement('option'); 
        option.value = type; 
        option.textContent = type; 
        courseTypeSelect.appendChild(option); 
    });
}
// Function to update the professor select element with current professors
function updateProfessorSelect(): void {
    const professorSelect = document.getElementById('professorSelect') as HTMLSelectElement;
    professorSelect.innerHTML = ''; 

    professors.forEach(professor => {
        const option = document.createElement('option');
        option.value = professor.id.toString();
        option.textContent = professor.name;
        professorSelect.appendChild(option);
    });
}
// Event listener for adding a new professor
document.getElementById('addProfessorForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = (document.getElementById('professorName') as HTMLInputElement).value;
    const department = (document.getElementById('professorDept') as HTMLInputElement).value;
    const newProfessor: Professor = { id: professors.length + 1, name, department };
    addProfessor(newProfessor);
    alert(`Professor ${name} added!`);
});
// Event listener for adding a new lesson
document.getElementById('addLessonForm')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const courseId = parseInt((document.getElementById('courseSelect') as HTMLSelectElement).value);
    const professorId = parseInt((document.getElementById('professorSelect') as HTMLSelectElement).value);
    const classroomNumber = (document.getElementById('classroomSelect') as HTMLSelectElement).value;
    const dayOfWeek = (document.getElementById('dayOfWeekSelect') as HTMLSelectElement).value as DayOfWeek;
    const timeSlot = (document.getElementById('timeSlotSelect') as HTMLSelectElement).value as TimeSlot;
    const lessonName = (document.getElementById('lessonName') as HTMLInputElement).value; 
    const newLesson: Lesson = {
        courseId,
        professorId,
        classroomNumber,
        dayOfWeek,
        timeSlot,
        name: lessonName, 
    };
    if (addLesson(newLesson)) {
        alert('Lesson added successfully!');
    } else {
        alert('Failed to add lesson due to conflict!');
    }
// Update the displayed schedule after adding a lesson
    const scheduleDisplay = getScheduleDisplay();
    document.getElementById('scheduleResults')!.innerHTML = scheduleDisplay;
});

// Call the function to populate select elements on page load
populateSelects();



