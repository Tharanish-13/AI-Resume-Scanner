import { ExpanderWithHeightTransition } from "../../../components/ExpanderWithHeightTransition";
import {
  DeleteIconButton,
  MoveIconButton,
  ShowIconButton,
} from "../../../components/ResumeForm/Form/IconButton";
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks";
import {
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
} from "../../../lib/redux/ss";
import {
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "../../../lib/redux/rs";

// Basic container for a form section
export const BaseForm = ({ children, className }) => (
  <section className={`base-form ${className || ""}`}>
    {children}
  </section>
);


// Full form section with header
export const Form = ({ form, addButtonText, children }) => {
  const showForm = useAppSelector(selectShowByForm(form));
  const heading = useAppSelector(selectHeadingByForm(form));

  const dispatch = useAppDispatch();
  const setShowForm = (value) => {
    dispatch(changeShowForm({ field: form, value }));
  };
  const setHeading = (value) => {
    dispatch(changeFormHeading({ field: form, value }));
  };

  const isFirstForm = useAppSelector(selectIsFirstForm(form));
  const isLastForm = useAppSelector(selectIsLastForm(form));

  const handleMoveClick = (type) => {
    dispatch(changeFormOrder({ form, type }));
  };

  return (
    <BaseForm className={showForm ? "form-expanded" : "form-collapsed"}>
      <div className="form-header">
        <div className="form-title">
                    <input
            type="text"
            className="form-heading-input"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="form-controls">
          {!isFirstForm && (
            <MoveIconButton type="up" onClick={handleMoveClick} />
          )}
          {!isLastForm && (
            <MoveIconButton type="down" onClick={handleMoveClick} />
          )}
          <ShowIconButton show={showForm} setShow={setShowForm} />
        </div>
      </div>

      <ExpanderWithHeightTransition expanded={showForm}>
        {children}
      </ExpanderWithHeightTransition>

      {showForm && addButtonText && (
        <div className="form-add-button-container">
          <button
            type="button"
            onClick={() => dispatch(addSectionInForm({ form }))}
            className="form-add-button"
          >
            {addButtonText}
          </button>
        </div>
      )}
    </BaseForm>
  );
};

// Section of form with control buttons
export const FormSection = ({
  form,
  idx,
  showMoveUp,
  showMoveDown,
  showDelete,
  deleteButtonTooltipText,
  children,
}) => {
  const dispatch = useAppDispatch();
  const handleDeleteClick = () => {
    dispatch(deleteSectionInFormByIdx({ form, idx }));
  };
  const handleMoveClick = (direction) => {
    dispatch(moveSectionInForm({ form, direction, idx }));
  };

  return (
    <>
      {idx !== 0 && <div className="section-divider" />}
      <div className="form-section">
        {children}
        <div className="section-controls">
          <div className={`control-button ${!showMoveUp ? "hidden" : ""} ${!showMoveDown ? "adjust" : ""}`}>
            <MoveIconButton
              type="up"
              size="small"
              onClick={() => handleMoveClick("up")}
            />
          </div>
          <div className={`control-button ${!showMoveDown ? "hidden" : ""}`}>
            <MoveIconButton
              type="down"
              size="small"
              onClick={() => handleMoveClick("down")}
            />
          </div>
          <div className={`control-button ${!showDelete ? "hidden" : ""}`}>
            <DeleteIconButton
              onClick={handleDeleteClick}
              tooltipText={deleteButtonTooltipText}
            />
          </div>
        </div>
      </div>
    </>
  );
};
