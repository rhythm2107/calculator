document.addEventListener('DOMContentLoaded', (event) => {
    const themes = document.querySelectorAll('.theme');

    themes.forEach(theme => {
        theme.addEventListener('click', function() {
            // Remove 'active' class from all themes
            themes.forEach(t => t.classList.remove('active'));
            
            // Add 'active' class to the clicked theme
            this.classList.add('active');
            
            // Change CSS properties based on the selected theme
            if (this.classList.contains('t1')) {
                document.documentElement.style.setProperty('--bg-solid', '#f68084');
                document.documentElement.style.setProperty('--gradient', 'linear-gradient(120deg, #a6c0fe 0%, #f68084 100%)');
                document.documentElement.style.setProperty('--highlight', '#a6c0fe');
            } else if (this.classList.contains('t2')) {
                document.documentElement.style.setProperty('--bg-solid', '#114357');
                document.documentElement.style.setProperty('--gradient', 'linear-gradient(to right, #F29492, #114357)');
                document.documentElement.style.setProperty('--highlight', '#F29492');
            } else if (this.classList.contains('t3')) {
                document.documentElement.style.setProperty('--bg-solid', '#f79d00');
                document.documentElement.style.setProperty('--gradient', 'linear-gradient(to right, #64f38c, #f79d00)');
                document.documentElement.style.setProperty('--highlight', '#64f38c');
            }
        });
    });
});