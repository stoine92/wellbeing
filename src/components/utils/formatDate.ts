import { format, parseISO, isValid } from "date-fns";

/**
 * Formats a date string (YYYY-MM-DD) into "dd MMM yyyy"
 * Example: "2017-01-06" -> "06 Jan 2017"
 * @param dateStr - date string in ISO format (YYYY-MM-DD)
 * @returns formatted date string or null if invalid
 */
export function formatDate(dateStr: string): string | null {
    try {
        if(!dateStr) return null;

        const parsedDate = parseISO(dateStr);

        if(!isValid(parsedDate)){
            console.warn(`Invalid date passed to formatDate: "${dateStr}"`);
            return null;
        }

        return format(parsedDate, "dd MMM yyyy");

    } catch (error) {
        console.error("Error formatting date:", error);
        return null;
    }
}