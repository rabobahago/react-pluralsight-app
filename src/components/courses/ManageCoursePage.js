import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
//import { withRouter } from "react-router-dom";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";

const ManageCoursePage = ({
  authors,
  courses,
  loadAuthors,
  loadCourses,
  saveCourse,
  history,
  ...props
}) => {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
  }, [loadAuthors, loadCourses, authors.length, courses.length]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  };
  const handleSave = (e) => {
    e.preventDefault();
    saveCourse(course).then(() => {
      history.push("/courses");
    });
  };
  return (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
    />
  );
};

ManageCoursePage.propTypes = {
  courses: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    authors: state.authors
  };
};
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
