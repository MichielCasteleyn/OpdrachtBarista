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

    const $orderItem = document.querySelector(`.order`);
    const $ordersList = document.querySelector(`.orders`).contains($orderItem);
    toggleContent($ordersList);

    const $orders = document.querySelectorAll(`.order__price`);
    total($orders);
  };

  const toggleContent = ul => {
    const $empty = document.querySelector(`.emptystate`);
    const $notEmpty = document.querySelector(`.orders__wrapper`);

    if (ul === true) {
      $empty.classList.add(`hide`);
      $notEmpty.classList.remove(`hide`);
    }
    if (ul === false) {
      $empty.classList.remove(`hide`);
      $notEmpty.classList.add(`hide`);
    }
  };

  const total = orders => {
    const $totalAmount = document.querySelector(`.total__amount`);
    let resTotaal = 0;
    orders.forEach(function(order) {
      const str = order.textContent;
      const res = parseFloat(str.substr(2, 5));

      resTotaal += res;

      console.log(resTotaal);
      $totalAmount.innerHTML = round(resTotaal);
    });
  };

  init();
}
