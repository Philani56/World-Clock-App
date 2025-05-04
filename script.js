document.addEventListener('DOMContentLoaded', () => {
    const timezoneSelect = document.getElementById('timezone-select');
    const addClockBtn = document.getElementById('add-clock');
    const clocksContainer = document.getElementById('clocks-container');
    
    let clocks = [];
    let timeFormat = '24-hour';
  
    addClockBtn.addEventListener('click', () => {
      const timezone = timezoneSelect.value;
      if (!timezone) return;
      
      addClock(timezone);
      timezoneSelect.value = '';
    });
  
    function addClock(timezone) {
      const clockElement = document.createElement('div');
      clockElement.className = 'clock';
      clocksContainer.appendChild(clockElement);
      
      const clock = {
        timezone,
        element: clockElement,
        interval: setInterval(() => updateClock(clock), 1000)
      };
      
      clocks.push(clock);
      updateClock(clock);
    }
  
    function updateClock(clock) {
      const options = {
        timeZone: clock.timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: timeFormat === '12-hour'
      };
      
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', options);
      const dateString = now.toLocaleDateString('en-US', { 
        timeZone: clock.timezone, 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      clock.element.innerHTML = `
        <h3>${clock.timezone.split('/')[1]}</h3>
        <div class="time">${timeString}</div>
        <div class="date">${dateString}</div>
        <button class="remove-btn">Remove</button>
      `;
      
      clock.element.querySelector('.remove-btn').addEventListener('click', () => {
        removeClock(clock);
      });
    }
  
    function removeClock(clock) {
      clearInterval(clock.interval);
      clock.element.remove();
      clocks = clocks.filter(c => c !== clock);
    }
  });