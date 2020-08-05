let month = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Октябрь', 'Сентябрь', 'Ноябрь', 'Декабрь'],
    calendar = document.querySelectorAll('.calendar__item'),
    monthSelected = 2;

let arrayMonthLeft = document.querySelector('.calendar__btn--left'),
    arrayMonthRight = document.querySelector('.calendar__btn--right');

arrayMonthLeft.onclick = () => {
    if (monthSelected - 1 < 0) {
        monthSelected = 11
        showMonth();
        changeTitle();
    } else {
        monthSelected--
        showMonth();
        changeTitle();
    }
}

arrayMonthRight.onclick = () => {
    if (monthSelected + 1 > 11) {
        monthSelected = 0;
        showMonth();
        changeTitle();
    } else {
        monthSelected++
        showMonth();
        changeTitle();
    }
}

function showMonth() {
    calendar.forEach(calendarMonth => {
        let monthNow = document.querySelector('.calendar__now');
        monthSelected === 2 ? monthNow.style.display = 'block' : monthNow.style.display = 'none';

        if (calendarMonth.dataset.month === month[monthSelected]) {
            calendarMonth.classList.add('active');
        } else {
            calendarMonth.classList.remove('active');
        }
    })
}
showMonth()

function changeTitle() {
    let calendarTitle = document.querySelector('.calendar__header-title');
    calendarTitle.innerHTML = month[monthSelected] + ' 2013';
}

let days = document.querySelectorAll('.calendar__day-content');

days.forEach(day => {
    day.addEventListener('click', () => {
        days.forEach(day => {
            day.closest('.calendar__day').classList.remove('addEvent');
            
            if (day.closest('.calendar__day').querySelector('.modal')) {
                eventDestroy(day);
            }
        })
        
        day.closest('.calendar__day').classList.add('addEvent');
        
        if ( !(day.closest('.calendar__day').querySelector('.modal')) ) {
            addEvent(day);
        } 
    })
})

function addEvent(day) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin', `
        <div class="modal__close">&#10006;</div>
        <input class="modal__input modal__event" type="text" placeholder="Событие">
        <input class="modal__input" type="text" placeholder="День, месяц, год">
        <input class="modal__input modal__member" type="text" placeholder="Имена участников">
        <textarea class="modal__message" placeholder="Описание"></textarea>
        <div class=""modal__btns>
            <button class="modal__btn modal__btn--create">Готово</button>
            <button class="modal__btn modal__btn--delete">Удалить</button>
        </div>
    `)
    day.closest('.calendar__day').appendChild(modal);

    let modalClose = document.querySelector('.modal__close'),
        modalDelete = document.querySelector('.modal__btn--delete'),
        eventСreate = document.querySelector('.modal__btn--create');

    modal.onclick = e => {
        if (e.target === modalClose || e.target === modalDelete) {
            eventDestroy(day);
        } else if (e.target === eventСreate) {
            saveEvent(day);
        }
    }
}

function eventDestroy(day) {
    let modal = day.closest('.calendar__day').querySelector('.modal');

    day.closest('.calendar__day').removeChild(modal);
    day.closest('.calendar__day').classList.remove('addEvent');
}

function saveEvent(day) {
    let eventNameValue = day.closest('.calendar__day').querySelector('.modal__event').value,
        eventMemberValue = day.closest('.calendar__day').querySelector('.modal__member').value;

    const eventName = document.createElement('div');
    eventName.classList.add('calendar__day-event-name');
    day.appendChild(eventName);

    const eventMember = document.createElement('div');
    eventMember.classList.add('calendar__day-event-member');
    day.appendChild(eventMember);

    eventName.innerHTML = eventNameValue;
    eventMember.innerHTML = eventMemberValue;

    eventDestroy(day);
    day.closest('.calendar__day').classList.add('event');
}