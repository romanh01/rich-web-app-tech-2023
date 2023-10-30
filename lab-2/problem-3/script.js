function searchUser() {
    const username = document.getElementById('username').value;

    fetch(`https://api.github.com/users/${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('avatar').src = data.avatar_url;
            document.getElementById('name').textContent = data.name || 'N/A';
            document.getElementById('username-info').textContent = data.login;
            document.getElementById('email').textContent = data.email || 'N/A';
            document.getElementById('location').textContent = data.location || 'N/A';
            document.getElementById('gists').textContent = data.public_gists;
        })
        .catch(error => {
            console.error('Error:', error);
        });

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => response.json())
        .then(data => {
            const reposList = document.getElementById('repos-list');
            reposList.innerHTML = '';

            data.slice(0, 6).forEach(repo => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <p><strong>Name:</strong> ${repo.name}</p>
                    <p><strong>Description:</strong> ${repo.description || 'N/A'}</p>
                `;
                reposList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });
}