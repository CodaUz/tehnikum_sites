$('.slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    adaptiveHeight: true,
    arrows: true
});

// $('.feed-cards').slick({
//     dots: true,
//     infinite: true,
//     speed: 300,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     adaptiveHeight: true
// });



document.querySelectorAll('.scrollItem').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();

        let href = this.getAttribute('href').substring(1);

        const scrollTarget = document.getElementById("popUp");

        const topOffset = document.querySelector('.buttons').offsetHeight;
        // const topOffset = 0; // если не нужен отступ сверху 
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});
	

// let scrollLinks = document.querySelectorAll('.scrollItem[data-goto')

// console.log(scrollLinks)

// if (scrollLinks.length > 0) {
//     scrollLinks.forEach(scrollItem => {
//         scrollItem.addEventListener('click', linkClick)
//     })

//     function linkClick(e) {
//         let scrollItem = e.target;
//         if (scrollItem.dataset.goto && document.querySelectorAll("scrollItem.dataset.goto")) {
//             let gotoBlock = document.querySelectorAll("scrollItem.dataset.goto")
//             let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageXOffset

//             window.scrollTo({
//                 top: gotoBlockValue,
//                 behavior: 'smooth'
//             })
//             e.parentDefault();
//         }   
// }
// }