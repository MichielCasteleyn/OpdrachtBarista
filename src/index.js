import './style.css';
import data from './assets/data/coffees.json';

{
  const init = () => {
    getData(data);
  };

  const getData = data => {
    const coffees = data.coffees;
    coffees.forEach(coffee => {

      if (coffee.plantbased === true) {
        makeItem(coffee);
      }
    });
  };

  const makeItem = coffee => {
    const $list = document.querySelector(`.prices__list`);

    const $li = document.createElement(`li`);
    $li.classList.add(`price`);
    $li.setAttribute(`data_id`, `${coffee.id}`);
    $li.innerHTML = `
      <a class="price__button">
        <span class="price__button__wrapper">
          <span class="price__button__name">${coffee.name}</span>
          <span class="price__button__amount">&euro; ${round(coffee.prices.medium)}</span>
        </span>
        <span class="price__button__plus">+</span>
      </a>`;
    $list.appendChild($li);
  };

  const round = num => {
    return num.toFixed(2);
  };

  init();
}
