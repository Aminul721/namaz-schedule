// Bangladesh Divisions and Districts with coordinates
const bangladeshLocations = {
    "Dhaka": {
        "Dhaka": { lat: 23.8103, lon: 90.4125 },
        "Gazipur": { lat: 24.0022, lon: 90.4264 },
        "Narayanganj": { lat: 23.6238, lon: 90.5000 },
        "Tangail": { lat: 24.2513, lon: 89.9167 },
        "Kishoreganj": { lat: 24.4260, lon: 90.7767 },
        "Manikganj": { lat: 23.8617, lon: 90.0003 },
        "Munshiganj": { lat: 23.5422, lon: 90.5305 },
        "Narsingdi": { lat: 23.9229, lon: 90.7179 },
        "Rajbari": { lat: 23.7574, lon: 89.6444 },
        "Shariatpur": { lat: 23.2423, lon: 90.4348 },
        "Faridpur": { lat: 23.6070, lon: 89.8429 },
        "Gopalganj": { lat: 23.0050, lon: 89.8266 },
        "Madaripur": { lat: 23.1641, lon: 90.1897 }
    },
    "Chittagong": {
        "Chittagong": { lat: 22.3569, lon: 91.7832 },
        "Cox's Bazar": { lat: 21.4272, lon: 92.0058 },
        "Rangamati": { lat: 22.6533, lon: 92.1753 },
        "Bandarban": { lat: 22.1953, lon: 92.2183 },
        "Khagrachhari": { lat: 23.1193, lon: 91.9847 },
        "Feni": { lat: 23.0159, lon: 91.3976 },
        "Lakshmipur": { lat: 22.9447, lon: 90.8282 },
        "Comilla": { lat: 23.4607, lon: 91.1809 },
        "Noakhali": { lat: 22.8696, lon: 91.0995 },
        "Brahmanbaria": { lat: 23.9608, lon: 91.1115 },
        "Chandpur": { lat: 23.2332, lon: 90.6712 }
    },
    "Rajshahi": {
        "Rajshahi": { lat: 24.3745, lon: 88.6042 },
        "Bogra": { lat: 24.8465, lon: 89.3773 },
        "Pabna": { lat: 24.0064, lon: 89.2372 },
        "Natore": { lat: 24.4206, lon: 89.0000 },
        "Sirajganj": { lat: 24.4533, lon: 89.7006 },
        "Naogaon": { lat: 24.7936, lon: 88.9318 },
        "Joypurhat": { lat: 25.0968, lon: 89.0227 },
        "Chapainawabganj": { lat: 24.5965, lon: 88.2775 }
    },
    "Khulna": {
        "Khulna": { lat: 22.8456, lon: 89.5403 },
        "Jessore": { lat: 23.1634, lon: 89.2182 },
        "Satkhira": { lat: 22.7185, lon: 89.0705 },
        "Bagerhat": { lat: 22.6602, lon: 89.7895 },
        "Jhenaidah": { lat: 23.5450, lon: 89.1539 },
        "Magura": { lat: 23.4855, lon: 89.4198 },
        "Narail": { lat: 23.1163, lon: 89.5840 },
        "Chuadanga": { lat: 23.6401, lon: 88.8410 },
        "Kushtia": { lat: 23.9012, lon: 89.1202 },
        "Meherpur": { lat: 23.7622, lon: 88.6318 }
    },
    "Barisal": {
        "Barisal": { lat: 22.7010, lon: 90.3535 },
        "Patuakhali": { lat: 22.3596, lon: 90.3298 },
        "Pirojpur": { lat: 22.5791, lon: 89.9759 },
        "Bhola": { lat: 22.6859, lon: 90.6482 },
        "Barguna": { lat: 22.1594, lon: 90.1121 },
        "Jhalokati": { lat: 22.6406, lon: 90.1987 }
    },
    "Sylhet": {
        "Sylhet": { lat: 24.8949, lon: 91.8687 },
        "Moulvibazar": { lat: 24.4829, lon: 91.7774 },
        "Habiganj": { lat: 24.3745, lon: 91.4547 },
        "Sunamganj": { lat: 25.0658, lon: 91.3950 }
    },
    "Rangpur": {
        "Rangpur": { lat: 25.7439, lon: 89.2752 },
        "Dinajpur": { lat: 25.6217, lon: 88.6354 },
        "Gaibandha": { lat: 25.3285, lon: 89.5430 },
        "Kurigram": { lat: 25.8072, lon: 89.6361 },
        "Lalmonirhat": { lat: 25.9923, lon: 89.2847 },
        "Nilphamari": { lat: 25.9317, lon: 88.8560 },
        "Panchagarh": { lat: 26.3411, lon: 88.5541 },
        "Thakurgaon": { lat: 26.0336, lon: 88.4616 }
    },
    "Mymensingh": {
        "Mymensingh": { lat: 24.7471, lon: 90.4203 },
        "Jamalpur": { lat: 24.9375, lon: 89.9370 },
        "Netrokona": { lat: 24.8104, lon: 90.7275 },
        "Sherpur": { lat: 25.0204, lon: 90.0152 }
    }
};

// Main App
class NamazScheduleApp {
    constructor() {
        this.latitude = null;
        this.longitude = null;
        this.prayerTimes = {};
        this.manualLocationMode = false;
        this.notificationsEnabled = false;
        this.lastNotifiedPrayer = null;
        this.init();
    }

    async init() {
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);

        // Setup location selectors
        this.setupLocationSelectors();

        // Setup notifications
        this.setupNotifications();

        await this.getLocation();
        await this.fetchPrayerTimes();

        // Update prayer status every minute
        setInterval(() => this.updatePrayerStatus(), 60000);

        // Check for prayer time notifications every 30 seconds
        setInterval(() => this.checkPrayerTimeNotification(), 30000);

        // Refresh location button
        document.getElementById('refreshLocation').addEventListener('click', async () => {
            if (!this.manualLocationMode) {
                await this.getLocation();
                await this.fetchPrayerTimes();
            }
        });
    }

    setupLocationSelectors() {
        const divisionSelect = document.getElementById('divisionSelect');
        const districtSelect = document.getElementById('districtSelect');
        const applyButton = document.getElementById('applyLocation');

        // Populate divisions
        Object.keys(bangladeshLocations).forEach(division => {
            const option = document.createElement('option');
            option.value = division;
            option.textContent = division;
            divisionSelect.appendChild(option);
        });

        // Division change event
        divisionSelect.addEventListener('change', () => {
            const selectedDivision = divisionSelect.value;
            districtSelect.innerHTML = '<option value="">Select District</option>';

            if (selectedDivision) {
                districtSelect.disabled = false;
                const districts = bangladeshLocations[selectedDivision];

                Object.keys(districts).forEach(district => {
                    const option = document.createElement('option');
                    option.value = district;
                    option.textContent = district;
                    districtSelect.appendChild(option);
                });
            } else {
                districtSelect.disabled = true;
                applyButton.disabled = true;
            }
        });

        // District change event
        districtSelect.addEventListener('change', () => {
            applyButton.disabled = !districtSelect.value;
        });

        // Apply location button
        applyButton.addEventListener('click', async () => {
            const division = divisionSelect.value;
            const district = districtSelect.value;

            if (division && district) {
                const location = bangladeshLocations[division][district];
                this.latitude = location.lat;
                this.longitude = location.lon;
                this.manualLocationMode = true;

                document.getElementById('locationText').textContent = `${district}, ${division}`;
                await this.fetchPrayerTimes();
            }
        });
    }

    setupNotifications() {
        const notificationToggle = document.getElementById('notificationToggle');

        // Check if notifications are supported
        if (!('Notification' in window)) {
            notificationToggle.disabled = true;
            return;
        }

        // Load saved preference
        const savedPref = localStorage.getItem('notificationsEnabled');
        if (savedPref === 'true' && Notification.permission === 'granted') {
            notificationToggle.checked = true;
            this.notificationsEnabled = true;
        }

        // Toggle event
        notificationToggle.addEventListener('change', async () => {
            if (notificationToggle.checked) {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    this.notificationsEnabled = true;
                    localStorage.setItem('notificationsEnabled', 'true');
                    this.showTestNotification();
                } else {
                    notificationToggle.checked = false;
                    this.notificationsEnabled = false;
                }
            } else {
                this.notificationsEnabled = false;
                localStorage.setItem('notificationsEnabled', 'false');
            }
        });

        // Load voices for speech synthesis
        if ('speechSynthesis' in window) {
            // Chrome requires this event to load voices
            window.speechSynthesis.onvoiceschanged = () => {
                window.speechSynthesis.getVoices();
            };
        }
    }

    showTestNotification() {
        new Notification('Prayer Notifications Enabled', {
            body: 'You will be notified when it\'s time for salat 🕌',
            icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🕌</text></svg>',
            badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🕌</text></svg>'
        });

        // Test voice announcement
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Prayer notifications are now enabled. You will receive voice alerts for salat times.');
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        }
    }

    checkPrayerTimeNotification() {
        if (!this.notificationsEnabled || Object.keys(this.prayerTimes).length === 0) {
            return;
        }

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        const prayerNames = {
            fajr: 'Fajr',
            dhuhr: 'Dhuhr',
            asr: 'Asr',
            maghrib: 'Maghrib',
            isha: 'Isha'
        };

        const prayerEmojis = {
            fajr: '🌅',
            dhuhr: '☀️',
            asr: '🌤️',
            maghrib: '🌇',
            isha: '🌙'
        };

        for (const prayer of prayers) {
            if (this.prayerTimes[prayer] === currentTime) {
                // Avoid duplicate notifications within the same minute
                if (this.lastNotifiedPrayer !== `${prayer}-${currentTime}`) {
                    this.lastNotifiedPrayer = `${prayer}-${currentTime}`;

                    const notification = new Notification(`${prayerEmojis[prayer]} Time for ${prayerNames[prayer]} Prayer`, {
                        body: `It's time for ${prayerNames[prayer]} salat. Prayer time is ${this.prayerTimes[prayer]}`,
                        icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🕌</text></svg>',
                        badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🕌</text></svg>',
                        requireInteraction: true,
                        tag: `prayer-${prayer}`
                    });

                    // Play notification sound
                    this.playNotificationSound();

                    // Speak prayer announcement
                    this.speakPrayerAnnouncement(prayerNames[prayer]);

                    // Auto-close after 30 seconds
                    setTimeout(() => notification.close(), 30000);

                    break;
                }
            }
        }
    }

    playNotificationSound() {
        // Create a simple notification beep using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = 800;
            oscillator.type = 'sine';

            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Could not play notification sound:', error);
        }
    }

    speakPrayerAnnouncement(prayerName) {
        // Use Web Speech API for voice announcement
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance();
            utterance.text = `Assalamu alaikum. It's time for ${prayerName} prayer. Please prepare for salat.`;
            utterance.lang = 'en-US';
            utterance.rate = 0.9; // Slightly slower for clarity
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            // Try to use a pleasant voice if available
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice =>
                voice.lang.startsWith('en') &&
                (voice.name.includes('Female') || voice.name.includes('Google') || voice.name.includes('Microsoft'))
            );

            if (preferredVoice) {
                utterance.voice = preferredVoice;
            }

            window.speechSynthesis.speak(utterance);
        }
    }

    updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const dateString = now.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        document.getElementById('currentTime').textContent = timeString;
        document.getElementById('currentDate').textContent = dateString;
    }

    async getLocation() {
        document.getElementById('locationText').textContent = 'Detecting location...';

        if (!navigator.geolocation) {
            this.useDefaultLocation();
            return;
        }

        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    timeout: 10000,
                    maximumAge: 0
                });
            });

            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;

            // Get location name
            await this.getLocationName(this.latitude, this.longitude);

        } catch (error) {
            console.error('Geolocation error:', error);
            this.useDefaultLocation();
        }
    }

    useDefaultLocation() {
        // Default to Dhaka, Bangladesh
        this.latitude = 23.8103;
        this.longitude = 90.4125;
        document.getElementById('locationText').textContent = 'Dhaka, Bangladesh (Default)';
    }

    async getLocationName(lat, lon) {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
                { headers: { 'User-Agent': 'NamazScheduleApp/1.0' } }
            );
            const data = await response.json();

            const city = data.address.city || data.address.town || data.address.village || 'Unknown';
            const country = data.address.country || '';

            document.getElementById('locationText').textContent = `${city}, ${country}`;
        } catch (error) {
            document.getElementById('locationText').textContent = `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
        }
    }

    async fetchPrayerTimes() {
        if (!this.latitude || !this.longitude) {
            this.useDefaultLocation();
        }

        try {
            // Try Aladhan API first
            const now = new Date();
            const timestamp = Math.floor(now.getTime() / 1000);

            const response = await fetch(
                `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${this.latitude}&longitude=${this.longitude}&method=2`
            );

            if (!response.ok) throw new Error('API request failed');

            const data = await response.json();

            if (data.code === 200 && data.data && data.data.timings) {
                const timings = data.data.timings;

                this.prayerTimes = {
                    fajr: this.formatTime24(timings.Fajr),
                    dhuhr: this.formatTime24(timings.Dhuhr),
                    asr: this.formatTime24(timings.Asr),
                    maghrib: this.formatTime24(timings.Maghrib),
                    isha: this.formatTime24(timings.Isha)
                };

                this.displayPrayerTimes();
                this.updatePrayerStatus();
            } else {
                throw new Error('Invalid API response');
            }

        } catch (error) {
            console.error('Error fetching prayer times:', error);
            // Fallback to local calculation
            this.calculatePrayerTimesLocally();
        }
    }

    formatTime24(time) {
        // Convert from "HH:MM (timezone)" or "HH:MM" to "HH:MM"
        const match = time.match(/(\d{2}):(\d{2})/);
        if (match) {
            return `${match[1]}:${match[2]}`;
        }
        return time;
    }

    calculatePrayerTimesLocally() {
        // Simple fallback calculation for Dhaka, Bangladesh timezone (UTC+6)
        // These are approximate times, adjust based on your location
        const now = new Date();
        const month = now.getMonth() + 1;

        // Approximate prayer times for Dhaka (will vary by season)
        // These are reasonable defaults
        let fajr, dhuhr, asr, maghrib, isha;

        if (month >= 4 && month <= 9) {
            // Summer times (April to September)
            fajr = '04:15';
            dhuhr = '12:00';
            asr = '16:30';
            maghrib = '18:30';
            isha = '19:45';
        } else {
            // Winter times (October to March)
            fajr = '05:30';
            dhuhr = '12:00';
            asr = '15:30';
            maghrib = '17:30';
            isha = '18:45';
        }

        this.prayerTimes = { fajr, dhuhr, asr, maghrib, isha };
        this.displayPrayerTimes();
        this.updatePrayerStatus();
    }

    displayPrayerTimes() {
        document.getElementById('fajrTime').textContent = this.prayerTimes.fajr;
        document.getElementById('dhuhrTime').textContent = this.prayerTimes.dhuhr;
        document.getElementById('asrTime').textContent = this.prayerTimes.asr;
        document.getElementById('maghribTime').textContent = this.prayerTimes.maghrib;
        document.getElementById('ishaTime').textContent = this.prayerTimes.isha;
    }

    updatePrayerStatus() {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const prayers = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
        const prayerNames = {
            fajr: 'Fajr',
            dhuhr: 'Dhuhr',
            asr: 'Asr',
            maghrib: 'Maghrib',
            isha: 'Isha'
        };

        // Convert prayer times to minutes
        const prayerMinutes = {};
        prayers.forEach(prayer => {
            if (this.prayerTimes[prayer]) {
                const [hours, mins] = this.prayerTimes[prayer].split(':');
                prayerMinutes[prayer] = parseInt(hours) * 60 + parseInt(mins);
            }
        });

        // Find current and next prayer
        let currentPrayer = null;
        let nextPrayer = null;

        for (let i = 0; i < prayers.length; i++) {
            if (prayerMinutes[prayers[i]] && currentMinutes >= prayerMinutes[prayers[i]]) {
                currentPrayer = prayers[i];
            } else if (prayerMinutes[prayers[i]]) {
                nextPrayer = prayers[i];
                break;
            }
        }

        // If no next prayer today, next is Fajr tomorrow
        if (!nextPrayer) {
            nextPrayer = 'fajr';
        }

        // Update UI
        prayers.forEach(prayer => {
            const card = document.querySelector(`[data-prayer="${prayer}"]`);
            if (card) {
                card.classList.remove('current', 'passed');

                if (prayer === currentPrayer) {
                    card.classList.add('current');
                } else if (currentPrayer && prayers.indexOf(prayer) < prayers.indexOf(currentPrayer)) {
                    card.classList.add('passed');
                }
            }
        });

        // Update next prayer display
        document.getElementById('nextPrayerName').textContent = prayerNames[nextPrayer];
        document.getElementById('nextPrayerTime').textContent = this.prayerTimes[nextPrayer] || '--:--';

        // Calculate time remaining
        if (prayerMinutes[nextPrayer]) {
            let nextPrayerMinutes = prayerMinutes[nextPrayer];
            if (nextPrayerMinutes <= currentMinutes) {
                nextPrayerMinutes += 24 * 60; // Add 24 hours for tomorrow
            }

            const remainingMinutes = nextPrayerMinutes - currentMinutes;
            const hours = Math.floor(remainingMinutes / 60);
            const minutes = remainingMinutes % 60;

            let timeRemainingText = '';
            if (hours > 0) {
                timeRemainingText = `in ${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            } else {
                timeRemainingText = `in ${minutes} minute${minutes !== 1 ? 's' : ''}`;
            }

            document.getElementById('timeRemaining').textContent = timeRemainingText;
        } else {
            document.getElementById('timeRemaining').textContent = 'Calculating...';
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NamazScheduleApp();
});
