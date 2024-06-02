document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('datePicker');
    const selectedDateElement = document.getElementById('selectedDate');
    const birthdaysList = document.getElementById('birthdaysList');
    const favoritesList = document.getElementById('favoritesList');

    datePicker.addEventListener('change', async (event) => {
        const selectedDate = new Date(event.target.value);
        const formattedDate = `${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`;
        selectedDateElement.textContent = selectedDate.toLocaleDateString();

        try {
            const response = await fetch(`https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/births/${formattedDate}`);
            const data = await response.json();
            displayBirthdays(data.births);
        } catch (error) {
            console.error('Error fetching birthdays:', error);
        }
    });

    const displayBirthdays = (birthdays) => {
        birthdaysList.innerHTML = '';
        birthdays.forEach(birthday => {
            const listItem = document.createElement('li');
            listItem.textContent = birthday.text;
            const addButton = document.createElement('button');
            addButton.textContent = 'Add to Favorites';
            addButton.addEventListener('click', () => addFavorite(birthday));
            listItem.appendChild(addButton);
            birthdaysList.appendChild(listItem);
        });
    };

    const addFavorite = (birthday) => {
        const listItem = document.createElement('li');
        listItem.textContent = birthday.text;
        favoritesList.appendChild(listItem);
    };
});
