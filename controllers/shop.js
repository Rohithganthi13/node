const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      prods: products,
      pageTitle: "All products",
      path: "/products",
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true,
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  console.log(prodId);
  Product.findById(prodId, (product) => {
    res.render("shop/product-detail", {
      product,
      pageTitle: "Product-detail",
      path: "/products",
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/index", {
      prods: products,
      pageTitle: "Shop",
      path: "/",
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (const product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: product,
            qty: cartProductData.qty,
          });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your cart",
        path: "/cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Orders",
    path: "/orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  const productPrice = req.body.productPrice;
  Cart.deleteProduct(productId, productPrice);
  res.redirect("/cart");
};
