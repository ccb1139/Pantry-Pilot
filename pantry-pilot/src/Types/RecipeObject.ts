export interface Recipe {
    id: number
    title: string
    image: string
    imageType: string
    usedIngredientCount: number
    missedIngredientCount: number
    missedIngredients: MissedIngredient[]
    usedIngredients: UsedIngredient[]
    unusedIngredients: any[]
    likes: number
    vegetarian: boolean
    vegan: boolean
    glutenFree: boolean
    dairyFree: boolean
    veryHealthy: boolean
    cheap: boolean
    veryPopular: boolean
    sustainable: boolean
    lowFodmap: boolean
    weightWatcherSmartPoints: number
    gaps: string
    preparationMinutes: number
    cookingMinutes: number
    aggregateLikes: number
    healthScore: number
    creditsText: string
    license: string
    sourceName: string
    pricePerServing: number
    extendedIngredients: ExtendedIngredient[]
    readyInMinutes: number
    servings: number
    sourceUrl: string
    nutrition: Nutrition
    summary: string
    cuisines: string[]
    dishTypes: string[]
    diets: string[]
    occasions: string[]
    winePairing: WinePairing
    instructions: string
    analyzedInstructions: AnalyzedInstruction[]
    report: any
    tips: Tips
    openLicense: number
    suspiciousDataScore: number
    approved: number
    unknownIngredients: any[]
    userTags: any[]
    originalId: any
    spoonacularSourceUrl: string
    missedIngredientsList: any[],
    usedIngredientsList: any[],
    unusedIngredientsList: any[],
  }
  
  export interface MissedIngredient {
    id: number
    amount: number
    unit: string
    unitLong: string
    unitShort: string
    aisle: string
    name: string
    original: string
    originalName: string
    meta: string[]
    extendedName?: string
    image: string
  }
  
  export interface UsedIngredient {
    id: number
    amount: number
    unit: string
    unitLong: string
    unitShort: string
    aisle: string
    name: string
    original: string
    originalName: string
    meta: string[]
    image: string
    extendedName?: string
  }
  
  export interface ExtendedIngredient {
    id: number
    aisle: string
    image: string
    consistency: string
    name: string
    nameClean: string
    original: string
    originalName: string
    amount: number
    unit: string
    meta: string[]
    measures: Measures
  }
  
  export interface Measures {
    us: Us
    metric: Metric
  }
  
  export interface Us {
    amount: number
    unitShort: string
    unitLong: string
  }
  
  export interface Metric {
    amount: number
    unitShort: string
    unitLong: string
  }
  
  export interface Nutrition {
    nutrients: Nutrient[]
    properties: Property[]
    flavonoids: Flavonoid[]
    ingredients: Ingredient[]
    caloricBreakdown: CaloricBreakdown
    weightPerServing: WeightPerServing
  }
  
  export interface Nutrient {
    name: string
    amount: number
    unit: string
    percentOfDailyNeeds: number
  }
  
  export interface Property {
    name: string
    amount: number
    unit: string
  }
  
  export interface Flavonoid {
    name: string
    amount: number
    unit: string
  }
  
  export interface Ingredient {
    id: number
    name: string
    amount: number
    unit: string
    nutrients: Nutrient2[]
  }
  
  export interface Nutrient2 {
    name: string
    amount: number
    unit: string
    percentOfDailyNeeds: number
  }
  
  export interface CaloricBreakdown {
    percentProtein: number
    percentFat: number
    percentCarbs: number
  }
  
  export interface WeightPerServing {
    amount: number
    unit: string
  }
  
  export interface WinePairing {
    pairedWines: any[]
    pairingText: string
    productMatches: any[]
  }
  
  export interface AnalyzedInstruction {
    name: string
    steps: Step[]
  }
  
  export interface Step {
    number: number
    step: string
    ingredients: Ingredient2[]
    equipment: Equipment[]
    length?: Length
  }
  
  export interface Ingredient2 {
    id: number
    name: string
    localizedName: string
    image: string
  }
  
  export interface Equipment {
    id: number
    name: string
    localizedName: string
    image: string
  }
  
  export interface Length {
    number: number
    unit: string
  }
  
  export interface Tips {
    health: string[]
    price: string[]
    cooking: string[]
    green: string[]
  }
  