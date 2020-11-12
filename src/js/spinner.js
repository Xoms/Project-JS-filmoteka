document.body.onload = function() {
    document.querySelector('header').removeAttribute('hidden');
    setTimeout(function() {
        let preloader = document.getElementById('myPreloader');
        if (!preloader.classList.contains('cansel')) {
            preloader.classList.add('cansel');
        }
    }, 600)
};