'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User',required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product',required: true},
    title: {type: String },
    comments: {type: String, required: true},
    rating: {type: Number, enum: [1,2,3,4,5], required: true}
});


ReviewSchema.statics.findByAuthor = function(authorId, cb){
	return this.find({author: authorId})
	.then(function(reviewsByAuthor){
		if (cb) cb(null, reviewsByAuthor);
		return reviewsByAuthor;
	});
};

ReviewSchema.statics.findByProduct = function(){

};



mongoose.model('Review', ReviewSchema);