const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookbookSchema = require('./cookbook'); 

const lastSearchSchema = new Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    image: {
        type: String
    },
    imageType: {
        type: String
    },
    usedIngredientCount: {
        type: Number
    },
    missedIngredientCount: {
        type: Number
    },
    missedIngredients: {
        type: [Object]
    },
    missedIngredientsList: {
        type: [Object]
    },
    usedIngredients: {
        type: [Object]
    },
    usedIngredientsList: {
        type: [Object]
    },
    unusedIngredients: {
        type: [Object]
    },
    unusedIngredientsList: {
        type: [Object]
    },
    likes: {
        type: Number
    },
    vegetarian: {
        type: Boolean
    },
    vegan: {
        type: Boolean
    },
    glutenFree: {
        type: Boolean
    },
    dairyFree: {
        type: Boolean
    },
    veryHealthy: {
        type: Boolean
    },
    cheap: {
        type: Boolean
    },
    veryPopular: {
        type: Boolean
    },
    sustainable: {
        type: Boolean
    },
    lowFodmap: {
        type: Boolean
    },
    weightWatcherSmartPoints: {
        type: Number
    },
    gaps: {
        type: String
    },
    preparationMinutes: {
        type: Number
    },
    cookingMinutes: {
        type: Number
    },
    aggregateLikes: {
        type: Number
    },
    healthScore: {
        type: Number
    },
    creditsText: {
        type: String
    },
    license: {
        type: String
    },
    sourceName: {
        type: String
    },
    pricePerServing: {
        type: Number
    },
    extendedIngredients: {
        type: [Object]
    },
    readyInMinutes: {
        type: Number
    },
    servings: {
        type: Number
    },
    sourceUrl: {
        type: String
    },
    nutrition: {
        nutrients: {
            type: [Object]
        },
        properties: {
            type: [Object]
        },
        flavonoids: {
            type: [Object]
        },
        ingredients: {
            type: [Object]
        },
        caloricBreakdown: {
            percentProtein: {
                type: Number
            },
            percentFat: {
                type: Number
            },
            percentCarbs: {
                type: Number
            }
        },
        weightPerServing: {
            amount: {
                type: Number
            },
            unit: {
                type: String
            }
        }
    },
    summary: {
        type: String
    },
    cuisines: {
        type: [Object]
    },
    dishTypes: {
        type: [Object]
    },
    diets: {
        type: [Object]
    },
    occasions: {
        type: [Object]
    },
    winePairing: {
        pairedWines: {
            type: [Object]
        },
        pairingText: {
            type: String
        },
        productMatches: {
            type: [Object]
        }
    },
    instructions: {
        type: String
    },
    analyzedInstructions: {
        type: [Object]
    },
    report: {
        type: Schema.Types.Mixed
    },
    tips: {
        health: {
            type: [
                String
            ]
        },
        price: {
            type: [
                String
            ]
        },
        cooking: {
            type: [
                String
            ]
        },
        green: {
            type: [
                String
            ]
        }
    },
    openLicense: {
        type: Number
    },
    suspiciousDataScore: {
        type: Number
    },
    approved: {
        type: Number
    },
    unknownIngredients: {
        type: Array
    },
    userTags: {
        type: Array
    },
    originalId: {
        type: Schema.Types.Mixed
    },
    spoonacularSourceUrl: {
        type: String
    },
},
    { collection: 'lastSearch' });

module.exports = mongoose.model('lastSearch', lastSearchSchema);
