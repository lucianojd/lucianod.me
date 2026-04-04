export function createKey(date: string | Date): string {
    if (typeof date === 'string') {
        return `apod:${date}`;
    } else {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `apod:${year}-${month}-${day}`;
    }
}

export function compareKeys(key1: string, key2: string): boolean {
    return key1 === key2;
}