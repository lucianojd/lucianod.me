import type { Education } from "@src/types/resume";

interface EducationProps {
    education: Education[];
};

function Institution({ institution, degree, endDate, startDate }: Education) {
    return (
        <div>
            <h2>{institution}</h2>
            <h3>
                {degree}; {startDate} - {endDate}
            </h3>
        </div>
    )
}

export default function Education({ education }: EducationProps) {
    return (
        <section id="education">
            <h1>Education</h1>
            {education.map(({ institution, degree, endDate, startDate }, index) => (
                <Institution key={index} institution={institution} degree={degree} endDate={endDate} startDate={startDate} />
            ))} 
        </section>
    )
}