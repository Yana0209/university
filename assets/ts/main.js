var __assign =
	(this && this.__assign) ||
	function () {
		__assign =
			Object.assign ||
			function (t) {
				for (var s, i = 1, n = arguments.length; i < n; i++) {
					s = arguments[i];
					for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
				}
				return t;
			};
		return __assign.apply(this, arguments);
	};
var _a, _b;
// a) Create arrays
var professors = [];
var classrooms = [];
var courses = [];
var schedule = [];
// b) Write function addProfessor
function addProfessor(professor) {
	professors.push(professor);
	updateProfessorSelect();
}
// c) Create function addLesson
function addLesson(lesson) {
	if (validateLesson(lesson) === null) {
		schedule.push(lesson);
		return true;
	}
	return false;
}
// a) Implement function findAvailableClassrooms
function findAvailableClassrooms(timeSlot, dayOfWeek) {
	var occupiedClassrooms = schedule
		.filter(function (lesson) {
			return lesson.timeSlot === timeSlot && lesson.dayOfWeek === dayOfWeek;
		})
		.map(function (lesson) {
			return lesson.classroomNumber;
		});
	return classrooms
		.map(function (classroom) {
			return classroom.number;
		})
		.filter(function (number) {
			return !occupiedClassrooms.includes(number);
		});
}
// b) Write function getProfessorSchedule
function getProfessorSchedule(professorId) {
	return schedule.filter(function (lesson) {
		return lesson.professorId === professorId;
	});
}
// b) Write function validateLesson
function validateLesson(lesson) {
	for (var _i = 0, schedule_1 = schedule; _i < schedule_1.length; _i++) {
		var scheduledLesson = schedule_1[_i];
		if (scheduledLesson.timeSlot === lesson.timeSlot && scheduledLesson.dayOfWeek === lesson.dayOfWeek) {
			if (scheduledLesson.professorId === lesson.professorId) {
				return {
					type: 'ProfessorConflict',
					lessonDetails: scheduledLesson,
				};
			}
			if (scheduledLesson.classroomNumber === lesson.classroomNumber) {
				return {
					type: 'ClassroomConflict',
					lessonDetails: scheduledLesson,
				};
			}
		}
	}
	return null;
}
// a) Implement function getClassroomUtilization
function getClassroomUtilization(classroomNumber) {
	var totalLessonsInClassroom = schedule.filter(function (lesson) {
		return lesson.classroomNumber === classroomNumber;
	}).length;
	var totalPossibleLessons = 5 * 5;
	return (totalLessonsInClassroom / totalPossibleLessons) * 100;
}
// b) Create function getMostPopularCourseType()
function getMostPopularCourseType() {
	var typeCount = {
		Lecture: 0,
		Seminar: 0,
		Lab: 0,
		Practice: 0,
	};
	var _loop_1 = function (lesson) {
		var course = courses.find(function (course) {
			return course.id === lesson.courseId;
		});
		if (course) {
			typeCount[course.type]++;
		}
	};
	for (var _i = 0, schedule_2 = schedule; _i < schedule_2.length; _i++) {
		var lesson = schedule_2[_i];
		_loop_1(lesson);
	}
	var popularType = 'Lecture';
	var maxCount = 0;
	for (var type in typeCount) {
		if (typeCount[type] > maxCount) {
			maxCount = typeCount[type];
			popularType = type;
		}
	}
	return popularType;
}
// a) Write function reassignClassroom
function reassignClassroom(lessonId, newClassroomNumber) {
	var lesson = schedule.find(function (lesson) {
		return lesson.courseId === lessonId;
	});
	if (!lesson) return false;
	var updatedLesson = __assign(__assign({}, lesson), { classroomNumber: newClassroomNumber });
	if (validateLesson(updatedLesson) === null) {
		lesson.classroomNumber = newClassroomNumber;
		return true;
	}
	return false;
}
// b) Implement function cancelLesson
function cancelLesson(lessonId) {
	schedule = schedule.filter(function (lesson) {
		return lesson.courseId !== lessonId;
	});
}
// Function to display the current schedule
function getScheduleDisplay() {
	return schedule
		.map(function (lesson) {
			var course = courses.find(function (c) {
				return c.id === lesson.courseId;
			});
			var professor = professors.find(function (p) {
				return p.id === lesson.professorId;
			});
			return '\n            Lesson Name: '
				.concat(lesson.name, ', \n            Professor: ')
				.concat(professor ? professor.name : 'Unknown', ', \n            Classroom: ')
				.concat(lesson.classroomNumber, ', \n            Day: ')
				.concat(lesson.dayOfWeek, ', \n            Time: ')
				.concat(lesson.timeSlot, '\n        ');
		})
		.join('<br>');
}
// Function to populate select elements
function populateSelects() {
	var daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	var timeSlots = ['8:30-10:00', '10:15-11:45', '12:15-13:45', '14:00-15:30', '15:45-17:15'];
	var courseType = ['Lecture', 'Seminar', 'Lab', 'Practice'];
	var dayOfWeekSelect = document.getElementById('dayOfWeekSelect');
	daysOfWeek.forEach(function (day) {
		var option = document.createElement('option');
		option.value = day;
		option.textContent = day;
		dayOfWeekSelect.appendChild(option);
	});
	var timeSlotSelect = document.getElementById('timeSlotSelect');
	timeSlots.forEach(function (slot) {
		var option = document.createElement('option');
		option.value = slot;
		option.textContent = slot;
		timeSlotSelect.appendChild(option);
	});
	var courseTypeSelect = document.getElementById('courseTypeSelect');
	courseType.forEach(function (type) {
		var option = document.createElement('option');
		option.value = type;
		option.textContent = type;
		courseTypeSelect.appendChild(option);
	});
}
// Function to update the professor select element with current professors
function updateProfessorSelect() {
	var professorSelect = document.getElementById('professorSelect');
	professorSelect.innerHTML = '';
	professors.forEach(function (professor) {
		var option = document.createElement('option');
		option.value = professor.id.toString();
		option.textContent = professor.name;
		professorSelect.appendChild(option);
	});
}
// Event listener for adding a new professor
(_a = document.getElementById('addProfessorForm')) === null || _a === void 0
	? void 0
	: _a.addEventListener('submit', function (event) {
			event.preventDefault();
			var name = document.getElementById('professorName').value;
			var department = document.getElementById('professorDept').value;
			var newProfessor = { id: professors.length + 1, name: name, department: department };
			addProfessor(newProfessor);
			alert('Professor '.concat(name, ' added!'));
		});
// Event listener for adding a new lesson
(_b = document.getElementById('addLessonForm')) === null || _b === void 0
	? void 0
	: _b.addEventListener('submit', function (event) {
			event.preventDefault();
			var courseId = parseInt(document.getElementById('courseSelect').value);
			var professorId = parseInt(document.getElementById('professorSelect').value);
			var classroomNumber = document.getElementById('classroomSelect').value;
			var dayOfWeek = document.getElementById('dayOfWeekSelect').value;
			var timeSlot = document.getElementById('timeSlotSelect').value;
			var lessonName = document.getElementById('lessonName').value;
			var newLesson = {
				courseId: courseId,
				professorId: professorId,
				classroomNumber: classroomNumber,
				dayOfWeek: dayOfWeek,
				timeSlot: timeSlot,
				name: lessonName,
			};
			if (addLesson(newLesson)) {
				alert('Lesson added successfully!');
			} else {
				alert('Failed to add lesson due to conflict!');
			}
			// Update the displayed schedule after adding a lesson
			var scheduleDisplay = getScheduleDisplay();
			document.getElementById('scheduleResults').innerHTML = scheduleDisplay;
		});
// Call the function to populate select elements on page load
populateSelects();
