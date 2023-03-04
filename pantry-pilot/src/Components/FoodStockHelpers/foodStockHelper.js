import axios from 'axios';

export function populateFoodStock(_foodStock, pantry, setPantry) {
    axios.post('http://127.0.0.1:4000/foodStock/create-foodStock', _foodStock).then((res) => {
        if (res.status === 200){
            console.log(res.data);
            console.log(res.data._id);
            setPantry([res.data]);
        }
        else
            Promise.reject()
    }).catch(err => alert('Something went wrong'))
}

export function clearFoodStock(pantry, setPantry) {
    setPantry([]);
    for (let i = 0; i < pantry.length; i++) {
        // console.log(fridge[i])
        axios
            .delete("http://localhost:4000/foodStock/delete-foodStock/" + pantry[0]._id)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Fridge successfully deleted");
                    // window.location.reload();
                } else Promise.reject();
            })
            .catch((err) => alert("Something went wrong"));
    }
}

export function updateFoodStockCategory(categoryName, foodNames, pantry, setPantry) {
    axios
        .put("http://localhost:4000/foodStock/update-foodStock/" + pantry[0]._id, {
            categories:{
                categoryName: categoryName,
                foodNames: foodNames,
            }
        })
        .then((res) => {
            if (res.status === 200) {
                console.log("Food successfully updated");
                console.log(res.data);
                // window.location.reload();
            } else Promise.reject();
        })
        .catch((err) => alert("Something went wrong"));
}