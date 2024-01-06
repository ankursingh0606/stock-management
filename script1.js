// store data in local storage
// show data on screen

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('my-form');
    let stockData = [];
    form.addEventListener('submit', saveToLocalStorage);
    function saveToLocalStorage(e) {
        e.preventDefault();
        const candyName = e.target.candyName.value;
        const description = e.target.description.value;
        const quantity = e.target.quantity.value;
        const price = e.target.price.value;
        const obj = {
            candyName,
            description,
            quantity,
            price
        };
        stockData.push(obj);
        localStorage.setItem('stockData', JSON.stringify(stockData));
        showOnScreen(obj);
    }
    function loadFromLocalStorage() {
        const storedData = JSON.parse(localStorage.getItem('stockData')) || [];
        stockData = storedData;
        stockData.forEach(obj => showOnScreen(obj));
    }
    function showOnScreen(obj) {
        const parElmnt = document.getElementById('stock');
        const childElnt = document.createElement('li');
        childElnt.textContent = obj.candyName + ' - ' + obj.description + ' - ' + obj.price + ' - ' + obj.quantity + ' ';
        const buy1Btn = createBuyButton(obj, 1);
        const buy2Btn = createBuyButton(obj, 2);
        const buy3Btn = createBuyButton(obj, 3);
        childElnt.appendChild(buy1Btn);
        childElnt.appendChild(buy2Btn);
        childElnt.appendChild(buy3Btn);
        parElmnt.appendChild(childElnt);
    }
    function createBuyButton(obj, quantityToSubtract) {
        const buyBtn = document.createElement('button');
        buyBtn.textContent = 'Buy ' + quantityToSubtract;
        buyBtn.addEventListener('click', function () {
            quantity(obj, quantityToSubtract);
        });
        function quantity(obj, quantityToSubtract) {
            if (obj.quantity >= quantityToSubtract) {
                obj.quantity -= quantityToSubtract;
                updateQuantityOnScreen(obj);
                localStorage.setItem('stockData', JSON.stringify(stockData));
            } else {
                alert(`${obj.candyName} not available`);
            }
        }
        return buyBtn;
    }
    function updateQuantityOnScreen(obj) {
        for (let i = 0; i < parElmnt.children.length; i++) {
            const child = parElmnt.children[i];
            if (child.textContent.includes(obj.candyName)) {
                child.textContent = obj.candyName + ' - ' + obj.description + ' - ' + obj.price + ' - ' + obj.quantity;
                break;
            }
        }
    }
    loadFromLocalStorage();
});