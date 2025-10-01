const dropdowns = document.querySelectorAll('.dropdown');
const dropBtns = document.querySelectorAll('.dropbtn');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const nav = document.querySelector('nav');
const overlay = document.querySelector('.overlay');


dropBtns.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        const dropdownContent = dropdowns[index].querySelector('.dropdown-content');
        
        document.querySelectorAll('.dropdown-content').forEach((content) => {
            if (content !== dropdownContent) {
                content.classList.remove('show');
            }
        });
        document.querySelectorAll('.dropbtn').forEach((button) => {
            if(button !== btn) {
                button.classList.remove('active');
            }
        })


        dropdownContent.classList.toggle('show');
        btn.classList.toggle('active');
    });
});


window.onclick = function(event) {
  if (!event.target.matches('.dropbtn') && !event.target.matches('.dropbtn img')) {
    const dropdownsContent = document.querySelectorAll(".dropdown-content");
    dropdownsContent.forEach(content => {
        if (content.classList.contains('show')) {
            content.classList.remove('show');
        }
    });
    dropBtns.forEach(btn => {
        btn.classList.remove('active');
    })
  }
}


menuIcon.addEventListener('click', () => {
    nav.classList.add('active');
    closeIcon.classList.add('active');
    overlay.style.display = 'block';
    menuIcon.style.display = 'none';
});

closeIcon.addEventListener('click', () => {
    nav.classList.remove('active');
    closeIcon.classList.remove('active');
    overlay.style.display = 'none';
    menuIcon.style.display = 'block';
});

overlay.addEventListener('click', () => {
    nav.classList.remove('active');
    closeIcon.classList.remove('active');
    overlay.style.display = 'none';
    menuIcon.style.display = 'block';
});



