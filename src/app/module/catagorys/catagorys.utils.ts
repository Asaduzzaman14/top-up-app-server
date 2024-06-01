import { Category } from './catagorys.models';

const getCategoriesWithProducts = async () => {
  try {
    const result = await Category.aggregate([
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
  } catch (error) {
    console.error('Error fetching categories with products:', error);
    throw error;
  }
};

export { getCategoriesWithProducts };
