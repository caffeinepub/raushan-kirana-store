import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    price : Nat;
    description : Text;
    inStock : Bool;
  };

  let products : [Product] = [
    {
      id = 1;
      name = "Atta";
      category = "Groceries";
      price = 50;
      description = "Wheat flour for making chapatis.";
      inStock = true;
    },
    {
      id = 2;
      name = "Chawal";
      category = "Groceries";
      price = 60;
      description = "High-quality rice for daily meals.";
      inStock = true;
    },
    {
      id = 3;
      name = "Dal";
      category = "Groceries";
      price = 80;
      description = "Lentils, rich in protein and fiber.";
      inStock = true;
    },
    {
      id = 4;
      name = "Doodh";
      category = "Dairy";
      price = 30;
      description = "Fresh and pure milk.";
      inStock = true;
    },
    {
      id = 5;
      name = "Namak";
      category = "Spices";
      price = 20;
      description = "Essential for seasoning and flavoring.";
      inStock = true;
    },
    {
      id = 6;
      name = "Cheeni";
      category = "Groceries";
      price = 40;
      description = "High-quality sugar for daily use.";
      inStock = true;
    },
    {
      id = 7;
      name = "Biscuits";
      category = "Snacks";
      price = 25;
      description = "Tasty cookies for tea time.";
      inStock = true;
    },
    {
      id = 8;
      name = "Masala Chai";
      category = "Beverages";
      price = 15;
      description = "Spiced tea mix for a refreshing drink.";
      inStock = true;
    },
    {
      id = 9;
      name = "Haldi Powder";
      category = "Spices";
      price = 35;
      description = "Premium turmeric for health and flavor.";
      inStock = true;
    },
    {
      id = 10;
      name = "Shampoo";
      category = "Personal Care";
      price = 60;
      description = "Gentle cleansing for your hair.";
      inStock = true;
    },
    {
      id = 11;
      name = "Sabun";
      category = "Personal Care";
      price = 25;
      description = "Gentle soap for daily use.";
      inStock = true;
    },
    {
      id = 12;
      name = "Butter";
      category = "Dairy";
      price = 100;
      description = "Made from pure cow's milk for a rich and creamy taste.";
      inStock = true;
    },
    {
      id = 13;
      name = "Namkeen";
      category = "Snacks";
      price = 40;
      description = "Crunchy snack for tea time.";
      inStock = true;
    },
    {
      id = 14;
      name = "Maida";
      category = "Groceries";
      price = 30;
      description = "Refined flour for baking and cooking.";
      inStock = true;
    },
    {
      id = 15;
      name = "Chips";
      category = "Snacks";
      price = 20;
      description = "Potato chips, crunchy and salty.";
      inStock = true;
    },
  ];

  public query ({ caller }) func getAllProducts() : async [Product] {
    products;
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    let filteredProducts = products.filter(
      func(product) {
        Text.equal(product.category, category);
      }
    );
    if (filteredProducts.size() == 0) { Runtime.trap("No products found in this category.") };
    filteredProducts;
  };

  public query ({ caller }) func getStoreInfo() : async {
    name : Text;
    address : Text;
    timings : Text;
  } {
    {
      name = "Raushan Kirana Store";
      address = "Main Road, Near Bus Stand, Purnia, Bihar";
      timings = "Open 8 AM to 8 PM (Mon-Sat), 9 AM to 4 PM (Sun)";
    };
  };
};
