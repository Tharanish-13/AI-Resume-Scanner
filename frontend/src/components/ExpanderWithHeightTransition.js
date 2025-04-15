export const ExpanderWithHeightTransition = ({ expanded, children }) => {
    return (
      <div
        className={`expander-wrapper ${expanded ? "expander-visible" : "expander-hidden"}`}
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
      >
        <div className="expander-content">{children}</div>
      </div>
    );
  };
  