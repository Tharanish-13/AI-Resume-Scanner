import { BaseForm } from "../../components/ResumeForm/Form";
import { Input, Textarea } from "../../components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "../../lib/redux/hooks";
import { changeProfile, selectProfile } from "../../lib/redux/rs";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile); // Correctly use the selector
  const dispatch = useAppDispatch();

  if (!profile) {
    console.error("Profile state is undefined");
    return null; // Prevent rendering if profile is undefined
  }

  const { name, email, phone, url, summary, location } = profile;

  const handleProfileChange = (field, value) => {
    dispatch(changeProfile({ field, value }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Sal Khan"
          value={name}
          onChange={(e) => handleProfileChange("name", e.target.value)}
        />
        <Textarea
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={(e) => handleProfileChange("summary", e.target.value)}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={(e) => handleProfileChange("email", e.target.value)}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={(e) => handleProfileChange("phone", e.target.value)}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder="linkedin.com/in/khanacademy"
          value={url}
          onChange={(e) => handleProfileChange("url", e.target.value)}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={(e) => handleProfileChange("location", e.target.value)}
        />
      </div>
    </BaseForm>
  );
};