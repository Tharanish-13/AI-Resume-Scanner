import { Form, FormSection } from "../../components/ResumeForm/Form";
import {
  BulletListTextarea,
  Input,
} from "../../components/ResumeForm/Form/InputGroup";
import { BulletListIconButton } from "../../components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { changeEducations, selectEducations } from "../../lib/redux/rs";
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "../../lib/redux/ss";

export const EducationsForm = () => {
  const educations = useAppSelector((state) => selectEducations(state)); // Ensure correct usage of selector
  const dispatch = useAppDispatch();
  const showDelete = educations?.length > 1; // Add optional chaining to prevent runtime errors
  const form = "educations";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form)); // Correct usage
  
  if (!educations) {
    console.error("Educations state is undefined");
    return null; // Prevent rendering if educations is undefined
  }

  return (
    <Form form={form} addButtonText="Add School">
      {educations.map(({ school, degree, gpa, date, descriptions }, idx) => {
        const handleEducationChange = (field, value) => {
          dispatch(changeEducations({ idx, field, value }));
        };

        const handleShowBulletPoints = (value) => {
          dispatch(changeShowBulletPoints({ field: form, value }));
        };

        const showMoveUp = idx !== 0;
        const showMoveDown = idx !== educations.length - 1;

        return (
          <FormSection
            key={idx}
            form="educations"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete school"
          >
            <Input
              label="School"
              labelClassName="col-span-4"
              name="school"
              placeholder="Cornell University"
              value={school}
              onChange={(e) => handleEducationChange("school", e.target.value)}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="May 2018"
              value={date}
              onChange={(e) => handleEducationChange("date", e.target.value)}
            />
            <Input
              label="Degree & Major"
              labelClassName="col-span-4"
              name="degree"
              placeholder="Bachelor of Science in Computer Engineering"
              value={degree}
              onChange={(e) => handleEducationChange("degree", e.target.value)}
            />
            <Input
              label="GPA"
              labelClassName="col-span-2"
              name="gpa"
              placeholder="3.81"
              value={gpa}
              onChange={(e) => handleEducationChange("gpa", e.target.value)}
            />
            <div className="relative col-span-full">
              <BulletListTextarea
                label="Additional Information (Optional)"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder="Free paragraph space to list out additional activities, courses, awards etc"
                value={descriptions}
                onChange={(e) => handleEducationChange("descriptions", e.target.value)}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[15.6rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </FormSection>
        );
      })}
    </Form>
  );
};