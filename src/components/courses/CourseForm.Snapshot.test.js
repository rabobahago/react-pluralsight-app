import React from "react";
import CourseForm from "./CourseForm";
import renderer from "react-test-renderer";
import { authors, courses } from "../../../tools/mockData";
it("set submit button label to 'savin...'when saving is true", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving
    />
  );
  expect(tree).toMatchSnapshot();
});

it("sets submit button label to 'save'when saving is false", () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onSave={jest.fn()}
      onChange={jest.fn()}
      saving={false}
    />
  );
  expect(tree).toMatchSnapshot();
});
