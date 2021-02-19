const axios = require('axios');

class Product{
    static async getProduct(productId){
        const { data } = new FilterProduct((await axios.get(`http://challenge-api.luizalabs.com/api/product/${productId}/`)).data);

        return { data };
    }
}

class FilterProduct{
    constructor({id, title, price, image, reviewScore}){
        this.id = id,
        this.title = title,
        this.price = price,
        this.image = image,
        this.reviewScore = reviewScore
    }    
}

module.exports = Product;
