import axios from "axios";

const APIKEY = "f91110dc";

const OMDBSearchByPage = async (searchText, page = 1) => {
    let returnObject = { respuesta: false, cantidadTotal: 0, datos: [] };
    let url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${searchText}&page=${page}`;

    try {
        const response = await axios.get(url);
        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.datos = response.data.Search;
            returnObject.cantidadTotal = response.data.totalResults;
        }
        return returnObject;
    } catch (error) {
        return returnObject;
    }
};

const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = { respuesta: false, cantidadTotal: 0, datos: {} };
    let url = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${imdbID}`;

    try {
        let response = await axios.get(url);
        if (response.data.Response === "True") {
            returnObject.respuesta = true;
            returnObject.datos = response.data;
        }
        return returnObject;
    } catch (error) {
        return returnObject;
    }
};

export { OMDBSearchByPage, OMDBGetByImdbID };