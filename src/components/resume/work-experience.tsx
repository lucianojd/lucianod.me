import type { WorkExperience } from "@src/types/resume";

interface WorkExperienceProps {
    workExperience: WorkExperience[];
};

interface PositionProps extends WorkExperience {};

function Position({company, position, location, startDate, endDate, experience }: PositionProps) {
    return (
        <div>
            <h2>{company} - {position}; {location}</h2>
            <h3>{startDate} - {endDate}</h3>
            <ul>
                {experience.map((item, i) => (<li key={i}>{item}</li>))}
            </ul>
        </div>
    )
}

export default function WorkExperience({ workExperience }: WorkExperienceProps) {
    return (
        <section id="work-experience">
            <h1>Professional Experience</h1>
            {workExperience.map((position, i) => (<Position key={i} {...position} />))}
        </section>
    )
}