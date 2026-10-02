const readline = require('readline-sync');

// --- HOTEL INFORMATION ---
const HOTEL_INFO = {
    name: "thakur's Grand Hotel & Restaurant",
    address: "123 Tech Park Road, Silicon City",
    contact: "+91 33330",
    gstNumber: "29ABC4F1Z5"
};

// --- DATA STORES ---
let allOrders = [];
let reservations = [];
let feedbacks = [];
let itemSalesCounter = {};

// --- DAILY MENUS ---
// Categories: "Veg", "Non-Veg", "Beverages", "Desserts"
const MENUS = {
    "Monday": {
        "Breakfast": [
            { id: 101, name: "Aloo Paratha", price: 80, category: "Veg" },
            { id: 102, name: "Poha", price: 60, category: "Veg" },
            { id: 103, name: "Tea", price: 20, category: "Beverages" }
        ],
        "Lunch": [
            { id: 104, name: "Paneer Tikka", price: 250, category: "Veg" },
            { id: 105, name: "Chicken Curry", price: 350, category: "Non-Veg" },
            { id: 106, name: "Mango Lassi", price: 80, category: "Beverages" }
        ],
        "Dinner": [
            { id: 107, name: "Dal Makhani", price: 180, category: "Veg" },
            { id: 108, name: "Butter Naan", price: 40, category: "Veg" },
            { id: 109, name: "Gulab Jamun", price: 60, category: "Desserts" }
        ]
    },
    "Tuesday": {
        "Breakfast": [
            { id: 201, name: "Idli Sambar", price: 70, category: "Veg" },
            { id: 202, name: "Dosa", price: 90, category: "Veg" },
            { id: 203, name: "Coffee", price: 30, category: "Beverages" }
        ],
        "Lunch": [
            { id: 204, name: "Veg Biryani", price: 200, category: "Veg" },
            { id: 205, name: "Mutton Rogan", price: 450, category: "Non-Veg" },
            { id: 206, name: "Cold Coffee", price: 90, category: "Beverages" }
        ],
        "Dinner": [
            { id: 207, name: "Kadhai Paneer", price: 240, category: "Veg" },
            { id: 208, name: "Tandoori Roti", price: 20, category: "Veg" },
            { id: 209, name: "Rasgulla", price: 50, category: "Desserts" }
        ]
    },
    "Wednesday": {
        "Breakfast": [
            { id: 301, name: "Puri Sabji", price: 80, category: "Veg" },
            { id: 302, name: "Upma", price: 60, category: "Veg" },
            { id: 303, name: "Juice", price: 50, category: "Beverages" }
        ],
        "Lunch": [
            { id: 304, name: "Dal Tadka", price: 160, category: "Veg" },
            { id: 305, name: "Butter Chicken", price: 380, category: "Non-Veg" },
            { id: 306, name: "Fresh Lime", price: 60, category: "Beverages" }
        ],
        "Dinner": [
            { id: 307, name: "Mix Veg", price: 190, category: "Veg" },
            { id: 308, name: "Garlic Naan", price: 50, category: "Veg" },
            { id: 309, name: "Ice Cream", price: 100, category: "Desserts" }
        ]
    },
    "Thursday": {
        "Breakfast": [
            { id: 401, name: "Chole Bhature", price: 120, category: "Veg" },
            { id: 402, name: "Sandwich", price: 70, category: "Veg" },
            { id: 403, name: "Masala Chai", price: 40, category: "Beverages" }
        ],
        "Lunch": [
            { id: 404, name: "Rajma Chawal", price: 150, category: "Veg" },
            { id: 405, name: "Fish Tikka", price: 400, category: "Non-Veg" },
            { id: 406, name: "Lassi", price: 70, category: "Beverages" }
        ],
        "Dinner": [
            { id: 407, name: "Palak Paneer", price: 230, category: "Veg" },
            { id: 408, name: "Missi Roti", price: 30, category: "Veg" },
            { id: 409, name: "Brownie", price: 120, category: "Desserts" }
        ]
    },
    "Friday": {
        "Breakfast": [
            { id: 501, name: "Omelette", price: 80, category: "Non-Veg" },
            { id: 502, name: "Toast Butter", price: 50, category: "Veg" },
            { id: 503, name: "Coffee", price: 30, category: "Beverages" }
        ],
        "Lunch": [
            { id: 504, name: "Malai Kofta", price: 240, category: "Veg" },
            { id: 505, name: "Chicken Biryani", price: 320, category: "Non-Veg" },
            { id: 506, name: "Mojito", price: 150, category: "Beverages" }
        ],
        "Dinner": [
            { id: 507, name: "Mushroom Masala", price: 220, category: "Veg" },
            { id: 508, name: "Jeera Rice", price: 110, category: "Veg" },
            { id: 509, name: "Cheesecake", price: 180, category: "Desserts" }
        ]
    },
    "Saturday": {
        "Breakfast": [
            { id: 601, name: "Bread Pakora", price: 60, category: "Veg" },
            { id: 602, name: "Samosa", price: 40, category: "Veg" },
            { id: 603, name: "Tea", price: 20, category: "Beverages" }
        ],
        "Lunch": [
            { id: 604, name: "Kari Pakoda", price: 140, category: "Veg" },
            { id: 605, name: "Tandoori Chicken", price: 420, category: "Non-Veg" },
            { id: 606, name: "Cold Drinks", price: 50, category: "Beverages" }
        ],
        "Dinner": [
            { id: 607, name: "Shahi Paneer", price: 280, category: "Veg" },
            { id: 608, name: "Naan", price: 35, category: "Veg" },
            { id: 609, name: "Gajar Halwa", price: 90, category: "Desserts" }
        ]
    },
    "Sunday": {
        "Breakfast": [
            { id: 701, name: "Aloo Poori", price: 90, category: "Veg" },
            { id: 702, name: "Vada Pav", price: 50, category: "Veg" },
            { id: 703, name: "Filter Coffee", price: 40, category: "Beverages" }
        ],
        "Lunch": [
            { id: 704, name: "Special Thali", price: 300, category: "Veg" },
            { id: 705, name: "Prawn Curry", price: 480, category: "Non-Veg" },
            { id: 706, name: "Oreo Shake", price: 130, category: "Beverages" }
        ],
        "Dinner": [
            { id: 707, name: "Paneer Bhurji", price: 260, category: "Veg" },
            { id: 708, name: "Roomali Roti", price: 25, category: "Veg" },
            { id: 709, name: "Jalebi", price: 70, category: "Desserts" }
        ]
    }
};

// --- HELPER FUNCTIONS ---

// Get current day name (e.g., "Monday")
function getCurrentDay() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[new Date().getDay()];
}

// Display common header for consistency
function displayHeader(title) {
    console.log("\n========================================================");
    console.log(`|| ${title.padEnd(50)} ||`);
    console.log("========================================================");
}

// Display top hotel banner
function displayHotelInfo() {
    displayHeader(HOTEL_INFO.name);
    console.log(`Address: ${HOTEL_INFO.address}`);
    console.log(`Contact: ${HOTEL_INFO.contact} | GST No: ${HOTEL_INFO.gstNumber}`);
    
    const now = new Date();
    console.log(`Date: ${now.toLocaleDateString()} | Time: ${now.toLocaleTimeString()}`);
    console.log("========================================================\n");
}

// Get current meal time based on clock
function getCurrentMealTime() {
    const hour = new Date().getHours();
    if (hour < 12) return "Breakfast";
    if (hour < 17) return "Lunch";
    return "Dinner";
}

// Get the specific menu items for today's current time
function getTodayMenu() {
    return MENUS[getCurrentDay()][getCurrentMealTime()];
}

// Print a given menu array neatly
function printMenu(menuToPrint, mealTime = "") {
    if (mealTime) {
        console.log(`--- ${mealTime} Menu ---`);
    }
    console.log("ID\t| Category\t| Item Name\t\t| Price");
    console.log("--------------------------------------------------------");
    menuToPrint.forEach(item => {
        console.log(`${item.id}\t| ${item.category.padEnd(10)}\t| ${item.name.padEnd(20)}\t| ₹${item.price}`);
    });
    console.log("--------------------------------------------------------");
}

function printFullDayMenu(day) {
    const dayMenu = MENUS[day];
    printMenu(dayMenu["Breakfast"], "Breakfast");
    console.log();
    printMenu(dayMenu["Lunch"], "Lunch");
    console.log();
    printMenu(dayMenu["Dinner"], "Dinner");
}

// Track what items are selling
function updateSales(itemName, qty) {
    if (itemSalesCounter[itemName]) {
        itemSalesCounter[itemName] += qty;
    } else {
        itemSalesCounter[itemName] = qty;
    }
}

// --- MODULES ---

// Feature 1, 3, 5, 6, 8: Place a new order
function newOrder() {
    displayHeader("NEW ORDER");
    
    // 3. Customer Details
    let customerName = readline.question("Enter Customer Name: ");
    while (!customerName || customerName.trim() === "") {
        console.log("Name cannot be empty.");
        customerName = readline.question("Enter Customer Name: ");
    }

    let mobile = readline.question("Enter Mobile Number: ");
    let tableNo = readline.questionInt("Enter Table Number: ");

    // 4. Choose day and meal for order
    console.log("\n--- Select Menu for Ordering ---");
    console.log("1. Current Time Menu (Default)");
    console.log("2. Choose Specific Day and Meal");
    let menuChoice = readline.questionInt("Select option (1-2): ");
    
    let orderDay = getCurrentDay();
    let orderMeal = getCurrentMealTime();
    
    if (menuChoice === 2) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        console.log("\nSelect a Day:");
        days.forEach((d, i) => console.log(`${i + 1}. ${d}`));
        let dayChoice = readline.questionInt("Enter choice (1-7): ");
        if (dayChoice >= 1 && dayChoice <= 7) {
            orderDay = days[dayChoice - 1];
        } else {
            console.log("Invalid day. Using today.");
        }
        
        console.log("\nSelect Meal Time:");
        console.log("1. Breakfast");
        console.log("2. Lunch");
        console.log("3. Dinner");
        let mealChoice = readline.questionInt("Enter choice (1-3): ");
        if (mealChoice === 1) orderMeal = "Breakfast";
        else if (mealChoice === 2) orderMeal = "Lunch";
        else if (mealChoice === 3) orderMeal = "Dinner";
        else console.log("Invalid meal. Using current time meal.");
    }

    let currentMenu = MENUS[orderDay][orderMeal];
    console.log(`\n--- Ordering from ${orderDay}'s ${orderMeal} Menu ---`);
    printMenu(currentMenu, orderMeal);

    let orderItems = [];
    let ordering = true;

    // 5. Allow ordering multiple items
    while (ordering) {
        let itemId = readline.questionInt("\nEnter Item ID to order (or 0 to finish): ");
        if (itemId === 0) {
            if (orderItems.length === 0) {
                console.log("Order cancelled.");
                return;
            }
            ordering = false;
            break;
        }

        let selectedItem = currentMenu.find(i => i.id === itemId);
        if (!selectedItem) {
            console.log("Invalid Item ID. Please look at the menu and try again.");
            continue;
        }

        let qty = readline.questionInt(`Enter quantity for ${selectedItem.name}: `);
        if (qty <= 0) {
            console.log("Invalid quantity. Must be at least 1.");
            continue;
        }

        orderItems.push({
            name: selectedItem.name,
            price: selectedItem.price,
            quantity: qty,
            total: selectedItem.price * qty
        });
        
        console.log(`-> Added ${qty} x ${selectedItem.name}`);
    }

    // 6. Calculations
    let subtotal = 0;
    orderItems.forEach(item => subtotal += item.total);
    
    // Discount Logic (10% if subtotal > 1000)
    let discount = 0;
    if (subtotal > 1000) {
        discount = subtotal * 0.10;
        console.log("Congrats! You got a 10% discount on orders above ₹1000.");
    }

    let gst = (subtotal - discount) * 0.05; // 5% GST on discounted price
    let grandTotal = (subtotal - discount) + gst;

    // 8. Payment Method
    console.log("\n--- Payment Methods ---");
    console.log("1. Cash");
    console.log("2. Card");
    console.log("3. UPI");
    let payChoice = readline.questionInt("Select Payment Method (1-3): ");
    let paymentMethod = "Cash"; // default
    if (payChoice === 2) paymentMethod = "Card";
    else if (payChoice === 3) paymentMethod = "UPI";

    // Create Order Object
    const orderNumber = Math.floor(Math.random() * 90000) + 10000;
    const order = {
        orderNumber: orderNumber,
        customerName: customerName,
        mobile: mobile,
        tableNo: tableNo,
        items: orderItems,
        subtotal: subtotal,
        discount: discount,
        gst: gst,
        grandTotal: grandTotal,
        paymentMethod: paymentMethod,
        status: "Pending", // Default status
        time: new Date()
    };

    // 10. Store multiple orders
    allOrders.push(order);
    
    // Update Sales tracking
    orderItems.forEach(i => updateSales(i.name, i.quantity));

    // 7. Generate Bill
    generateBill(order);
}

// 7. Professional Receipt Generation
function generateBill(order) {
    console.log("\n========================================================");
    console.log("                  PROFESSIONAL RECEIPT                  ");
    console.log("========================================================");
    console.log(`${HOTEL_INFO.name}`);
    console.log(`${HOTEL_INFO.address}`);
    console.log(`GST No: ${HOTEL_INFO.gstNumber} | Contact: ${HOTEL_INFO.contact}`);
    console.log("--------------------------------------------------------");
    console.log(`Order No  : ORD-${order.orderNumber}`);
    console.log(`Date      : ${order.time.toLocaleDateString()} | Time: ${order.time.toLocaleTimeString()}`);
    console.log(`Customer  : ${order.customerName} | Table: ${order.tableNo}`);
    console.log(`Mobile    : ${order.mobile}`);
    console.log(`Status    : ${order.status}`);
    console.log("--------------------------------------------------------");
    console.log("Item Name\t\tQty\tPrice\tTotal");
    console.log("--------------------------------------------------------");
    
    order.items.forEach(i => {
        console.log(`${i.name.padEnd(20)}\t${i.quantity}\t₹${i.price}\t₹${i.total}`);
    });

    console.log("--------------------------------------------------------");
    console.log(`Subtotal: \t\t\t\t₹${order.subtotal.toFixed(2)}`);
    console.log(`Discount: \t\t\t\t-₹${order.discount.toFixed(2)}`);
    console.log(`GST (5%): \t\t\t\t+₹${order.gst.toFixed(2)}`);
    console.log("--------------------------------------------------------");
    console.log(`GRAND TOTAL: \t\t\t\t₹${Math.round(order.grandTotal).toFixed(2)}`);
    console.log(`Paid via: ${order.paymentMethod}`);
    console.log("========================================================");
    console.log("               THANK YOU FOR VISITING!                  ");
    console.log("========================================================\n");
}

// View menu with options
function viewMenu() {
    displayHeader("VIEW MENU");
    console.log("1. View Current Menu (Based on Time)");
    console.log("2. View Today's Full Menu (Breakfast, Lunch, Dinner)");
    console.log("3. View Menu by Specific Day");
    
    let choice = readline.questionInt("\nSelect an option (1-3): ");
    
    if (choice === 1) {
        let mealTime = getCurrentMealTime();
        let day = getCurrentDay();
        displayHeader(`TODAY'S ${mealTime.toUpperCase()} MENU`);
        printMenu(MENUS[day][mealTime], mealTime);
    } else if (choice === 2) {
        let day = getCurrentDay();
        displayHeader(`TODAY'S FULL MENU (${day.toUpperCase()})`);
        printFullDayMenu(day);
    } else if (choice === 3) {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        console.log("\nSelect a Day:");
        days.forEach((d, i) => console.log(`${i + 1}. ${d}`));
        let dayChoice = readline.questionInt("Enter choice (1-7): ");
        if (dayChoice >= 1 && dayChoice <= 7) {
            let selectedDay = days[dayChoice - 1];
            displayHeader(`${selectedDay.toUpperCase()}'S FULL MENU`);
            printFullDayMenu(selectedDay);
        } else {
            console.log("Invalid choice.");
        }
    } else {
        console.log("Invalid option selected.");
    }
}

// 14. Table reservation functionality
function reserveTable() {
    displayHeader("RESERVE A TABLE");
    let customerName = readline.question("Enter Customer Name for Reservation: ");
    let dateStr = readline.question("Enter Date (DD/MM/YYYY): ");
    let timeStr = readline.question("Enter Time (e.g., 7:30 PM): ");
    let guests = readline.questionInt("Enter number of guests: ");
    
    const reservation = {
        id: "RES" + Math.floor(Math.random() * 900) + 100,
        customerName: customerName,
        date: dateStr,
        time: timeStr,
        guests: guests
    };

    reservations.push(reservation);
    console.log(`\nTable reserved successfully for ${customerName}!`);
    console.log(`Reservation ID: ${reservation.id} on ${dateStr} at ${timeStr} for ${guests} guests.`);
}

// 11 & 12. Daily sales summary & Most ordered item
function viewSalesReport() {
    displayHeader("DAILY SALES REPORT");
    
    if (allOrders.length === 0) {
        console.log("No orders placed yet today.");
        return;
    }

    let totalRevenue = 0;
    allOrders.forEach(o => totalRevenue += o.grandTotal);

    console.log(`Total Orders Today: ${allOrders.length}`);
    console.log(`Total Revenue: ₹${totalRevenue.toFixed(2)}`);

    console.log("\n--- Item Sales Breakdown ---");
    let mostOrderedItem = "";
    let maxQty = 0;

    for (let item in itemSalesCounter) {
        console.log(`${item.padEnd(25)} : ${itemSalesCounter[item]} units`);
        if (itemSalesCounter[item] > maxQty) {
            maxQty = itemSalesCounter[item];
            mostOrderedItem = item;
        }
    }

    console.log("\n--------------------------------------------------------");
    if (mostOrderedItem) {
        console.log(`⭐ MOST ORDERED FOOD ITEM: ${mostOrderedItem} (${maxQty} orders)`);
    }
}

// 15. Customer feedback and rating system
function customerFeedback() {
    displayHeader("CUSTOMER FEEDBACK");
    let name = readline.question("Enter your name: ");
    console.log("Rate your experience from 1 (Poor) to 5 (Excellent)");
    let rating = readline.questionInt("Rating (1-5): ");
    
    // Validation
    while (rating < 1 || rating > 5) {
        console.log("Invalid rating. Please enter a number between 1 and 5.");
        rating = readline.questionInt("Rating (1-5): ");
    }

    let comments = readline.question("Any comments or suggestions? ");
    
    feedbacks.push({ name, rating, comments });
    console.log("\nThank you for your valuable feedback! We appreciate it.");
}

// 9. Show order status
function changeOrderStatus() {
    displayHeader("UPDATE ORDER STATUS");
    if (allOrders.length === 0) {
        console.log("No orders available to update.");
        return;
    }

    let orderNo = readline.questionInt("Enter Order Number (without ORD-): ");
    let order = allOrders.find(o => o.orderNumber === orderNo);

    if (!order) {
        console.log("Order not found. Please check the order number.");
        return;
    }

    console.log(`Current Status: ${order.status}`);
    console.log("1. Pending");
    console.log("2. Preparing");
    console.log("3. Ready");
    console.log("4. Delivered");
    let statusChoice = readline.questionInt("Select new status (1-4): ");
    
    switch (statusChoice) {
        case 1: order.status = "Pending"; break;
        case 2: order.status = "Preparing"; break;
        case 3: order.status = "Ready"; break;
        case 4: order.status = "Delivered"; break;
        default: console.log("Invalid choice. Status not changed.");
    }
    
    console.log(`Order status updated to: ${order.status}`);
}

// --- MAIN EXECUTION LOOP ---
function main() {
    let running = true;

    while (running) {
        console.clear(); // Clear the console for a clean menu
        displayHotelInfo();
        console.log("=== MAIN MENU ===");
        console.log("1. New Order");
        console.log("2. View Menu");
        console.log("3. Reserve Table");
        console.log("4. Update Order Status");
        console.log("5. View Sales Report");
        console.log("6. Customer Feedback");
        console.log("7. Exit");

        let choice = readline.questionInt("\nEnter your choice (1-7): ");

        switch (choice) {
            case 1:
                newOrder();
                break;
            case 2:
                viewMenu();
                break;
            case 3:
                reserveTable();
                break;
            case 4:
                changeOrderStatus();
                break;
            case 5:
                viewSalesReport();
                break;
            case 6:
                customerFeedback();
                break;
            case 7:
                console.log("Thank you for using the Hotel Management System. Goodbye!");
                running = false;
                break;
            default:
                console.log("Invalid choice! Please select an option from 1 to 7.");
        }
        
        if (running) {
            readline.question("\nPress Enter to return to Main Menu...");
        }
    }
}

// Start the application
main();
