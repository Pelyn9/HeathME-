const tasksData = {
    happy: ["Smile at a stranger", "Write in a gratitude journal", "Take a 10-minute walk", "Meditate for 5 minutes", "Dance to your favorite song"],
    sad: ["Write down your thoughts", "Talk to a friend", "Watch a motivational video", "Do a breathing exercise", "Go for a walk outside"],
    anxious: ["Do a grounding exercise", "Write 3 things you're grateful for", "Do yoga for 15 minutes", "Listen to calming music", "Talk to someone you trust"],
    angry: ["Take deep breaths", "Count to 10 slowly", "Go for a run", "Listen to calming music", "Journaling your feelings"],
    depressed: ["Reach out to a counselor", "Write about your emotions", "Take a short walk", "Declutter your space", "Try a new hobby"],
    stressed: ["Do a 5-minute meditation", "Prioritize your tasks", "Take a break", "Drink water", "Spend time with a loved one"]
};

const tasksSection = document.querySelector(".tasks-section");
const emotionBoxes = document.querySelectorAll(".emotion-box");

// Stress & Energy Tracker Logic
function updateStressAdvice() {
    const stressLevel = document.getElementById("stress-level").value;
    document.getElementById("stress-value").textContent = stressLevel;

    let advice;
    if (stressLevel <= 3) {
        advice = "You're doing great! Keep it up.";
    } else if (stressLevel <= 6) {
        advice = "Consider taking a short break or doing a calming activity.";
    } else {
        advice = "Try relaxation techniques like deep breathing or meditation.";
    }

    document.getElementById("stress-advice").textContent = `Stress Advice: ${advice}`;
}

function updateEnergyAdvice() {
    const energyLevel = document.getElementById("energy-level").value;
    document.getElementById("energy-value").textContent = energyLevel;

    let advice;
    if (energyLevel >= 7) {
        advice = "You're full of energy! Channel it into productive activities.";
    } else if (energyLevel >= 4) {
        advice = "Maintain your energy with a healthy snack or some exercise.";
    } else {
        advice = "Consider resting or doing light activities to recharge.";
    }

    document.getElementById("energy-advice").textContent = `Energy Advice: ${advice}`;
}

// Initialize stress and energy advice on page load
document.addEventListener("DOMContentLoaded", () => {
    updateStressAdvice();
    updateEnergyAdvice();
});

// Add Click Event Listeners to Emotion Boxes
emotionBoxes.forEach((box) => {
    box.addEventListener("click", () => {
        const emotion = box.dataset.emotion;
        tasksSection.innerHTML = ""; // Clear previous tasks

        // Create Tasks Container
        const tasksContainer = document.createElement("div");
        tasksContainer.classList.add("tasks-container");

        const progressCircleContainer = document.createElement("div");
        progressCircleContainer.classList.add("progress-circle-container");
        progressCircleContainer.innerHTML = `
            <div class="progress-circle-background"></div>
            <div class="progress-circle"></div>
            <div class="progress-circle-text">0%</div>
        `;
        tasksContainer.appendChild(progressCircleContainer);

        tasksData[emotion].forEach((task, index) => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("task-item");
            taskItem.innerHTML = `${task} <input type="checkbox" data-task-id="${index}" />`;
            tasksContainer.appendChild(taskItem);
        });

        tasksSection.appendChild(tasksContainer);

        // Initialize progress circle to 0%
        updateProgressCircle();

        let tasksCompleted = false; // Flag to track if all tasks are completed

        const taskCheckboxes = tasksContainer.querySelectorAll("input[type='checkbox']");

        taskCheckboxes.forEach(checkbox => {
            checkbox.addEventListener("change", function () {
                const completedTasks = Array.from(taskCheckboxes).filter(cb => cb.checked).length;
                if (completedTasks === taskCheckboxes.length) {
                    tasksCompleted = true;
                    showSatisfactionQuestion(); // Show question when all tasks are checked
                } else {
                    tasksCompleted = false;
                    hideSatisfactionQuestion(); // Hide question when tasks aren't 100% complete
                }
                updateProgressCircle(); // Update progress circle on task completion
            });
        });

        // Function to update progress circle
        function updateProgressCircle() {
            const tasks = document.querySelectorAll(".tasks-container input[type='checkbox']");
            const totalTasks = tasks.length;
            const completedTasks = Array.from(tasks).filter(task => task.checked).length;

            const progress = (completedTasks / totalTasks) * 100;

            const circle = document.querySelector(".progress-circle");
            const progressText = document.querySelector(".progress-circle-text");

            // Update the circular progress
            circle.style.background = `conic-gradient(#4caf50 ${progress}%, #d9d9d9 ${progress}%)`;
            progressText.innerHTML = `${Math.round(progress)}%`;
        }

        // Function to show the satisfaction question
        function showSatisfactionQuestion() {
            const satisfactionQuestionContainer = document.querySelector('.satisfaction-question-container');
            satisfactionQuestionContainer.style.display = 'flex';
        }

        // Function to hide the satisfaction question
        function hideSatisfactionQuestion() {
            const satisfactionQuestionContainer = document.querySelector('.satisfaction-question-container');
            satisfactionQuestionContainer.style.display = 'none';
        }

        // Handle satisfaction responses
        const yesButton = document.getElementById('yes-btn');
        const noButton = document.getElementById('no-btn');
        const satisfactionResponseElement = document.getElementById('satisfaction-response');
        const satisfactionQuestionContainer = document.querySelector('.satisfaction-question-container');

        yesButton.addEventListener('click', function () {
            satisfactionResponseElement.textContent = 'We are glad you are satisfied!';
            hideSatisfactionQuestion();
        });

        noButton.addEventListener('click', function () {
            satisfactionResponseElement.textContent = 'Sorry to hear that. Let us know how we can improve!';
            hideSatisfactionQuestion();
        });
    });
});