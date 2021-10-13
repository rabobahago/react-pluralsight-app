import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

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
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("loading courses failed" + error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("loading authors failed" + error);
      });
    }
  }, [loadAuthors, loadCourses, authors.length, courses.length, props.course]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  };
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }
  const handleSave = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return authors.length === 0 || course.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
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
const getCourseBySlug = (courses, slug) => {
  return courses.find((course) => course.slug === slug) || null;
};
const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const newCourse = {
    id: null,
    title: "",
    authorId: null,
    category: ""
  };
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
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
