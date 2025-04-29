import mongoose from 'mongoose';

// Meal Schema
const MealSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    calories: Number,
});

// Cart Schema
const CartSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // User ID to associate the cart with a user
    items: [
        {
            mealId: { type: mongoose.Schema.Types.ObjectId, ref: 'Meal', required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
});

// Create a Mongoose connection
const DATABASE = process.env.DATABASE || "restaurant_db";
const mongoConnection = mongoose.createConnection(`mongodb://127.0.0.1:27017/${DATABASE}`);

// Models
export const Meal = mongoConnection.model("Meal", MealSchema);
export const Cart = mongoConnection.model("Cart", CartSchema);

/**
 * MONGO-RELATED FUNCTIONS
 */

// Get all meals
export async function GetAllMealsFromMongoDB() {
    const meals = await Meal.find({});
    return meals;
}

// Convert meals to plain objects
export async function ConvertAllMealsToPlainObject(meals) {
    const plainMeals = meals.map((meal) => meal.toObject());
    return plainMeals;
}

// Add a meal to MongoDB
export async function AddMealToMongoDB({ name, description, price, calories }) {
    const NewMeal = new Meal({ name, description, price, calories });
    await NewMeal.save();
}

// Delete a meal from MongoDB
export async function DeleteMealInMongoDB(id) {
    await Meal.findByIdAndDelete(id);
    console.log("Meal deleted");
}

// Get cart for a user
export async function GetCartForUser(userId) {
    const cart = await Cart.findOne({ userId }).populate('items.mealId');
    return cart || { userId, items: [] }; // Return an empty cart if none exists
}

// Add a meal to the cart
export async function AddMealToCart(userId, mealId) {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
        cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.mealId.toString() === mealId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ mealId, quantity: 1 });
    }

    await cart.save();
    return cart;
}

// Clear the cart for a user
export async function ClearCartForUser(userId) {
    await Cart.findOneAndDelete({ userId });
    console.log("Cart cleared");
}