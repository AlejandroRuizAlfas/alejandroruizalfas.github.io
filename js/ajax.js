const SERVER = "https://api.genshin.dev";

function getTable(table) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open("GET", SERVER + "/" + table);
        peticion.send();
        peticion.addEventListener("load", () => {
            if (peticion.status === 200) {
                resolve(JSON.parse(peticion.responseText));
            } else {
                reject("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
            }
        });
        peticion.addEventListener("error", () => reject("Error en la petición HTTP"));
    });
}

function saveObject(data, table) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open("POST", SERVER + "/" + table);
        peticion.setRequestHeader("Content-type", "application/json");
        peticion.send(JSON.stringify(data));
        peticion.addEventListener("load", () => {
            if (peticion.status === 201) {
                resolve(JSON.parse(peticion.responseText));
            } else {
                reject("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
            }
        });
        peticion.addEventListener("error", () => reject("Error en la petición HTTP"));
    });
}

function delObject(id, tabla) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open("DELETE", SERVER + "/" + tabla + "/" + id);
        peticion.send();
        peticion.addEventListener("load", () => {
            if (peticion.status === 200) {
                resolve(JSON.parse(peticion.responseText));
            } else {
                reject("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
            }
        });
        peticion.addEventListener("error", () => reject("Error en la petición HTTP"));
    });
}

function modifyObject(data, table, id) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open("PUT", SERVER + "/" + table + "/" + id);
        peticion.setRequestHeader("Content-type", "application/json");
        peticion.send(JSON.stringify(data));
        peticion.addEventListener("load", () => {
            if (peticion.status === 200) {
                resolve(JSON.parse(peticion.responseText));
            } else {
                reject("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
            }
        });
        peticion.addEventListener("error", () => reject("Error en la petición HTTP"));
    });
}

function patchObject(data, table, id) {
    return new Promise((resolve, reject) => {
        const peticion = new XMLHttpRequest();
        peticion.open("PATCH", SERVER + "/" + table + "/" + id);
        peticion.setRequestHeader("Content-type", "application/json");
        peticion.send(JSON.stringify(data));
        peticion.addEventListener("load", () => {
            if (peticion.status === 200) {
                resolve(JSON.parse(peticion.responseText));
            } else {
                reject("Error " + peticion.status + " (" + peticion.statusText + ") en la petición");
            }
        });
        peticion.addEventListener("error", () => reject("Error en la petición HTTP"));
    });
}
