export const transformProduct = (product) => {
  return {
    id: product.id,
    name: product.name,
    price: parseFloat(product.price) || 0,
    originalPrice: product.originalPrice || parseFloat(product.price) || 0,
    discount: product.discount || 0,
    image: product.image || '/api/placeholder/300/300',
    description: product.description || '',
    categoryId: product.categoryId,
    brand: product.brand || 'Professional Gear',
    rating: product.rating || 0,
    reviews: product.reviews || 0,
    stock: product.stock || 0,
    isFlashDeal: product.isFlashDeal || false,
    flashDealEnd: product.flashDealEnd || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), 
    isLimitedStock: (product.stock || 0) < 10,
    images: product.images || [],
    featured: true,
  };
};

export const transformBackendProducts = (backendProducts) => {
  return backendProducts.map(transformProduct);
};