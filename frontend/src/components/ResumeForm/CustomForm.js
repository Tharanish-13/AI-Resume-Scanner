import { Form } from "../../components/ResumeForm/Form";
import { BulletListIconButton } from "../../components/ResumeForm/Form/IconButton";
import { BulletListTextarea } from "../../components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { changeCustom, selectCustom } from "../../lib/redux/rs";
import {
  selectShowBulletPoints,
  changeShowBulletPoints,
} from "../../lib/redux/ss";

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom);
  const dispatch = useAppDispatch();
  const { descriptions } = custom;
  const form = "custom";
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form));

  const handleCustomChange = (field, value) => {
    dispatch(changeCustom({ field, value }));
  };

  const handleShowBulletPoints = (value) => {
    dispatch(changeShowBulletPoints({ field: form, value }));
  };

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextarea
            label="Custom Textbox"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder="Bullet points"
            value={descriptions}
            onChange={handleCustomChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[7.7rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
