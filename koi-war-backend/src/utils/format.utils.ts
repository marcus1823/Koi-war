export function parseDateFromString(dateString: string): Date | null {
    // Kiểm tra format dd-MM-yyyy
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
    if (!dateRegex.test(dateString)) {
        return null;
    }

    // Split string thành ngày, tháng, năm
    const [day, month, year] = dateString.split('-').map(Number);

    // Tạo Date object
    const date = new Date(Date.UTC(year, month - 1, day));

    // Kiểm tra tính hợp lệ của ngày
    const utcDay = date.getUTCDate();
    const utcMonth = date.getUTCMonth();
    const utcYear = date.getUTCFullYear();

    if (
        utcDay !== day ||
        utcMonth !== month - 1 ||
        utcYear !== year
    ) {
        return null;
    }

    return date;
}

export function formatDateToString(date: Date): string {
    const utcDay = String(date.getUTCDate()).padStart(2, '0');
    const utcMonth = String(date.getUTCMonth() + 1).padStart(2, '0');
    const utcYear = date.getUTCFullYear();
    return `${utcDay}-${utcMonth}-${utcYear}`;
}
