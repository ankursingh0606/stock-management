// instead of storing data in local storage store it in crudcrud.com
// to store data on crudcrud.com: make a POST request to crudcrud.com using axios 
// check crudcrud resource and see if request was sucessful or not, whether you can see data or not
// on page reload everything is lost, to get data which have been saved on crudcrud.com: make a GET request to crudcrud.com using axios
// show data saved on crudcrud.com on screen

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('my-form');
    let StockData = [];
    form.addEventListener('submit', saveToAPI);
    async function saveToAPI(e) {
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
        try {
            const result = await axios.post("https://crudcrud.com/api/80ec394d70c644799a7395d5d6612237/StockData", obj);
            showOnScreen(obj);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }
    async function loadFromAPI() {
        try {
            const response = await axios.get("https://crudcrud.com/api/80ec394d70c644799a7395d5d6612237/StockData");
            StockData = response.data;
            StockData.forEach(obj => showOnScreen(obj));
        } catch (error) {
            console.log(error);
        }
    }
    function showOnScreen(obj) {
        const parElmnt = document.getElementById('stock');
        const childElnt = document.createElement('li');
        childElnt.textContent = obj.candyName + ' - ' + obj.description + ' - ' + obj.price + ' - ' + obj.quantity;
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
        buyBtn.addEventListener('click', quantity);
        async function quantity() {
            if (obj.quantity >= quantityToSubtract) {
                obj.quantity -= quantityToSubtract;
                updateQuantityOnScreen(obj);
                try {
                    await axios.put("https://crudcrud.com/api/80ec394d70c644799a7395d5d6612237/StockData", obj);
                } catch (error) {
                    console.log(error);
                }
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
    loadFromAPI();
});