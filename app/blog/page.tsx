'use server';

import path from 'path';
import fs from 'fs';
import { BlogEntry } from '@src/types/blog-list';

export default async function Page() {
    const assetsDir = path.join(process.cwd(), 'src/assets');
    const dataFile = path.join(assetsDir, 'blog-list.json');

    const data = JSON.parse(fs.readFileSync(dataFile, 'utf8')) as BlogEntry[];

    return (
        <section id="blog-list">
            {data.map((entry, index) => (
                <div key={index}>
                    <h2><a href={entry.url}>{entry.title}</a></h2>
                    <p>{entry.date}</p>
                    <p>{entry.tags.join(', ')}</p>
                </div>
            ))}
        </section>
    )
}