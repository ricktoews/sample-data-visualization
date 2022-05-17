const GRADES = [6, 7, 8, 9, 10, 11, 12];
const STUDENT_COUNT = 30;
const ASSIGNMENT_COUNT = 10;
const STANDARD_COUNT = 5;

function pick_standards() {
  const standards = [];
  let setting = Math.ceil(Math.random() * Math.pow(2, STANDARD_COUNT));
  for (let i = 0; i < STANDARD_COUNT; i++) {
    if (setting & Math.pow(2, i)) {
      standards.push(i);
    }
  }
  return standards;
}

function pick_grade_level() {
  let ndx = Math.floor(Math.random() * GRADES.length);
  return GRADES[ndx];
}

export function generateGradeData() {
  const gradeData = [];
  for (let id = 0; id < STUDENT_COUNT; id++) {
    for (let j = 0; j < ASSIGNMENT_COUNT; j++) {
      let gradeLevel = pick_grade_level();
      let standards = pick_standards();
      let score = Math.random() * 50 + 50;
      let gradeRecord = { id: id + 1, grade: gradeLevel, assignment: j, standards, score };
      gradeData.push(gradeRecord);
    }
  }
  return gradeData;
}

export interface GradeData {
  id: number;
  assignment: number;
  standards: number[];
  score: number;
}

export const Thresholds = [
  { "id": "", "min": 0, "max": 64, "label": "<65", "color": "#ccc", "value": 0 },
  { "id": "", "min": 65, "max": 79, "label": "65-79", "color": "#999", "value": 0 },
  { "id": "", "min": 80, "max": 89, "label": "80-89", "color": "#666", "value": 0 },
  { "id": "", "min": 90, "max": 100, "label": "90+", "color": "#333", "value": 0 },
]
  