import { courses } from '../data/courses';

const KEY = 'nova_progress';

function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { completedModules: [], assessment: null };
  } catch {
    return { completedModules: [], assessment: null };
  }
}

function write(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function isModuleComplete(moduleId) {
  return read().completedModules.includes(moduleId);
}

export function toggleModuleComplete(moduleId) {
  const data = read();
  const has = data.completedModules.includes(moduleId);
  data.completedModules = has
    ? data.completedModules.filter((id) => id !== moduleId)
    : [...data.completedModules, moduleId];
  write(data);
  return data;
}

export function isCourseComplete(course) {
  const data = read();
  return course.modules.every((m) => data.completedModules.includes(m.id));
}

export function allCoursesComplete() {
  return courses.every((c) => isCourseComplete(c));
}

export function courseProgress(course) {
  const data = read();
  const done = course.modules.filter((m) => data.completedModules.includes(m.id)).length;
  return { done, total: course.modules.length };
}

export function overallProgress() {
  const data = read();
  const total = courses.reduce((sum, c) => sum + c.modules.length, 0);
  return { done: data.completedModules.length, total };
}

export function saveAssessmentResult(result) {
  const data = read();
  data.assessment = result; // { score, passedAt, cooldownUntil }
  write(data);
  return data;
}

export function getAssessmentResult() {
  return read().assessment;
}

export function canRetakeAssessment() {
  const result = getAssessmentResult();
  if (!result || result.passed) return true;
  if (!result.cooldownUntil) return true;
  return Date.now() >= result.cooldownUntil;
}
