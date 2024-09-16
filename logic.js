// Dark Mode Toggle
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('nav, .section, table, th, td, .post').forEach((element) => {
        element.classList.toggle('dark-mode');
    });

    // Update Chart Colors for Dark Mode
    const isDarkMode = document.body.classList.contains('dark-mode');
    if (progressPieChart) {
        progressPieChart.options.plugins.legend.labels.color = isDarkMode ? 'white' : 'black';
        progressPieChart.options.scales = isDarkMode ? {
            y: { ticks: { color: 'white' }, grid: { color: '#444' } },
            x: { ticks: { color: 'white' }, grid: { color: '#444' } }
        } : {};
        progressPieChart.update();
    }

    if (progressLineChart) {
        progressLineChart.options.plugins.legend.labels.color = isDarkMode ? 'white' : 'black';
        progressLineChart.options.scales = isDarkMode ? {
            y: { ticks: { color: 'white' }, grid: { color: '#444' } },
            x: { ticks: { color: 'white' }, grid: { color: '#444' } }
        } : {};
        progressLineChart.update();
    }
}

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll('main').forEach((section) => section.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');

    // Toggle the background image visibility
    if (sectionId === 'home') {
        document.getElementById('loginBackground').classList.add('hide-background');
        document.getElementById('signupBackground').classList.add('hide-background');
    } else {
        document.getElementById('loginBackground').classList.remove('hide-background');
        document.getElementById('signupBackground').classList.remove('hide-background');
    }
}

// Login Function
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Simple authentication using localStorage
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    if (username === savedUsername && password === savedPassword) {
        alert("Login successful!");
        document.getElementById('loginSection').classList.add('hidden');
        document.getElementById('signupSection').classList.add('hidden');
        document.getElementById('header').classList.remove('hidden');
        document.getElementById('nav').classList.remove('hidden');
        document.getElementById('home').classList.remove('hidden');
        loadProfile(username);
    } else {
        alert("Invalid username or password");
    }
}

// Signup Function
function signup() {
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const email = document.getElementById('signupEmail').value;
    const dob = document.getElementById('signupDob').value;
    const profession = document.getElementById('signupProfession').value;
    const profilePicture = document.getElementById('signupProfilePicture').files[0];

    if (username && password && email && dob && profession && profilePicture) {
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('email', email);
        localStorage.setItem('dob', dob);
        localStorage.setItem('profession', profession);
        localStorage.setItem('profilePicture', URL.createObjectURL(profilePicture));
        alert("Account created successfully! You can now log in.");
        showLogin();
    } else {
        alert("Please enter all required fields.");
    }
}

// Show Signup Page
function showSignup() {
    document.getElementById('loginSection').classList.add('hidden');
    document.getElementById('signupSection').classList.remove('hidden');
}

// Show Login Page
function showLogin() {
    document.getElementById('signupSection').classList.add('hidden');
    document.getElementById('loginSection').classList.remove('hidden');
}

// Load Profile Information
function loadProfile(username) {
    const userProfile = localStorage.getItem('userProfile');
    if (userProfile) {
        const userData = JSON.parse(userProfile);
        document.getElementById('profileUsername').innerText = userData.username;
        document.getElementById('profileEmail').innerText = userData.email;
        document.getElementById('profileDob').innerText = userData.dob;
        document.getElementById('profileFitnessLevel').innerText = userData.fitnessLevel;
        document.getElementById('profilePoints').innerText = userData.points;
        document.getElementById('profileProfession').innerText = userData.profession;
        document.getElementById('profilePhoto').src = userData.profilePicture;
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadProfile(localStorage.getItem('username'));
    displayRandomQuote();
});

// Array of motivational quotes
const quotes = [
    "The only bad workout is the one that didn’t happen.",
    "Push yourself because no one else is going to do it for you.",
    "Success is what comes after you stop making excuses.",
    "Hard work beats talent when talent doesn't work hard.",
    "Your only limit is your mind.",
    "Dream it. Believe it. Build it.",
    "Don't wait for the perfect moment. Take the moment and make it perfect.",
    "The difference between a successful person and others is not a lack of strength, not a lack of knowledge, but rather a lack in will."
];

// Function to display a random quote
function displayRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quoteElement = document.getElementById('motivationalQuote');
    quoteElement.textContent = quotes[randomIndex];
}

// Athletics Selection
function selectAthletics(athleticsType) {
    document.getElementById('athleticsName').textContent = athleticsType;
    document.getElementById('selectedAthletics').classList.remove('hidden');
}

// Stopwatch Functions
let stopwatchInterval;
let totalSeconds = 0;

function startStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchInterval = setInterval(() => {
        totalSeconds++;
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        document.getElementById('stopwatchDisplay').textContent =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

document.getElementById('startStopwatch').addEventListener('click', startStopwatch);
document.getElementById('stopStopwatch').addEventListener('click', stopStopwatch);

// AI Mentor Feedback (Placeholder for actual AI functionality)
function startAiMentor() {
    document.getElementById('aiMentorFeedback').textContent = 'AI Mentor: Keep up the great work! Focus on your form and stay hydrated.';
    // Placeholder: Integrate AI functionalities here
}

// Daily Goal Tracking
let dailyGoal = 0;
let repsCompleted = 0;

function setDailyGoal() {
    dailyGoal = parseInt(document.getElementById('dailyGoalInput').value);
    if (isNaN(dailyGoal) || dailyGoal <= 0) {
        alert("Please enter a valid number of reps.");
        return;
    }
    document.getElementById('dailyGoalStatus').textContent = dailyGoal;
    repsCompleted = 0;
    document.getElementById('repsCompleted').textContent = repsCompleted;
    document.getElementById('goalStatus').textContent = `Daily goal set to ${dailyGoal} reps.`;
}

function completeRep() {
    if (repsCompleted < dailyGoal) {
        repsCompleted++;
        document.getElementById('repsCompleted').textContent = repsCompleted;
        document.getElementById('goalStatus').textContent = `You have completed ${repsCompleted} reps out of ${dailyGoal}.`;
        if (repsCompleted === dailyGoal) {
            alert('Congratulations! You have completed your daily goal!');
        }
    } else {
        alert('You have already completed your goal for today!');
    }
}

// AI Chatbot for Mental Health Assessment
const chatbotQuestions = [
    "How are you feeling today?",
    "What's been on your mind lately?",
    "Have you been experiencing any stress or anxiety?",
    "How would you rate your mood on a scale of 1-5?",
    "Have you been getting enough sleep?",
];

let currentQuestionIndex = 0;
let userResponses = [];

const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotOutput = document.getElementById('chatbot-output');
const chatbotQuestion = document.getElementById('chatbot-question');

chatbotSend.addEventListener('click', () => {
    const userResponse = chatbotInput.value.trim();
    if (userResponse) {
        userResponses.push(userResponse);
        chatbotInput.value = '';
        if (currentQuestionIndex < chatbotQuestions.length) {
            chatbotQuestion.textContent = chatbotQuestions[currentQuestionIndex];
            currentQuestionIndex++;
        } else {
            const assessment = assessMentalHealth(userResponses);
            chatbotOutput.innerHTML = `<p>${assessment}</p>`;
        }
    }
});

function assessMentalHealth(userResponses) {
    // Simple assessment based on user responses
    const positiveKeywords = ['good', 'great', 'happy', 'relaxed'];
    const negativeKeywords = ['bad', 'sad', 'stressed', 'anxious'];
    let positiveCount = 0;
    let negativeCount = 0;

    userResponses.forEach((response) => {
        positiveKeywords.forEach((keyword) => {
            if (response.includes(keyword)) {
                positiveCount++;
            }
        });
        negativeKeywords.forEach((keyword) => {
            if (response.includes(keyword)) {
                negativeCount++;
            }
        });
    });

    if (positiveCount > negativeCount) {
        return 'You seem to be feeling positive and motivated. Keep up the good work!';
    } else if (negativeCount > positiveCount) {
        return 'You seem to be feeling negative and overwhelmed. Consider reaching out to a mental health professional for support.';
    } else {
        return 'You seem to be feeling neutral. Take some time to reflect on your thoughts and emotions.';
    }
}

// Meditation Functions
let meditationInterval;
let meditationDuration = 1800; // Default meditation duration in seconds (30 minutes)
let timerInterval;
let timerSeconds = 0;

function startMeditation() {
    const selectedMusic = document.getElementById('musicSelect').value;
    document.getElementById('meditationMusic').src = selectedMusic;
    document.getElementById('meditationMusic').play();
    meditationInterval = setInterval(() => {
        const currentTime = document.getElementById('meditationMusic').currentTime;
        if (currentTime >= meditationDuration) {
            stopMeditation();
        }
    }, 1000);
    timerInterval = setInterval(() => {
        timerSeconds++;
        const minutes = Math.floor(timerSeconds / 60);
        const seconds = timerSeconds % 60;
        document.getElementById('timerDisplay').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

function stopMeditation() {
    clearInterval(meditationInterval);
    clearInterval(timerInterval);
    document.getElementById('meditationMusic').pause();
    document.getElementById('meditationMusic').currentTime = 0;
    timerSeconds = 0;
    document.getElementById('timerDisplay').textContent = '00:00';
}

// Nutrition Goal Tracking
let nutritionGoal = 0;

function setNutritionGoal() {
    nutritionGoal = parseInt(document.getElementById('calorieInput').value);
    if (isNaN(nutritionGoal) || nutritionGoal <= 0) {
        alert("Please enter a valid calorie intake goal.");
        return;
    }
    document.getElementById('nutritionGoalStatus').textContent = `Daily nutrition goal set to ${nutritionGoal} calories.`;
}

// Mood Tracker
function setMood() {
    const mood = document.getElementById('mood').value;
    document.getElementById('moodStatusDisplay').textContent = `You are feeling ${mood} today.`;
}

// Progress Dashboard - Charts
let progressPieChart;
let progressLineChart;

function loadCharts() {
    // Pie Chart for Progress Overview
    const pieCtx = document.getElementById('progressPieChart').getContext('2d');
    progressPieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Completed Reps', 'Remaining Reps'],
            datasets: [{
                data: [repsCompleted, dailyGoal - repsCompleted],
                backgroundColor: ['#007bff', '#ccc'],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: 'black', // Updated dynamically for dark mode
                    },
                },
            },
        },
    });

    // Line Chart for Weekly Progress
    const lineCtx = document.getElementById('progressLineChart').getContext('2d');
    progressLineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Reps Completed',
                data: [12, 19, 3, 5, 2, 3, 9],
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'black', // Updated dynamically for dark mode
                    },
                },
            },
            scales: {
                y: {
                    ticks: {
                        color: 'black',
                    },
                    grid: {
                        color: '#eee',
                    },
                },
                x: {
                    ticks: {
                        color: 'black',
                    },
                    grid: {
                        color: '#eee',
                    },
                },
            },
        },
    });
}

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadCharts();
});
