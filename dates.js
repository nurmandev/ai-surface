  // Real-time date update
  const topDateElement = document.querySelector('.top-date');

  function updateDate() {
    if (topDateElement) {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const today = new Date();
      const dateString = today.toLocaleDateString('en-US', options);
      topDateElement.textContent = dateString;
    }
  }

  // Update date immediately on page load
  updateDate();

  // Update date at midnight to reflect the new day
  function scheduleNextMidnight() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const timeUntilMidnight = tomorrow.getTime() - now.getTime();
    setTimeout(() => {
      updateDate();
      scheduleNextMidnight();
    }, timeUntilMidnight);
  }

  scheduleNextMidnight();
