console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');
const sign_up = document.getElementById('sign-up');
const sign_in = document.getElementById('sign-in');

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});


sign_up.addEventListener('click',  function() {
	const nom = document.getElementById('nom');
	const prenom = document.getElementById('prenom');
	// const address = document.getElementById('address');
	// const age = document.getElementById('age');
	// const genre = document.getElementById('genre');
	const email = document.getElementById('email');
	const password = document.getElementById('password');

	console.log(nom);


});


sign_in.addEventListener('click',  function() {
	

});
