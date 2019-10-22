import './style.css';
import data from './assets/data/coffees.json';

{
  const init = () => {
    getData(data);

    const $items = document.querySelectorAll(`.price`);
    $items.forEach(function($item) {
      $item.addEventListener(`click`, e => {
        addOrder(e.composedPath()[2]);
      });
    });
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

  const addOrder = e => {
    const num = e.getAttribute('data_id');
    const name = document.querySelector(`.price:nth-child(${num}n) .price__button__name`).innerHTML;
    const price = document.querySelector(`.price:nth-child(${num}n) .price__button__amount`).innerHTML;
    const $list = document.querySelector(`.orders`);

    const $li = document.createElement(`li`);
    $li.classList.add(`order`);
    $li.innerHTML = `
      <span class="order__name">
        <span class="order__amount">1x</span> ${name}
      </span>
      <span class="order__price">${price}
        <button class="remove">
          x
        </button>
      </span>`;
    $list.appendChild($li);
  };

  init();
}
