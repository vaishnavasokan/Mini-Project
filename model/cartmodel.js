var mongoose = require("mongoose");
var schema = mongoose.Schema; // instance created for schema

var cartschema = new schema(             //schema structure
    {
        product: { type: String, required: true },
        user: { 
            type: Schema.Types.ObjectId,
            ref: ''
        }
    }
)

var cartmodel = mongoose.model("cart", cartschema, "cart");
module.exports = cartmodel;