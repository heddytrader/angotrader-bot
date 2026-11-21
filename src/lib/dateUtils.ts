/**
 * Utilitário de Data e Hora de Angola (Luanda, UTC+1 / WAT)
 * Garante que em qualquer dispositivo ou servidor o fuso horário seja sempre GMT+1.
 */
export function getAngolaDateTime(date: Date = new Date()) {
  try {
    const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
      timeZone: 'Africa/Luanda',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const timeFormatter = new Intl.DateTimeFormat('pt-PT', {
      timeZone: 'Africa/Luanda',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
    const d = dateFormatter.format(date);
    const t = timeFormatter.format(date);
    return {
      date: d,
      time: t,
      dateTime: `${d} ${t}`,
      fullHeader: `📅 Data: ${d} - Hora Angola: ${t} (GMT+1)`,
      cardHeader: `📅 ${d} | 🕒 ${t} Angola`
    };
  } catch (e) {
    // Fallback matemático UTC+1
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    const angolaDate = new Date(utc + (3600000 * 1)); // UTC+1
    const day = String(angolaDate.getDate()).padStart(2, '0');
    const month = String(angolaDate.getMonth() + 1).padStart(2, '0');
    const year = angolaDate.getFullYear();
    const hours = String(angolaDate.getHours()).padStart(2, '0');
    const minutes = String(angolaDate.getMinutes()).padStart(2, '0');
    const d = `${day}/${month}/${year}`;
    const t = `${hours}:${minutes}`;
    return {
      date: d,
      time: t,
      dateTime: `${d} ${t}`,
      fullHeader: `📅 Data: ${d} - Hora Angola: ${t} (GMT+1)`,
      cardHeader: `📅 ${d} | 🕒 ${t} Angola`
    };
  }
}
