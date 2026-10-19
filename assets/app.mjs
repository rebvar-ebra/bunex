export function getOpeningStatus(day, hour, minute) {
  const minutesNow = hour * 60 + minute;
  const opensAt = 11 * 60 + 30;
  const closesAt = day === 5 || day === 6 ? 24 * 60 : 23 * 60;

  if (minutesNow < opensAt) {
    return {
      isOpen: false,
      label: 'Geschlossen · öffnet um 11:30',
    };
  }

  if (minutesNow >= closesAt) {
    return {
      isOpen: false,
      label: 'Geschlossen · öffnet morgen um 11:30',
    };
  }

  return {
    isOpen: true,
    label: `Geöffnet · bis ${closesAt === 24 * 60 ? '00:00' : '23:00'}`,
  };
}

export function getBerlinTime(date = new Date()) {
  const formatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Berlin',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  });
  const parts = Object.fromEntries(
    formatter
      .formatToParts(date)
      .filter(({ type }) => type !== 'literal')
      .map(({ type, value }) => [type, value]),
  );
  const dayIndexes = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

  return {
    day: dayIndexes[parts.weekday],
    hour: Number(parts.hour),
    minute: Number(parts.minute),
  };
}

export function getOpeningStatusForDate(date = new Date()) {
  const time = getBerlinTime(date);
  return getOpeningStatus(time.day, time.hour, time.minute);
}

if (typeof document !== 'undefined') {
  const statusNode = document.querySelector('[data-opening-status]');
  const pill = document.querySelector('[data-open-pill]');
  const mobileStatus = document.querySelector('[data-mobile-status]');
  const year = document.querySelector('[data-year]');

  const updateOpeningStatus = () => {
    const status = getOpeningStatusForDate();
    if (statusNode) statusNode.textContent = status.label;
    if (pill) pill.classList.toggle('is-closed', !status.isOpen);
    if (mobileStatus) mobileStatus.textContent = status.isOpen ? 'Jetzt geöffnet' : 'Aktuell geschlossen';
  };

  updateOpeningStatus();
  window.setInterval(updateOpeningStatus, 30_000);
  if (year) year.textContent = String(new Date().getFullYear());
}
