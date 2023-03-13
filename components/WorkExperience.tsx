import Box from '@components/Box';
import { memo } from 'react';
import { WorkExperienceContent } from './helpers';

interface WorkExperienceProps {
    content: WorkExperienceContent
}

function WorkExperience({content}: WorkExperienceProps) {
    const {company, experience, description, position} = content;
    return (
    <Box>
        <h2>{company}</h2>
        <h3>{position}</h3>
        <p>{description}</p>
        <table>
            <thead>
                <tr>
                    <th>Topic</th>
                    <th>Experience</th>
                </tr>
            </thead>
            <tbody>
                {experience.map(({title, points}, index) => (
                    <tr key={index}>
                        <td>
                            {title}
                        </td>
                        <td>
                            <ul>
                                {points.map((point, index) => <li key={index}>{point}</li>)}
                            </ul>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </Box>);
}

export default memo(WorkExperience);