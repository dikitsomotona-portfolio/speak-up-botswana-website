// search.js
document.addEventListener('DOMContentLoaded', () => {
    const searchIconBtn = document.querySelector('.search-btn'); // 
    const searchForm = document.getElementById('search-form');    // 
    const searchInput = document.getElementById('search-input');  /


    if (searchIconBtn && searchForm && searchInput) {
        searchIconBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // 
            searchForm.classList.toggle('visible');
            if (searchForm.classList.contains('visible')) {
                searchInput.focus(); 
            }
        });

       
        document.addEventListener('click', (event) => {
            if (searchForm.classList.contains('visible') && 
                !searchForm.contains(event.target) && 
                !searchIconBtn.contains(event.target)) {
                searchForm.classList.remove('visible');
            }
        });

    } else {
        if (!searchIconBtn) console.error("Search icon button (.search-btn) not found.");
        if (!searchForm) console.error("Search form (#search-form) not found.");
        if (!searchInput && searchForm) console.error("Search input (#search-input) not found."); 

  
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const query = searchInput.value.trim();
            if (query) {
         
                window.location.href = `search.html?query=${encodeURIComponent(query)}`;
            } else {
                searchInput.focus(); 
        });
    }
});