async function lockedProfile() {
    const baseUrl = 'http://localhost:3030/jsonstore/advanced/profiles';

    const main = document.getElementById('main');

    await load();

    const buttons = document.querySelectorAll('button');

    for (const btn of buttons) {
        btn.addEventListener('click', function() {
            const hiddenDiv = btn.parentElement.querySelector('div');
            const radioValue = btn.parentElement.querySelector('input[type="radio"]').checked;

            if (!radioValue){
                if (btn.textContent == 'Show more'){
                    hiddenDiv.style.display = 'block';
                    btn.textContent = 'Hide it';
                } else {
                    hiddenDiv.style.display = 'none';
                    btn.textContent = 'Show more';
                }
            }
            
        });
    }

    async function load(){
        main.innerHTML = '';

        const response = await fetch(baseUrl);
        const allProfiles = await response.json();

        for (const [profileId, profileObj] of Object.entries(allProfiles)) {
            let div = document.createElement('div');
            div.classList.add('profile');

            div.innerHTML = `
            <img src="./iconProfile2.png" class="userIcon" />
				<label>Lock</label>
				<input type="radio" name="user1Locked" value="lock" checked>
				<label>Unlock</label>
				<input type="radio" name="user1Locked" value="unlock"><br>
				<hr>
				<label>Username</label>
				<input type="text" name="user1Username" value="${profileObj.username}" disabled readonly />
				<div class="user1Username">
					<hr>
					<label>Email:</label>
					<input type="email" name="user1Email" value="${profileObj.email}" disabled readonly />
					<label>Age:</label>
					<input type="text" name="user1Age" value="${profileObj.age}" disabled readonly />
				</div>
				
				<button>Show more</button>
            `;

            main.appendChild(div);
        }
    }
}