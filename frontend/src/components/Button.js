import { cx } from "../lib/cx";
import { Tooltip } from "../components/Tooltip";

const isAnchor = (props) => {
  return "href" in props;
};

export const Button = (props) => {
  if (isAnchor(props)) {
    return <a {...props} />;
  } else {
    return <button type="button" {...props} />;
  }
};

export const PrimaryButton = ({ className, ...props }) => (
  <Button className={cx("btn-primary", className)} {...props} />
);

export const IconButton = ({
  className,
  size = "medium",
  tooltipText,
  ...props
}) => {
  const sizeClass = size === "medium" ? "icon-button-medium" : "icon-button-small";

  return (
    <Tooltip text={tooltipText}>
      <Button
        type="button"
        className={cx("icon-button", sizeClass, className)}
        {...props}
      />
    </Tooltip>
  );
};
