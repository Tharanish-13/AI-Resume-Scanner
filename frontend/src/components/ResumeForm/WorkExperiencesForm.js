import { Form, FormSection } from "../../components/ResumeForm/Form";
import {
  Input,
  BulletListTextarea,
} from "../../components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import {
  changeWorkExperiences,
  selectWorkExperiences,
} from "../../lib/redux/rs";

export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences); // Correctly use the selector
  const dispatch = useAppDispatch();

  if (!workExperiences) {
    console.error("WorkExperiences state is undefined");
    return null; // Prevent rendering if workExperiences is undefined
  }

  const showDelete = workExperiences.length > 1;

  return (
    <Form form="workExperiences" addButtonText="Add Job">
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        const handleWorkExperienceChange = (field, value) => {
          dispatch(changeWorkExperiences({ idx, field, value }));
        };

        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== workExperiences.length - 1;

        return (
          <FormSection
            key={idx}
            form="workExperiences"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete job"
          >
            <Input
              label="Company"
              className="input-label"
              name="company"
              placeholder="Khan Academy"
              value={company}
              onChange={(e) => handleWorkExperienceChange("company", e.target.value)}
            />
            <Input
              label="Job Title"
              className="input-label"
              name="jobTitle"
              placeholder="Software Engineer"
              value={jobTitle}
              onChange={(e) => handleWorkExperienceChange("jobTitle", e.target.value)}
            />
            <Input
              label="Date"
              className="input-label"
              name="date"
              placeholder="Jun 2022 - Present"
              value={date}
              onChange={(e) => handleWorkExperienceChange("date", e.target.value)}
            />
            <BulletListTextarea
              label="Description"
              className="input-label"
              name="descriptions"
              placeholder="Bullet points"
              value={descriptions}
              onChange={(e) => handleWorkExperienceChange("descriptions", e.target.value)}
            />
          </FormSection>
        );
      })}
    </Form>
  );
};