export function parseDateFromString(dateString: string): Date | null {
  // Kiểm tra format dd-MM-yyyy
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/;
  if (!dateRegex.test(dateString)) {
    return null;
  }

  // Split string thành ngày, tháng, năm
  const [day, month, year] = dateString.split('-').map(Number);

  // Tạo Date object với giờ là 00:00:00 theo giờ địa phương
  const date = new Date(year, month - 1, day);
  date.setHours(7, 0, 0, 0); // Set về 7 giờ sáng để khi chuyển sang UTC sẽ là 00:00

  // Kiểm tra tính hợp lệ của ngày
  if (
    date.getDate() !== day ||
    date.getMonth() !== month - 1 ||
    date.getFullYear() !== year
  ) {
    return null;
  }

  return date;
}

export function formatDateToString(date: Date): string {
  // Chuyển đổi về múi giờ địa phương
  const localDate = new Date(date.getTime() + 7 * 60 * 60 * 1000); // Thêm 7 giờ
  const day = String(localDate.getDate()).padStart(2, '0');
  const month = String(localDate.getMonth() + 1).padStart(2, '0');
  const year = localDate.getFullYear();
  return `${day}-${month}-${year}`;
}
