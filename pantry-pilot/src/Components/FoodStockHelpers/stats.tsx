export async function calculateStats(pantry: any) {
    /* We need to track:
      - Total number of categories
      - Total number of items
      - Total number of items in each category

      - Total number of items close to expiring 
      - Total number of expired items
    */
    // Total number of items
    const totalItems = pantry[0].fridge.length;
    // Total number of categories
    const totalCategories = pantry[0].categories.length;

    // ==============================
    // Individual category counts
    // ==============================

    var categoryItemCount: any = {};
    var categoryCloseToExpiringCount: any = {};
    var categoryExpiredCount: any = {};
    for (let category of pantry[0].categories) {
        categoryItemCount[category.categoryName] = 0; // initialize the count to zero
        categoryCloseToExpiringCount[category.categoryName] = 0;
        categoryExpiredCount[category.categoryName] = 0;
    }

    for (let item of pantry[0].fridge) {
        if (categoryItemCount[item.category] !== undefined) { // check if the item belongs to a category
            categoryItemCount[item.category]++; // increment the count for the corresponding category
        }
        const targetDate = new Date(item.expirationDate);
        const today = new Date();
        const diffInMs = targetDate.getTime() - today.getTime();
        const daysUntilTarget = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        if (daysUntilTarget <= 3 && daysUntilTarget >= 0) {
            categoryCloseToExpiringCount[item.category] += 1;
        } else if (daysUntilTarget < 0) {
            categoryExpiredCount[item.category]++;
        }

    }

    var categoryStats: any = [];
    // Now put the three together 
    for (let item of pantry[0].categories) {
        categoryStats.push({
            categoryName: item.categoryName,
            totalItems: categoryItemCount[item.categoryName],
            totalCloseToExpiring: categoryCloseToExpiringCount[item.categoryName],
            totalExpired: categoryExpiredCount[item.categoryName]
        })
    }

    const totalCloseToExpiring = Object.values(categoryCloseToExpiringCount).reduce((a: any, b: any) => a + b, 0);
    const totalExpired = Object.values(categoryExpiredCount).reduce((a: any, b: any) => a + b, 0);

    // ==============================
    // Individual item counts
    // ==============================
    // Initialize the variables
    var foodItemCount: any = {};
    var foodCloseToExpiringCount: any = {};
    var foodExpiredCount: any = {};
    var foodStats: any = [];
    var foodNameToIndexMap: any = {};

    // Loop over the fridge items
    for (let item of pantry[0].fridge) {
      // Increment the counts or initialize them if they don't exist
      if (item.foodName in foodItemCount) {
        foodItemCount[item.foodName]++;
      } else {
        foodItemCount[item.foodName] = 1;
        foodCloseToExpiringCount[item.foodName] = 0;
        foodExpiredCount[item.foodName] = 0;
      }
      
      // Check the expiration date and update the counts accordingly
      const targetDate = new Date(item.expirationDate);
      const today = new Date();
      const diffInMs = targetDate.getTime() - today.getTime();
      const daysUntilTarget = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      if (daysUntilTarget <= 3 && daysUntilTarget >= 0) {
        foodCloseToExpiringCount[item.foodName]++;
      } else if (daysUntilTarget < 0) {
        foodExpiredCount[item.foodName]++;
      }
      
      // Update or push the item's stats to the foodStats array
      const index = foodNameToIndexMap[item.foodName];
      if (index !== undefined) {
        // Update existing item
        const existingItem = foodStats[index];
        existingItem.totalItems = foodItemCount[item.foodName];
        existingItem.totalCloseToExpiring = foodCloseToExpiringCount[item.foodName];
        existingItem.totalExpired = foodExpiredCount[item.foodName];
      } else {
        // Add new item
        const newItem = {
          foodName: item.foodName,
          totalItems: foodItemCount[item.foodName],
          totalCloseToExpiring: foodCloseToExpiringCount[item.foodName],
          totalExpired: foodExpiredCount[item.foodName]
        };
        foodStats.push(newItem);
        foodNameToIndexMap[item.foodName] = foodStats.length - 1;
      }
    }

    return (
        {
            totalItems: totalItems,
            totalCategories: totalCategories,
            totalCloseToExpiring: totalCloseToExpiring,
            totalExpired: totalExpired,
            categoryStats: categoryStats,
            foodStats: foodStats
        }
    )

}