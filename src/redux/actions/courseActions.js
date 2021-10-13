import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall } from "./apiStatusActions";

export const loadCourseSuccess = (courses) => {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
};
export const updateCourseSuccess = (course) => {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
};
export const createCourseSuccess = (course) => {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
};
export const loadCourses = () => {
  return (dispatch) => {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCourseSuccess(courses));
      })
      .catch((error) => {
        throw error;
      });
  };
};

export const saveCourse = (course) => {
  return (dispatch) => {
    dispatch(beginApiCall());
    return courseApi.saveCourse(course).then((savedCourse) => {
      course.id
        ? dispatch(updateCourseSuccess(savedCourse))
        : dispatch(createCourseSuccess(savedCourse));
    });
  };
};
