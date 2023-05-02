import axios from 'axios';

export function updateRecipe(newCookbook: any, cookbook: any, setCookbook: any): void {
    console.log(newCookbook);
    axios
        .put("http://localhost:4000/cookbook/update-cookbook/" + cookbook[0]._id, newCookbook)
        .then((res) => {
            if (res.status === 200) {
                // console.log("Food successfully updated");
                setCookbook([res.data]);
            } else Promise.reject();
        })
        .catch((err) => alert("Something went wrong"));
}

export function addRecipe(newRecipie: any): void {
    console.log(newRecipie);
    axios
        .post("http://localhost:4000/cookbook/create-cookbook", newRecipie)
        .then((res) => {
            if (res.status === 200) {
                console.log("Food successfully added");
                console.log(res.data);
            } else Promise.reject();
        })
        .catch((err) => alert("Something went wrong"));
}