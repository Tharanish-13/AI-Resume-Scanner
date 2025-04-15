const ResumeCard = ({ resume }) => {
    return (
      <div className="border p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-bold">{resume.name}</h3>
        <p>{resume.email}</p>
        <p>{resume.skills.join(", ")}</p>
      </div>
    );
  };
  
  export default ResumeCard;
  