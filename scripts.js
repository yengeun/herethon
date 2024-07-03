function toggleMenu() {
    var sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
}

function filterCategory(category) {
    var items = document.querySelectorAll('.goal-card');
    var buttons = document.querySelectorAll('.category-buttons button');

    buttons.forEach(function(button) {
        button.classList.remove('active');
        if (button.getAttribute('onclick').includes(category)) {
            button.classList.add('active');
        }
    });

    items.forEach(function(item) {
        if (category === 'all' || item.getAttribute('data-category').toLowerCase() === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Example user profiles and their respective goals
    const userProfiles = [
        {
            username: "말하는 감자",
            email: "user1@example.com",
            goals: [
                {
                    title: "주 3회 요가",
                    details: ["일주일에", "3회", "1회당 1시간 30분 소요"],
                    type: "운동",
                    image: "asset/woman-2573216_1280 1.svg",
                }
            ]
        },
        {
            username: "꿀고구마",
            email: "user2@example.com",
            goals: [
                {
                    title: "삼시세끼 알맞게 챙겨먹기",
                    details: ["하루에", "3회", "아침: 오전 7시", "점심: 오후 12시", "저녁: 오후 6시", "1700kcal 전후로 너무 적거나 많지 않게 식사"],
                    type: "식단",
                    image: "asset/image 4.svg",
                }
            ]
        }
    ];

    function createGoalCard(goal, username) {
        const goalCard = document.createElement('div');
        goalCard.classList.add('goal-card');
        goalCard.setAttribute('data-category', goal.type.toLowerCase());

        const goalHeader = document.createElement('div');
        goalHeader.classList.add('goal-header');
        
        const logoBackground = document.createElement('div');
        logoBackground.classList.add('logo-background');
        
        const goalIcon = document.createElement('img');
        goalIcon.src = "asset/Logo2 1.svg";
        goalIcon.alt = "Goal Icon";
        logoBackground.appendChild(goalIcon);
        goalHeader.appendChild(logoBackground);

        const goalNickname = document.createElement('div');
        goalNickname.classList.add('goal-nickname');
        goalNickname.innerText = username;
        goalHeader.appendChild(goalNickname);

        const goalTitle = document.createElement('div');
        goalTitle.classList.add('goal-title');
        goalTitle.innerText = goal.title;
        goalHeader.appendChild(goalTitle);

        const goalType = document.createElement('div');
        goalType.classList.add('goal-type');
        goalType.innerText = goal.type;
        goalHeader.appendChild(goalType);

        const cartIcon = document.createElement('div');
        cartIcon.classList.add('cart-icon');
        cartIcon.innerHTML = '<img src="asset/Basket_alt_3.svg" alt="Cart Icon">';
        goalHeader.appendChild(cartIcon);

        goalCard.appendChild(goalHeader);

        const goalInfo = document.createElement('div');
        goalInfo.classList.add('goal-info');

        const goalImage = document.createElement('img');
        goalImage.src = goal.image;
        goalImage.alt = `${goal.title} Image`;
        goalInfo.appendChild(goalImage);

        const goalDetails = document.createElement('div');
        goalDetails.classList.add('goal-details');
        
        // Create the first line with 0th and 1st index items
        const firstLine = document.createElement('div');
        firstLine.classList.add('first-line');
        const item0 = document.createElement('span');
        item0.classList.add('highlight');
        item0.innerText = goal.details[0];
        const item1 = document.createElement('span');
        item1.innerText = goal.details[1];
        firstLine.appendChild(item0);
        firstLine.appendChild(item1);
        goalDetails.appendChild(firstLine);

        // Create the second line with the rest of the items
        const secondLine = document.createElement('div');
        secondLine.classList.add('second-line');
        for (let i = 2; i < goal.details.length; i++) {
            const p = document.createElement('p');
            p.innerText = goal.details[i];
            secondLine.appendChild(p);
        }
        goalDetails.appendChild(secondLine);

        goalInfo.appendChild(goalDetails);
        goalCard.appendChild(goalInfo);

        const hr = document.createElement('hr');
        goalCard.appendChild(hr);

        const goalActions = document.createElement('div');
        goalActions.classList.add('goal-actions');

        const reviewBtn = document.createElement('button');
        reviewBtn.innerText = '리뷰 확인하기';
        reviewBtn.onclick = function() {
            window.location.href = 'review.html';
        };

        const qaBtn = document.createElement('button');
        qaBtn.innerText = 'Q&A';
        qaBtn.onclick = function() {
            window.location.href = `q&a.html?goal=${encodeURIComponent(goal.title)}`;
        };

        goalActions.appendChild(reviewBtn);
        goalActions.appendChild(qaBtn);

        goalCard.appendChild(goalActions);

        return goalCard;
    }

    const goalsContainer = document.getElementById('goals-container');
    userProfiles.forEach(user => {
        user.goals.forEach(goal => {
            const goalCard = createGoalCard(goal, user.username);
            goalsContainer.appendChild(goalCard);
        });
    });

    const toggleBtn = document.getElementById('toggle-btn');
    toggleBtn.addEventListener('click', toggleMenu);
    filterCategory('all'); // Show all items initially

    // If on Q&A page, populate goal summary
    const goalSummary = document.getElementById('goal-summary');
    const urlParams = new URLSearchParams(window.location.search);
    const goalTitle = urlParams.get('goal');
    if (goalSummary && goalTitle) {
        userProfiles.forEach(user => {
            const goal = user.goals.find(g => g.title === goalTitle);
            if (goal) {
                const summaryDiv = document.createElement('div');
                summaryDiv.classList.add('goal-summary');
                
                const summaryTitle = document.createElement('div');
                summaryTitle.classList.add('goal-title');
                summaryTitle.innerText = goal.title;
                summaryDiv.appendChild(summaryTitle);
                
                const summaryDetails = document.createElement('div');
                summaryDetails.classList.add('goal-details');
                
                // Create the first line with 0th and 1st index items
                const firstLine = document.createElement('div');
                firstLine.classList.add('first-line');
                const item0 = document.createElement('span');
                item0.classList.add('highlight');
                item0.innerText = goal.details[0];
                const item1 = document.createElement('span');
                item1.innerText = goal.details[1];
                firstLine.appendChild(item0);
                firstLine.appendChild(item1);
                summaryDetails.appendChild(firstLine);

                // Create the second line with the rest of the items
                const secondLine = document.createElement('div');
                secondLine.classList.add('second-line');
                for (let i = 2; i < goal.details.length; i++) {
                    const p = document.createElement('p');
                    p.innerText = goal.details[i];
                    secondLine.appendChild(p);
                }
                summaryDetails.appendChild(secondLine);

                summaryDiv.appendChild(summaryDetails);
                goalSummary.appendChild(summaryDiv);
            }
        });
    }
});

function submitQuestion() {
    const qaInput = document.getElementById('qa-input');
    const qaContainer = document.getElementById('qa-container');
    const userProfile = {
        username: "말하는 감자",
        email: "user@example.com",
    };

    if (qaInput.value.trim() !== '') {
        const newQuestion = document.createElement('div');
        newQuestion.classList.add('qa-item');
        
        const questionText = document.createElement('div');
        questionText.classList.add('qa-question');
        questionText.innerHTML = `<img src="asset/Reply.svg" alt="Reply Icon"><span>${userProfile.username}</span>${qaInput.value}`;
        
        newQuestion.appendChild(questionText);
        newQuestion.style.borderBottom = '1px solid #e0e0e0';
        qaContainer.appendChild(newQuestion);
        
        qaInput.value = '';
    }
}
