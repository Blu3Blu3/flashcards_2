// All of these should be answerable using text, so include answers.
// Component code should check if any of the answer strings are included in the user's guess.

const poolFranchises = [
    {
        textA:      "A series of intuitive reference books on everything from programming, to homebrewing, to professional wrestling, all catered towards newcomers to the field.",
        textB:      "for dummies (1983 - present)",
        imgA:       "img_franchise_dummies_A",
        imgB:       "img_franchise_dummies_B",
        answers:    ["dummies", "for dummies"]
    },
    {
        textA:      "A science fiction series originating with a 1965 book often touted as \"the best-selling science fiction novel in history.\"",
        textB:      "Dune (1965 - present)",
        imgA:       "img_franchise_dune_A",
        imgB:       "img_franchise_dune_B",
        answers:    ["dune"]
    },
    {
        textA:      "A children\'s book series where each page features a photograph of a variety of objects, and an accompanying riddle tasking the reader with finding specific objects it alludes to.",
        textB:      "I SPY (1992 - present)",
        imgA:       "img_franchise_spy_A",
        imgB:       "img_franchise_spy_B",
        answers:    ["i spy", "spy"]
    },
    {
        textA:      "A fantasy series spanning nine novels and fifteen short stories, all revolving around the adventures of monster hunter Geralt of Rivia. Since its conception, it has been adapted into a film, two TV series, and a video game series.",
        textB:      "The Witcher (1986 - present)",
        imgA:       "img_franchise_witcher_A",
        imgB:       "img_franchise_witcher_B",
        answers:    ["the witcher", "witcher", "the hexer", "hexer"]
    },
    {
        textA:      "Estimated to be the highest-grossing media franchise of all time, this began as a video game inspired by its creator\'s childhood love of bug collecting.",
        textB:      "Pokémon (1996 - present)",
        imgA:       "img_franchise_pokemon_A",
        imgB:       "img_franchise_pokemon_B",
        answers:    ["pokemon", "jigglypuff seen from above"]
    },
    {
        textA:      "A media franchise whose eponymous first video game pioneered in the programming of 3D graphics and multiplayer gameplay. (Similar respects go to Wolfenstein 3D, which this franchise's creators also developed!)",
        textB:      "DOOM (1993 - present)",
        imgA:       "img_franchise_doom_A",
        imgB:       "img_franchise_doom_B",
        answers:    ["doom"]
    },
    {
        textA:      "A media franchise originating with a 2009 indie game that spurred the game development scene of the 2010\'s, and still fuels the imagination of people worldwide with its infinite worlds.",
        textB:      "Minecraft (2009 - present)",
        imgA:       "img_franchise_minecraft_A",
        imgB:       "img_franchise_minecraft_B",
        // You could check fuzzy matching implementation with this answer set!
        answers:    ["minecraft", "minceraft"]
    },
    {
        textA:      "A media franchise of TV and film documentaries about the natural history of the world\'s biomes. It started with a 2001 broadcast focused on the world\'s oceans and its inhabitants, and narrated by David Attenborough.",
        textB:      "Planet Earth (2001 - present)",
        imgA:       "img_franchise_planet_earth_A",
        imgB:       "img_franchise_planet_earth_B",
        answers:    ["planet earth", "blue planet", "earth"]
    },
    {
        textA:      "A TV franchise of mockumentaries about work. It originated from a British sitcom, but has versions in various countries; the American version has a notoriously painful first season.",
        textB:      "The Office (2001 - 2003 in the U.K., 2005 - 2013 in the U.S.)",
        imgA:       "img_franchise_office_A",
        imgB:       "img_franchise_office_B",
        answers:    ["the office", "office"]
    },
    {
        textA:      "Now under Disney, a massive media franchise revolving around its collection of superhero stories in comics, films, and shows. Its first film came out in 2008, and has been continued by almost yearly film releases.",
        textB:      "The Marvel Cinematic Universe (2008 - present)",
        imgA:       "img_franchise_marvel_A",
        imgB:       "img_franchise_marvel_B",
        answers:    ["marvel", "mcu"]
    }
    
]

// No images
const poolRiddles = [
    {
        textA:      "What place do you leave without entering?",
        textB:      "The hospital where you were born / The womb",
        imgA:       "",
        imgB:       "",
        answers:    ["hospital", "womb"]
    },
    {
        textA:      "What place do you enter without leaving?",
        textB:      "The tomb",
        imgA:       "",
        imgB:       "",
        answers:    ["tomb", "grave", "death"]
    },
    {
        textA:      "\"I weigh next to nothing, but not even the strongest people can hold me for more than several minutes.\"\nWhat am I?",
        textB:      "Breath",
        imgA:       "",
        imgB:       "",
        answers:    ["breath", "air"]
    },
    {
        textA:      "What runs, but never walks? Murmurs, but never talks? Has a bed, but never sleeps? And has a mouth, but never eats?",
        textB:      "A river",
        imgA:       "",
        imgB:       "",
        answers:    ["river", "brook", "creek"]
    },
    {
        textA:      "Where can you finish a book without finishing a sentence?",
        textB:      "Prison",
        imgA:       "",
        imgB:       "",
        answers:    ["prison", "cell", "jail"]
    },
    {
        textA:      "\"I have four wings, but cannot fly / I never laugh, and never cry / On the same spot I\'m always found / Toiling away with little sound\"\nWhat am I?",
        textB:      "A windmill",
        imgA:       "",
        imgB:       "",
        answers:    ["windmill", "turbine"]
    },
    {
        textA:      "\"Often held but never touched / Always wet but never rusts / Often bites, but seldom bit / To use me well, you must have wit\"\nWhat am I?",
        textB:      "Your tongue",
        imgA:       "",
        imgB:       "",
        answers:    ["tongue"]
    },
    {
        textA:      "\"I have no wings, but I fly / I have no teeth, but I bite\"What am I?",
        textB:      "An arrow / A bullet",
        imgA:       "",
        imgB:       "",
        answers:    ["arrow", "bullet"]
    },
    {
        textA:      "\"I wear every face but cannot be seen, and when I leave, the world weeps.\" What am I?",
        textB:      "Time / Hope",
        imgA:       "",
        imgB:       "",
        answers:    ["time", "hope"]
    }
]

export class CardSet {
    // NOTE: JavaScript doesn't have function overloading, so you'll need to just add default values or other workarounds.  
    constructor(name = "blank", title = "Blank card set", desc = "Description goes here", pool = []) {
        this.name = name
        this.title = title
        this.desc = desc
        this.pool = pool
    }
}

export const cardsets = [
    new CardSet(
        "Franchises",
        "Can you name these media franchises?",
        "We\'ll give you some hints, just type your answer below!",
        poolFranchises
    ),
    new CardSet(
        "Riddles",
        "A few riddles",
        "Welcome. Care to indulge in some riddles I\'ve come across? You may enter your answers below.",
        poolRiddles
    )
]