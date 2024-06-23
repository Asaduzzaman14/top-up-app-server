"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesWithProducts = void 0;
const catagorys_models_1 = require("./catagorys.models");
const getCategoriesWithProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield catagorys_models_1.Category.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: '_id',
                    foreignField: 'catagoryId',
                    as: 'products',
                },
            },
            {
                $project: {
                    _id: '$_id',
                    name: '$name',
                    img: '$img',
                    description: '$description',
                    products: {
                        $map: {
                            input: '$products',
                            as: 'product',
                            in: {
                                _id: '$$product._id',
                                name: '$$product.name',
                                img: '$$product.img',
                                price: '$$product.price',
                                description: '$$product.description',
                            },
                        },
                    },
                },
            },
        ]);
        return result;
    }
    catch (error) {
        console.error('Error fetching categories with products:', error);
        throw error;
    }
});
exports.getCategoriesWithProducts = getCategoriesWithProducts;
