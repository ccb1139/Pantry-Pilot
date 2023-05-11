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

export function addRecipe(newRecipie: any): string {
    // console.log(newRecipie);
    let _id = "";
    axios
        .post("http://localhost:4000/cookbook/create-cookbook", newRecipie)
        .then((res) => {
            if (res.status === 200) {
                console.log("Food successfully added");
                console.log(res.data);
                console.log(res.data._id);
                _id = res.data._id;
            } else Promise.reject();
        })
        .catch((err) => alert("Something went wrong"));
    return _id;
}

export function removeRecipe(_id: any) {
    console.log(_id);
    axios.delete("http://localhost:4000/cookbook/delete-cookbook/" + _id)
        .then((res) => {
            if (res.status === 200) {
                console.log("Food successfully deleted");
            } else Promise.reject();
        }
        )
        .catch((err) => alert("Something went wrong"));
}


export async function getRecipe(spoonId: any): Promise<any> {
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:4000/cookbook/get-cookbook-by-spoonID/" + spoonId)
            .then((res) => {
                if (res.status === 200) {
                    resolve(res.data);
                } else {
                    resolve("No recipe found");
                }
            })
            .catch((err) => resolve("No recipe found"));
    });
}

export function getCookbook(setCookbook: any): any {
    axios.get('http://localhost:4000/cookbook').then(({ data }) => {
        setCookbook(data);
        // console.log(data);
        // console.log(data);
    })
        .catch((error) => {
            console.log(error);
        });
}

export function createLastSearch(newSearch: any) {
    axios
        .post("http://localhost:4000/lastSearch/create-last-search", newSearch)
        .then((res) => {
            if (res.status === 200) {
                console.log("Last search successfully added");
            } else Promise.reject();
        })
        .catch((err) => alert("Something went wrong"));
}

export function getLastSearch(setLastSearch: any) {
    axios.get('http://localhost:4000/lastSearch').then(({ data }) => {
        setLastSearch(data);
        // console.log(data);
    })
        .catch((error) => {
            console.log(error);
        });
}

export function clearAllLastSearches() {
    axios.delete("http://localhost:4000/lastSearch/delete-all-last-searches")
        .then((res) => {
            if (res.status === 200) {
                console.log("All last searches successfully deleted");
            } else Promise.reject();
        }
        )
        .catch((err) => alert("Something went wrong"));
}

export function clearAndFillLastSearches(newSearch: any) {
    axios.delete("http://localhost:4000/lastSearch/delete-all-last-searches")
        .then((res) => {
            if (res.status === 200) {
                console.log("All last searches successfully deleted");
                axios
                    .post("http://localhost:4000/lastSearch/create-last-search", newSearch)
                    .then((res) => {
                        if (res.status === 200) {
                            console.log("Last search successfully added");
                        } else Promise.reject();
                    })
                    .catch((err) => alert("Something went wrong"));
            } else Promise.reject();
        }
        )
        .catch((err) => alert("Something went wrong"));
}