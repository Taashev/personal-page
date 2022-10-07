const theme = document.querySelector('.theme');

theme.addEventListener('click', () => {
	const root = document.documentElement;

	if (root.id === 'dark') {
		return root.id = 'light';
	}

	root.id = 'dark';
});
